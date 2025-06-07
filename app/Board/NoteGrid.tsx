import { motion } from 'framer-motion';
import { FiPlus, FiChevronRight } from 'react-icons/fi';
import NoteCard from '@/ui/Note/NoteCard';
import NoteCardSkeleton from '@/ui/Note/NoteCardSkeleton';
import {Note} from '../../types/types';

interface NoteGridProps {
  notes: Note[];
  onAddNote: () => void;
  onViewNote: (note: Note) => void;
  onDeleteNote: (title: string) => void;
  onShowAllNotes: () => void;
}

export default function NoteGrid({ 
  notes, 
  onAddNote, 
  onViewNote, 
  onDeleteNote,
  onShowAllNotes
}: NoteGridProps) {
  const isLoading = false;
  
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
    <div className="w-full lg:w-[30%] space-y-6">
      {!isLoading && (
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Quick Notes</h2>
          {notes.length > 0 && (
            <button 
              onClick={onShowAllNotes}
              className="flex items-center text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 group"
            >
              See All <FiChevronRight className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      )}

      {/* Responsive grid adjustments */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
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
                  onClick={() => onViewNote(note)}
                  onDelete={() => onDeleteNote(note.title)}
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
            onClick={onAddNote}
            className="col-span-1"
          >
            <div className="
              w-full aspect-square max-w-full
              rounded-xl border border-white/70 bg-white/70
              backdrop-blur-md shadow-sm hover:shadow-md
              transition-all flex flex-col items-center justify-center
              text-gray-500 hover:text-indigo-600 cursor-pointer group
              p-2 sm:p-0 opacity-70 
            ">
              <div className="bg-indigo-100 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 sm:mb-2 group-hover:bg-indigo-200 transition-colors">
              <FiPlus className="
                                text-indigo-600
                                text-lg xs:text-xl sm:text-2xl
                                transition-transform group-hover:rotate-90
                              " />             
             </div>
              <span className="font-medium text-xs sm:text-sm md:text-base text-center">
                Add Note
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}