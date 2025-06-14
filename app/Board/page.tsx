// app/Board/page.tsx
'use client';

import { useState } from 'react';
import BoardHeader from './BoardHeader';
import NoteGrid from '@/ui/Note/NoteGrid';
import ViewNoteModal from '@/ui/Note/ViewNoteModal';
import AllNotesModal from '@/ui/Note/AllNotesModal';
import ToDoList from '@/ui/ToDoList/toDoList';
import CustomCalendar from '@/ui/Calendar/Calendar';
import ExternalServices from '@/ui/ExternalServices/ExternalService';
import { useNotes } from '@/hooks/useNotes';
import { AnimatePresence } from 'framer-motion';
import { Note } from '@/types/types';

export default function NoteBoard() {
  const [activeTab, setActiveTab] = useState('notes');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAllNotesModal, setShowAllNotesModal] = useState(false);

  const {
    notes,
    addNote,
    deleteNote,
    updateNote, // This now expects an argument!
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

      {/* Mobile Tabs */}
      <div className="md:hidden mb-4">
        <div className="flex border-b border-amber-200">
          {['notes', 'external', 'tasks', 'calendar'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-1 text-center text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-amber-600 text-amber-700'
                  : 'text-amber-600 hover:text-amber-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Notes */}
        <div className={`${activeTab === 'notes' ? 'block' : 'hidden'} md:block lg:col-span-1 ml-4 sm:ml-6 lg:ml-5`}>
        <NoteGrid
            notes={notes}
            onAddNote={(title) => addNote(title)}
            onViewNote={handleViewNote}
            onDeleteNote={deleteNote}
            onShowAllNotes={() => setShowAllNotesModal(true)}
          />
        </div>

        {/* Middle Column - External Services */}
        <div className={`${activeTab === 'external' ? 'block' : 'hidden'} md:block lg:col-span-1`}>
          <div className="w-full flex justify-center">
            <ExternalServices />
          </div>
        </div>

        {/* Right Column - ToDo + Calendar */}
        <div className="lg:col-span-1 space-y-6 px-4 sm:px-6 lg:px-5">
        <div className={`${activeTab === 'tasks' ? 'block' : 'hidden'} md:block`}>
          <ToDoList />
        </div>
        <div className={`${activeTab === 'calendar' ? 'block' : 'hidden'} md:block`}>
          <CustomCalendar />
        </div>
      </div>

      </div>

      {/* Modals */}
      <AnimatePresence>
        {showViewModal && selectedNote && (
          <ViewNoteModal
            note={selectedNote}
            onClose={() => setShowViewModal(false)}
            onSave={updateNote}
            setNote={setSelectedNote}
          />
        )}

        {showAllNotesModal && (
          <AllNotesModal
            notes={notes}
            onClose={() => setShowAllNotesModal(false)}
            onSelectNote={(note) => {
              setSelectedNote(note);
              setShowViewModal(true);
              setShowAllNotesModal(false);
            }}
            togglePin={togglePin}
            onDeleteNote={deleteNote}
          />
        )}
      </AnimatePresence>
    </div>
  );
}