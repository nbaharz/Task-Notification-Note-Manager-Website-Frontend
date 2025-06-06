'use client'
import { useEffect, useState } from 'react';
import AddNoteModal from '@/ui/Note/AddNoteModal';
import AddNoteModalSkeleton from '@/ui/Note/AddNoteModalSkeleton';
import ViewNoteModal from '@/ui/Note/ViewNoteModal';
import NoteCard from '@/ui/Note/NoteCard';
import NoteCardSkeleton from '@/ui/Note/NoteCardSkeleton';
import ToDoList from '@/ui/ToDoList/toDoList';
import AllNotesModal from '@/ui/Note/AllNotesModal';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiSettings, FiChevronRight } from 'react-icons/fi';


interface Note {
  title: string;
  content: string;
  pinned?: boolean;
}

export default function NoteBoard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAllNotesModal, setShowAllNotesModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState<Note>({ title: '', content: '', pinned: false });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    setIsModalLoading(true);
    setTimeout(() => {
      if (newNote.title.trim() === '') {
        setIsModalLoading(false);
        return;
      }
      setNotes([...notes, { ...newNote, pinned: true }]);
      setNewNote({ title: '', content: '', pinned: false });
      setShowModal(false);
      setIsModalLoading(false);
    }, 500); // Simulate API delay
  };

  const handleDeleteNote = (titleToDelete: string) => {
    setNotes(notes.filter(note => note.title !== titleToDelete));
    setSelectedNote(null);
    setShowViewModal(false);
  };

  const handleUpdateNote = () => {
    if (!selectedNote) return;
    setNotes(notes.map(note => 
      note.title === selectedNote.title ? selectedNote : note
    ));
  };

  const togglePin = (title: string) => {
    setNotes(notes.map(note =>
      note.title === title ? { ...note, pinned: !note.pinned } : note
    ));
  };

const getDisplayNotes = (): (Note | null)[] => {
  if (isLoading) {
    const pinnedCount = notes.filter(n => n.pinned).length;
    const skeletonCount = pinnedCount > 0 ? Math.min(5, pinnedCount) : 1;
    return new Array(skeletonCount).fill(null);
  }
  return notes.filter(note => note.pinned).slice(0, 5);
};

  const displayNotes = getDisplayNotes();

  return (
    <main className="p-4 sm:p-6 md:p-8 lg:p-12 min-h-screen bg-gradient-to-r from-purple-200 to-yellow-100 text-gray-900 font-sans">
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200"
      >
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            bahar's board
          </h1>
          <p className="text-gray-800 text-sm mt-1">Organize your thoughts and tasks</p>
        </div>
        <button className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-400 border border-gray-200 text-gray-700 transition-colors">
          <FiSettings className="text-indigo-500" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </motion.header>

      <section className="flex flex-col lg:flex-row gap-6 justify-between">
        {/* Left: Note Cards */}
        <div className="w-full lg:w-[30%] space-y-6">
          {!isLoading && (
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Quick Notes</h2>
              {notes.length > 0 && (
                <button 
                  onClick={() => setShowAllNotesModal(true)}
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 group"
                >
                  See All <FiChevronRight className="ml-1 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {displayNotes.map((note, index) => (
              isLoading ? (
                <NoteCardSkeleton key={`skeleton-${index}`} />
              ) : (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="col-span-1 h-full"
                >
                  {note && (
                    <NoteCard
                      title={note.title}
                      pinned={note.pinned}
                      onClick={() => {
                        setSelectedNote(note);
                        setShowViewModal(true);
                      }}
                      onDelete={() => handleDeleteNote(note.title)}
                    />
                  )}
                </motion.div>
              )
            ))}
            
            {!isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(true)}
                className="col-span-1"
              >
                <div className="
                  w-full aspect-square max-w-[200px]
                  rounded-xl border border-white/70 bg-white/70
                  backdrop-blur-md shadow-sm hover:shadow-md
                  transition-all flex flex-col items-center justify-center
                  text-gray-500 hover:text-indigo-600 cursor-pointer group
                ">
                  <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-200 transition-colors">
                    <FiPlus className="text-indigo-600 text-xl" />
                  </div>
                  <span className="font-medium text-center text-sm sm:text-base">
                    Add Note
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Spacer */}
        <div className="hidden lg:block lg:w-[5%]" />

        {/* Right: To Do List */}
        <aside className="w-full lg:w-[30%] mt-6 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ToDoList />
          </motion.div>
        </aside>
      </section>

      <AnimatePresence>
        {showModal && (
          isModalLoading ? (
            <AddNoteModalSkeleton />
          ) : (
            <AddNoteModal
              newNote={newNote}
              setNewNote={setNewNote}
              onSave={handleAddNote}
              onClose={() => setShowModal(false)}
            />
          )
        )}

        {showViewModal && selectedNote && (
          <ViewNoteModal
            note={selectedNote}
            onClose={() => setShowViewModal(false)}
            onSave={handleUpdateNote}
            setNote={setSelectedNote as (note: { title: string; content: string }) => void}
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
            onDeleteNote={handleDeleteNote}
          />
        )}
      </AnimatePresence>
    </main>
  );
}