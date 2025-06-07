'use client'
import { useState } from 'react';
import BoardHeader from './BoardHeader';
import NoteGrid from './NoteGrid';
import ToDoPanel from './ToDoPanel';
import AddNoteModal from '@/ui/Note/AddNoteModal';
import ViewNoteModal from '@/ui/Note/ViewNoteModal';
import AllNotesModal from '@/ui/Note/AllNotesModal';
import { useNotes } from './useNotes';
import { AnimatePresence } from 'framer-motion';
import CustomCalendar from './Calendar';

export default function NoteBoard() {
  const {
    notes,
    addNote,
    deleteNote,
    updateNote,
    togglePin,
    newNote,
    setNewNote,
    selectedNote,
    setSelectedNote
  } = useNotes();
  
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAllNotesModal, setShowAllNotesModal] = useState(false);

  return (
    <main className="p-4 sm:p-6 md:p-8 lg:p-12 min-h-screen bg-gradient-to-r from-purple-200 to-yellow-100 text-gray-900 font-sans">
      <BoardHeader />
      
      <section className="flex flex-col lg:flex-row gap-6 justify-between">
        <NoteGrid 
          notes={notes}
          onAddNote={() => setShowModal(true)}
          onViewNote={(note) => {
            setSelectedNote(note);
            setShowViewModal(true);
          }}
          onDeleteNote={deleteNote}
          onShowAllNotes={() => setShowAllNotesModal(true)}
        />
        
        <div className="w-full lg:w-[350px] flex flex-col gap-6">
        <ToDoPanel />
        <CustomCalendar/>
        </div>
      </section>

      <AnimatePresence>
        {showModal && (
          <AddNoteModal
            newNote={newNote}
            setNewNote={setNewNote}
            onSave={() => {
              addNote();
              setShowModal(false);
            }}
            onClose={() => setShowModal(false)}
          />
        )}

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
    </main>
  );
}