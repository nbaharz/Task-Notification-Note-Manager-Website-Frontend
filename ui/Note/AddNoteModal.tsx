'use client';
import { FiX } from 'react-icons/fi';
import ModalWrapper from '../ModalWrapper';

// interface nesnenin sahip olmasi gereken structure tanimlar.
// component props icin interface yapisi tercih edilir.
interface AddNoteModalProps {
  newNote: { title: string; content: string };
  setNewNote: (note: { title: string; content: string }) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function AddNoteModal({ newNote, setNewNote, onSave, onClose }: AddNoteModalProps) {
  return (
    <ModalWrapper onClose={onClose} maxWidth="max-w-[700px]" maxHeight="h-[800px]">
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-700">New Note</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          className="text-gray-800 placeholder:text-gray-400 text-xl font-medium mb-4 pb-2 outline-none border-b border-gray-200 focus:border-blue-500 transition-colors"
          autoFocus
        />

        <textarea
          placeholder="Add Context"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          className="flex-1 text-gray-700 placeholder:text-gray-400 text-base outline-none resize-none"
        />

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!newNote.title.trim()}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}