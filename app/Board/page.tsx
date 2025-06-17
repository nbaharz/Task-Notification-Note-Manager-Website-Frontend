'use client';

import { useState } from 'react';
import BoardHeader from './BoardHeader';
import BoardTabs from './BoardTabs';
import BoardContent from './BoardContext';
import Modals from './Modals';
import { useNotes } from '@/hooks/useNotes';
import { Note } from '@/types/types';

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
    <div className="min-h-screen p-4 md:p-6 bg-[#FDF6E3] text-gray-800 font-sans">
      <BoardHeader />
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
    </div>
  );
}
