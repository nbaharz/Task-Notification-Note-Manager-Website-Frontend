'use client';
import { useState,useEffect } from 'react';
import BoardHeader from './BoardHeader';
import NoteGrid from '../../ui/Note/NoteGrid';
import AddNoteModal from '@/ui/Note/AddNoteModal';
import ViewNoteModal from '@/ui/Note/ViewNoteModal';
import AllNotesModal from '@/ui/Note/AllNotesModal';
import { useNotes } from '../../hooks/useNotes';
import { AnimatePresence } from 'framer-motion';
import CustomCalendar from '../../ui/Calendar/Calendar';
import ToDoList from '@/ui/ToDoList/toDoList';
import ExternalServices from '@/ui/ExternalServices/ExternalService';


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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // ⏱️ 1 saniye skeleton göster
    return () => clearTimeout(timer);
  }, []);

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
          isLoading={isLoading}
        />
        
        <div className="w-full max-w-[220px] justify-center lg:justify-start">
          <ExternalServices />
        </div>

        <div className="w-full lg:w-[30%] flex flex-col gap-6">
        <ToDoList />
        <CustomCalendar />
      </div>
      </section>

      <AnimatePresence>
        {showModal && (
          <AddNoteModal
            newNote={{ title: newNote.title, content: newNote.content }}
            setNewNote={({ title, content }) =>
              setNewNote({ ...newNote, title, content })
            }
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