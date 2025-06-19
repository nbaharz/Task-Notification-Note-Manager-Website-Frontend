'use client';
import { motion } from 'framer-motion';
import { FiX, FiTrash2,FiBookmark } from 'react-icons/fi';
import { useNote } from '@/app/context/NoteContext';
import { useModal } from '@/app/context/ModalContext';
import { Note } from '@/types/types';

export default function AllNotesModal() {
  const { notes, setSelectedNote, updateNote, removeNote } = useNote();
  const { closeModal } = useModal();

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    closeModal();
  };

  const handleTogglePin = (note: Note) => {
    updateNote({ ...note, pinned: !note.pinned });
  };

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
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
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
                  key={note.id}
                  className=" py-3 "
                >
                  <div className="flex justify-between items-start">
                    <div 
                      onClick={() => handleSelectNote(note)} 
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
                          handleTogglePin(note);
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
                          removeNote(note.id);
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