'use client';
import { motion } from 'framer-motion';
import { FiX, FiTrash2,FiBookmark } from 'react-icons/fi';
import ModalWrapper from '../ModalWrapper';

interface Note {
  title: string;
  content: string;
  pinned?: boolean;
}

interface AllNotesModalProps {
  notes: Note[];
  onClose: () => void;
  onSelectNote: (note: Note) => void;
  togglePin: (title: string) => void;
  onDeleteNote: (titleToDelete: string) => void;
}

export default function AllNotesModal({
  notes,
  onClose,
  onSelectNote,
  togglePin,
  onDeleteNote,
}: AllNotesModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4" //all notes modal tanimlandi.
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">All Notes</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] py-1">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-sm">No notes available.</p>
          ) : (
            <ul className="space-y-3">
              {notes.map((note, idx) => (
                <motion.li
                  key={idx}
                  className=" py-3 "
                >
                  <div className="flex justify-between items-start">
                    <div 
                      onClick={() => onSelectNote(note)} 
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {note.pinned && (
                          <FiBookmark className="text-indigo-500" size={14} />
                        )}
                        <h3 className="text-lg font-medium text-gray-800">
                          {note.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex gap-3 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(note.title);
                        }}
                        className={`p-1 rounded-full ${
                          note.pinned 
                            ? 'text-indigo-500 bg-indigo-50' 
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        <FiBookmark size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteNote(note.title);
                        }}
                        className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>        
      </motion.div>
    </motion.div>
  );
}