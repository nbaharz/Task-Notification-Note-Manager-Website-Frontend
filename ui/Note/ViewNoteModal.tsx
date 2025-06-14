'use client';
import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDroplet } from 'react-icons/fi';
import ModalWrapper from '../ModalWrapper';
import { Note } from '@/types/types';
import ColorButton from './ColorButton';
import { NOTE_COLORS } from './constants';

interface ViewNoteModalProps {
  note: Note;
  onClose: () => void;
  onSave: (updatedNote: Note) => void;
  setNote?: (note: Note) => void;
}

function ViewNoteModal({ note, onClose, onSave, setNote }: ViewNoteModalProps) {
  const [currentTitle, setCurrentTitle] = useState(note.title);
  const [currentContent, setCurrentContent] = useState(note.content);
  const [currentColor, setCurrentColor] = useState(note.color || 'bg-white/70');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorButtonRef = useRef<HTMLButtonElement>(null);

  // Update internal states when note prop changes
  useEffect(() => {
    setCurrentTitle(note.title);
    setCurrentContent(note.content);
    setCurrentColor(note.color || 'bg-white/70');
  }, [note]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  }, []);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContent(e.target.value);
  }, []);

  const handleColorSelect = useCallback((colorValue: string) => {
    setCurrentColor(colorValue);
    setShowColorPicker(false);
  }, []);

  const handleSaveAndClose = useCallback(() => {
    const updatedNote = {
      ...note,
      title: currentTitle.trim(),
      content: currentContent.trim(),
      color: currentColor,
    };

    onSave(updatedNote);
    setNote?.(updatedNote);
    onClose();
  }, [note, currentTitle, currentContent, currentColor, onSave, setNote, onClose]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (colorButtonRef.current && !colorButtonRef.current.contains(event.target as Node)) {
      setShowColorPicker(false);
    }
  }, []);

  useEffect(() => {
    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker, handleClickOutside]);

  return (
    <ModalWrapper
      onClose={handleSaveAndClose}
      position="center"
      maxWidth="max-w-[700px]"
      maxHeight="max-h-[500px]"
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2 relative">
          <button
            ref={colorButtonRef}
            onClick={() => setShowColorPicker(!showColorPicker)}
            className={`w-8 h-8 rounded-full border-2 ${currentColor} flex items-center justify-center transition-all hover:scale-110 hover:shadow-md`}
            aria-label="Choose note color"
          >
            <FiDroplet className="text-gray-600 text-sm" />
          </button>

          <AnimatePresence>
            {showColorPicker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 z-20 bg-white rounded-xl shadow-lg p-2"
                style={{
                  transform: 'translateX(-25%)',
                  minWidth: '200px',
                }}
              >
                <div className="grid grid-cols-3 gap-2">
                  {NOTE_COLORS.map((color) => (
                    <ColorButton
                      key={color.name}
                      color={color.value}
                      isSelected={currentColor === color.value}
                      onClick={() => handleColorSelect(color.value)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={handleSaveAndClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close and Save Note"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-4 flex-grow">
        <input
          type="text"
          value={currentTitle}
          onChange={handleTitleChange}
          className="flex-1 text-xl font-medium text-gray-800 outline-none border-b border-gray-200 focus:border-blue-500 bg-transparent py-2"
          placeholder="Title"
        />
        <textarea
          value={currentContent}
          onChange={handleContentChange}
          className="flex-1 min-h-[300px] text-gray-700 placeholder:text-gray-400 text-base outline-none resize-none bg-transparent"
          placeholder="Add your note content here..."
        />
      </div>
    </ModalWrapper>
  );
}

export default memo(ViewNoteModal);
