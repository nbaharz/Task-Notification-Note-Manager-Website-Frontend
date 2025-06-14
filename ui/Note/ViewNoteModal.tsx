// ui/Note/ViewNoteModal.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // motion'ı kullanmasanız bile, eğer ModalWrapper içinde motion kullanılıyorsa, burada tutmak iyi olabilir.
import { FiX } from 'react-icons/fi';
import ModalWrapper from '../ModalWrapper';
import { Note } from '../../types/types'; // Note tipini import ettiğinizden emin olun

interface ViewNoteModalProps {
  note: Note; // Note tipini kullanıyoruz, böylece pinned özelliği de dahil
  onClose: () => void;
  // DEĞİŞİKLİK BURADA: onSave artık güncellenmiş Not objesini alacak
  onSave: (updatedNote: Note) => void;
  // setNote, artık sadece başlık ve içerik değil, tüm Note objesini güncelleyebilir
  setNote: (note: Note) => void;
}

export default function ViewNoteModal({ note, onClose, onSave, setNote }: ViewNoteModalProps) {
  // Modal açıldığında notun güncel başlık ve içeriğini tutmak için yerel state'ler
  const [currentTitle, setCurrentTitle] = useState(note.title);
  const [currentContent, setCurrentContent] = useState(note.content);

  // note prop'u değiştiğinde yerel state'leri güncelle
  useEffect(() => {
    setCurrentTitle(note.title);
    setCurrentContent(note.content);
  }, [note]);

  // Kaydetme ve kapatma işlevi
  const handleSaveAndClose = () => {
    // Note'un diğer özelliklerini (örn: pinned) koruyarak başlık ve içeriği güncelliyoruz
    const updatedNote: Note = {
      ...note, // Mevcut notun diğer özelliklerini korur
      title: currentTitle.trim(),
      content: currentContent.trim(),
    };
    onSave(updatedNote); // Güncellenmiş notu onSave callback'ine iletiyoruz
    onClose(); // Modalı kapatıyoruz
  };

  return (
    <ModalWrapper onClose={handleSaveAndClose} position="center" maxWidth="max-w-[700px]" maxHeight='max-h-[500px]' >
      <div className="p-6 flex justify-between items-center">
        <h2 className="sr-only">Note Details</h2> {/* Ekran okuyucular için başlık */}
        <button
          onClick={handleSaveAndClose} // Kapatma butonu da kaydetme ve kapatma işlevini çağırır
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close and Save Note" // Erişilebilirlik için
        >
          <FiX size={20} />
        </button>
      </div>
      <div className="px-6 pb-6 flex flex-col gap-4 flex-grow"> {/* flex-grow ile içeriğin alanı doldurması sağlanır */}
        <input
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)} // Yerel state'i güncelle
          className="text-xl font-medium text-gray-800 outline-none border-b border-gray-200 focus:border-blue-500 bg-transparent"
          placeholder="Title"
        />
        <textarea
          value={currentContent}
          onChange={(e) => setCurrentContent(e.target.value)} // Yerel state'i güncelle
          className="flex-1 min-h-[300px] text-gray-700 placeholder:text-gray-400 text-base outline-none resize-none bg-transparent"
          placeholder="Add Context"
        />
      </div>
    </ModalWrapper>
  );
}