'use client';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import ModalWrapper from '../ModalWrapper';


interface ViewNoteModalProps {
  note: { title: string; content: string };
  onClose: () => void;
  onSave: () => void;
  setNote: (note: { title: string; content: string }) => void;
}

export default function ViewNoteModal({ note, onClose, onSave, setNote }: ViewNoteModalProps) {
  const handleClose = () => {
    onSave();
    onClose();
  };

  return (
    <ModalWrapper onClose={handleClose} position="center" maxWidth="max-w-[700px]" maxHeight='max-h-[500px]' >
      <div className="p-6 flex justify-between items-center">
        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <FiX size={20} />
        </button>
      </div>
      <div className="px-6 pb-6 flex flex-col gap-4">
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          className="text-xl font-medium text-gray-800 outline-none border-b border-gray-200 focus:border-blue-500"
          placeholder="Title"
        />
        <textarea
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          className="flex-1 min-h-[400px] text-gray-700 placeholder:text-gray-400 text-base outline-none resize-none"
          placeholder="Add Context"
        />
      </div>
    </ModalWrapper>
  );
}