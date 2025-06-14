// hooks/useNotes.ts
import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types/types'; 


const STORAGE_KEY = 'notes';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  // 'newNote' state'i kullanılmıyor, bu yüzden kaldırıldı.
  // const [newNote, setNewNote] = useState<Omit<Note, 'pinned'>>({ title: '', content: '' });
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes) as Note[];
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
      setIsLoading(false); 
    }
  }, []); 


  useEffect(() => {
   
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (err) {
        setError('Notlar kaydedilirken bir sorun oluştu.');
        console.error('Notlar kaydedilirken hata:', err);
      }
    }
  }, [notes, isLoading]); 

 
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

    setError(null); 
    const newNote: Note = {
      title: trimmedTitle,
      content: '', 
      pinned: true, 
    };

    setNotes(prev => [newNote, ...prev].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return a.title.localeCompare(b.title);
    }));
  }, [notes]); 


  const deleteNote = useCallback((titleToDelete: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.title !== titleToDelete));
    if (selectedNote?.title === titleToDelete) {
      setSelectedNote(null); 
    }
  }, [selectedNote]); 

 
  const updateNote = useCallback((updatedNote: Note) => {
    if (!updatedNote || !updatedNote.title.trim()) {
      setError('Not başlığı boş bırakılamaz.');
      return;
    }

    setError(null); 
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.title === updatedNote.title ? updatedNote : note
      ).sort((a, b) => { 
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return a.title.localeCompare(b.title);
      })
    );
  
    if (selectedNote?.title === updatedNote.title) {
        setSelectedNote(updatedNote);
    }
  }, [selectedNote]); 


  const togglePin = useCallback((title: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.title === title ? { ...note, pinned: !note.pinned } : note
      ).sort((a, b) => { 
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
    clearError: () => setError(null) 
  };
}