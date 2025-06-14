// hooks/useNotes.ts
import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types/types'; // Tip tanımınızın yolu doğru olduğundan emin olun

const STORAGE_KEY = 'notes';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  // 'newNote' state'i kullanılmıyor, bu yüzden kaldırıldı.
  // const [newNote, setNewNote] = useState<Omit<Note, 'pinned'>>({ title: '', content: '' });
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true); // localStorage'dan notlar yüklenirken başlangıç durumu
  const [error, setError] = useState<string | null>(null);

  // Notları localStorage'dan yükle
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes) as Note[];
        // Yükleme sırasında notları sırala: pinned olanlar önce, sonra başlığa göre
        const sortedNotes = parsedNotes.sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return a.title.localeCompare(b.title);
        });
        setNotes(sortedNotes);
      }
    } catch (err) {
      setError('Notlar yüklenirken bir sorun oluştu.');
      console.error('Notlar yüklenirken hata:', err);
    } finally {
      setIsLoading(false); // Yükleme işlemi tamamlandı
    }
  }, []); // Sadece bileşen mount edildiğinde bir kez çalışır

  // Notlar state'i her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    // Yalnızca notlar başlangıçta yüklendiyse kaydet (başlangıçta boş array kaydetmemek için)
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (err) {
        setError('Notlar kaydedilirken bir sorun oluştu.');
        console.error('Notlar kaydedilirken hata:', err);
      }
    }
  }, [notes, isLoading]); // 'notes' veya 'isLoading' değiştiğinde çalışır

  // Yeni not ekleme
  // addNote fonksiyonu artık sadece title: string alacak
  const addNote = useCallback((title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Not başlığı boş bırakılamaz.');
      return;
    }

    if (notes.some(n => n.title === trimmedTitle)) {
      setError('Bu başlıkta bir not zaten mevcut. Lütfen farklı bir başlık seçin.');
      return;
    }

    setError(null); // Önceki hataları temizle
    const newNote: Note = {
      title: trimmedTitle,
      content: '', // Yeni notlar için varsayılan boş içerik
      pinned: true, // Hızlı notlar için varsayılan olarak sabitlenmiş
    };
    // Yeni notu en başa ekle ve sırala
    setNotes(prev => [newNote, ...prev].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return a.title.localeCompare(b.title);
    }));
  }, [notes]); // 'notes' bağımlılığı 'notes.some' kullanımı için gerekli

  // Not silme
  const deleteNote = useCallback((titleToDelete: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.title !== titleToDelete));
    if (selectedNote?.title === titleToDelete) {
      setSelectedNote(null); // Seçili not silindiyse seçimi kaldır
    }
  }, [selectedNote]); // 'selectedNote' bağımlılığı 'selectedNote?.title' kullanımı için

  // Notu güncelleme
  // updateNote artık doğrudan güncellenmiş Note objesini alıyor
  const updateNote = useCallback((updatedNote: Note) => {
    if (!updatedNote || !updatedNote.title.trim()) {
      setError('Not başlığı boş bırakılamaz.');
      return;
    }

    setError(null); // Önceki hataları temizle
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.title === updatedNote.title ? updatedNote : note
      ).sort((a, b) => { // Güncelleme sonrası sıralamayı koru
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return a.title.localeCompare(b.title);
      })
    );
    // Eğer seçili not güncellendiyse, selectedNote'u da güncelle
    if (selectedNote?.title === updatedNote.title) {
        setSelectedNote(updatedNote);
    }
  }, [selectedNote]); // 'selectedNote' bağımlılığı 'selectedNote?.title' kullanımı için

  // Notu sabitleme/çözme
  const togglePin = useCallback((title: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.title === title ? { ...note, pinned: !note.pinned } : note
      ).sort((a, b) => { // Sabitleme/çözme sonrası sıralamayı koru
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return a.title.localeCompare(b.title);
      })
    );
  }, []);

  return {
    notes,
    isLoading,
    error,
    addNote,
    deleteNote,
    updateNote,
    togglePin,
    selectedNote,
    setSelectedNote,
    clearError: () => setError(null) // Hataları temizleme yardımcı fonksiyonu
  };
}