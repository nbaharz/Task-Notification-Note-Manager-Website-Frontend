import { motion } from 'framer-motion';
import { FiPlus, FiChevronRight } from 'react-icons/fi';
import NoteCard from '@/ui/Note/NoteCard';
import NoteCardSkeleton from '@/ui/Note/NoteCardSkeleton';
import { Note } from '../../types/types';

interface NoteGridProps {
  notes: Note[];
  onAddNote: () => void;
  onViewNote: (note: Note) => void;
  onDeleteNote: (title: string) => void;
  onShowAllNotes: () => void;
  isLoading?: boolean;
}

export default function NoteGrid({ 
  notes, 
  onAddNote, 
  onViewNote, 
  onDeleteNote,
  onShowAllNotes,
  isLoading = false
}: NoteGridProps) {
  const getDisplayNotes = (): (Note | null)[] => {
    if (isLoading) {
      // Show 4 skeleton cards when loading
    const pinnedCount = notes.filter(note => note.pinned).length;
    // Return at least 1 skeleton, maximum 5
    const skeletonCount = Math.min(Math.max(1, pinnedCount), 5);
    return Array(skeletonCount).fill(null);    }
    // Show pinned notes (max 5) when not loading
    return notes.filter(note => note.pinned).slice(0, 5);
  };

  const displayNotes = getDisplayNotes();

  return (
    <div className="w-full lg:w-[30%] space-y-6">
      {/* Header section */}
      {!isLoading && (
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Quick Notes</h2>
          {notes.length > 0 && (
            <button 
              onClick={onShowAllNotes}
              className="flex items-center text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 group"
              aria-label="View all notes"
            >
              See All <FiChevronRight className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      )}

      {/* Notes grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {displayNotes.map((note, index) => (
          isLoading || note === null ? (
            <NoteCardSkeleton key={`skeleton-${index}`} />
          ) : (
            <motion.div
              key={`note-${note.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              // transition={{ duration: 0.3 }}
              className="col-span-1 h-full"
            >
              <NoteCard
                title={note.title}
                pinned={note.pinned}
                onClick={() => onViewNote(note)}
                onDelete={() => onDeleteNote(note.title)}
              />
            </motion.div>
          )
        ))}
        
        {/* Add Note Button */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              y: -5,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            className="
              w-full aspect-square max-w-[200px] rounded-xl 
              border border-white/70
              bg-white/40
              backdrop-blur-md 
              flex flex-col items-center justify-center 
              cursor-pointer text-center 
              overflow-hidden
              group
            "
            onClick={onAddNote}
            role="button"
            aria-label="Add new note"
          >
            <div className="flex flex-col items-center justify-center flex-1 w-full px-4 py-6">
              <div className="
                bg-indigo-100 w-10 h-10 rounded-full
                flex items-center justify-center
                mb-3 group-hover:bg-indigo-200 transition-colors
              ">
                <FiPlus className="
                  text-indigo-600
                  text-xl
                  transition-transform group-hover:rotate-90
                "/>
              </div>
              <p className="text-gray-800 font-medium group-hover:text-indigo-600 transition-colors">
                Add Note
              </p>
            </div>
            <div className="absolute bottom-0 w-full h-1.5 bg-gradient-to-r from-indigo-400/80 to-purple-400/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        )}
      </div>
    </div>
  );
}