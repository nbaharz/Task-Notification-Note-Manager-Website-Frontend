'use client';
import { useState } from 'react';
import BoardTabs from './BoardTabs';
import BoardContent from './BoardContext';
import Modals from './Modals';
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
    <div className="min-h-screen flex flex-col bg-[#FDF6E3] text-gray-800 font-sans">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-7xl"> {/* Maksimum genişlik ve otomatik margin */}
        <BoardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <BoardContent
          activeTab={activeTab}
          notes={notes}
          onAddNote={addNote}
          onViewNote={handleViewNote}
          onDeleteNote={deleteNote}
          onShowAllNotes={() => setShowAllNotesModal(true)}
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
      <Footer />
    </div>
  );
}