'use client';
import { FiX, FiSave, FiArrowLeft } from 'react-icons/fi';
import ModalWrapper from '../ModalWrapper';

interface AddNoteModalProps {
  newNote: { title: string; content: string };
  setNewNote: (note: { title: string; content: string }) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function AddNoteModal({ newNote, setNewNote, onSave, onClose }: AddNoteModalProps) {
  return (
    <ModalWrapper 
      onClose={onClose} 
      maxWidth="max-w-[95vw] md:max-w-[700px]" 
      maxHeight="h-[95vh] md:h-[800px]"
    >
      <div className="p-4 sm:p-6 flex flex-col h-full">
        {/* Mobile-friendly header with back button */}
        <div className="md:hidden flex items-center mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 mr-2"
          >
            <FiArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800 flex-1 text-center">New Note</h2>
        </div>
        
        {/* Desktop header */}
        <div className="hidden md:flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-700">New Note</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Title input */}
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="text-gray-800 placeholder:text-gray-400 text-xl md:text-2xl font-semibold mb-4 pb-2 outline-none border-b border-gray-200 focus:border-blue-500 transition-colors"
          autoFocus
        />

        {/* Content textarea */}
        <div className="flex-1 relative mt-2 mb-4 border border-gray-200 rounded-lg overflow-hidden">
          <textarea
            placeholder="Start typing your note here..."
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            className="w-full h-full p-4 text-gray-700 placeholder:text-gray-400 text-base outline-none resize-none"
          />
        </div>

        {/* Responsive footer with action buttons */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-3 sm:py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FiX size={18} />
              <span>Cancel</span>
            </button>
            
            <button
              onClick={onSave}
              disabled={!newNote.title.trim()}
              className="px-4 py-3 sm:py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FiSave size={18} />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}