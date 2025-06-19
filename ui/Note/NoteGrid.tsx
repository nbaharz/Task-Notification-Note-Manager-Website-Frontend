'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiStar } from 'react-icons/fi';
import NoteCard from '@/ui/Note/NoteCard';
import NoteCardSkeleton from '@/ui/Note/NoteCardSkeleton';
import { Note } from '../../types/types';

interface NoteGridProps {
  notes: Note[];
  onAddNote: (title: string) => void;
  onViewNote: (note: Note) => void;
  onDeleteNote: (title: string) => void;
  onShowAllNotes: () => void;
  onTogglePin: (title: string) => void;
}

const NoteGrid = memo(({
  notes,
  onAddNote,
  onViewNote,
  onDeleteNote,
  onShowAllNotes,
  onTogglePin,
}: NoteGridProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const addNoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timeout);
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      isAddingNote &&
      addNoteRef.current &&
      !addNoteRef.current.contains(e.target as Node)
    ) {
      setIsAddingNote(false);
    }
  }, [isAddingNote]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAddButton(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleAddNote = useCallback((title: string) => {
    onAddNote(title);
    setIsAddingNote(false);
  }, [onAddNote]);

  // Filtreleme
  const pinnedNotes = notes.filter((n) => n.pinned);
  const displayNotes = isLoading
    ? Array(6).fill(null)
    : showPinnedOnly
      ? pinnedNotes
      : notes;

  return (
    <div className="w-full lg:w-auto space-y-6 ml-4 sm:ml-4">
      {/* Tablar farkli dosyaya tasinabilir*/}
      <div className="flex items-center gap-2 mb-6">
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-t-lg border-b-2 transition-all
            ${showPinnedOnly
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow'
              : 'bg-white border-transparent text-gray-400 hover:text-indigo-600'}
          `}
          onClick={() => setShowPinnedOnly(true)}
        >
          <FiStar className="text-yellow-400" />
          <span className="font-semibold">Show Pinned</span>
          <span className="ml-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">{pinnedNotes.length}</span>
        </button>
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-t-lg border-b-2 transition-all
            ${!showPinnedOnly
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow'
              : 'bg-white border-transparent text-gray-400 hover:text-indigo-600'}
          `}
          onClick={() => setShowPinnedOnly(false)}
        >
          <span className="font-semibold">Show All</span>
          <span className="ml-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{notes.length}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-4 xl:gap-6">
        {displayNotes.map((note, index) =>
          note === null ? (
            <NoteCardSkeleton key={`skeleton-${index}`} />
          ) : (
            <motion.div
              key={`note-${note.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="col-span-1 h-full"
            >
              <NoteCard
                title={note.title}
                pinned={note.pinned}
                onClick={() => onViewNote(note)}
                onDelete={() => onDeleteNote(note.title)}
                color={note.color}
                onTogglePin={() => onTogglePin(note.title)}
              />
            </motion.div>
          )
        )}

        <AnimatePresence>
          {isAddingNote && (
            <motion.div
              ref={addNoteRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="col-span-1"
            >
              <NoteCard
                isNew
                onTitleSubmit={handleAddNote}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && !isAddingNote && showAddButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{
              y: -5,
              boxShadow:
                '0 10px 25px -5px rgba(99, 102, 241, 0.2), 0 5px 10px -5px rgba(99, 102, 241, 0.1)',
            }}
            className="w-full aspect-square max-w-[200px] rounded-xl border border-white/70 bg-white/40 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer text-center overflow-hidden group"
            onClick={() => setIsAddingNote(true)}
            role="button"
            aria-label="Add new note"
          >
            <div className="flex flex-col items-center justify-center flex-1 w-full px-4 py-6">
              <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition-colors">
                <FiPlus className="text-indigo-600 text-xl transition-transform group-hover:rotate-90" />
              </div>
              <p className="text-gray-800 font-medium group-hover:text-indigo-600 transition-colors">
                Add Note
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
});

NoteGrid.displayName = 'NoteGrid';

export default NoteGrid;
