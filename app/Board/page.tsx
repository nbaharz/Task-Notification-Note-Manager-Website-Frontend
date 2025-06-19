'use client';

import { useState } from 'react';
import BoardTabs from '@/ui/Board/BoardTabs';
import BoardContent from '@/ui/Board/BoardContext';
import Modals from '@/ui/Board/Modals';
import { useNotes } from '@/hooks/useNotes';
import { Note } from '@/types/types';
import Navbar from '../../ui/Navbar';
import Footer from '../../ui/Footer';
export default function NoteBoard() {
  const [activeTab, setActiveTab] = useState('notes');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAllNotesModal, setShowAllNotesModal] = useState(false);

  const {
    notes,
    addNote,
    deleteNote,
    updateNote,
    togglePin,
    selectedNote,
    setSelectedNote,
  } = useNotes();

  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
    setShowViewModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative font-sans">
      {/* Arka plan için degrade ve doku */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        {/* Yumuşak degrade */}
        <div className="w-full h-full bg-gradient-to-br from-[#f7fafc] via-[#fdf6e3] to-[#f7e2c5] absolute inset-0" />
        {/* Hafif doku için SVG pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#e2c48d" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <Navbar />
      <main className="flex-1">
        <BoardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <BoardContent
          activeTab={activeTab}
          notes={notes}
          onAddNote={addNote}
          onViewNote={handleViewNote}
          onDeleteNote={deleteNote}
          onShowAllNotes={() => setShowAllNotesModal(true)}
          onTogglePin={togglePin} // <-- Bunu ekle!
        />
        <Modals
          showViewModal={showViewModal}
          setShowViewModal={setShowViewModal}
          showAllNotesModal={showAllNotesModal}
          setShowAllNotesModal={setShowAllNotesModal}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          notes={notes}
          updateNote={updateNote}
          togglePin={togglePin}
          deleteNote={deleteNote}
        />
      </main>
      <Footer/>
    </div>
  );
}