'use client';
import { useState, useRef, useEffect } from 'react';
import { FiX, FiDroplet } from 'react-icons/fi';
import { Rnd, RndDragCallback } from 'react-rnd';
import { NOTE_COLORS } from './constants';
import ColorButton from './ColorButton';
import { Note } from '@/types/types';

interface DraggableResizableNoteProps {
  note: Note;
  onClose: () => void;
  onSave: (updatedNote: Note) => void;
}

export default function DraggableResizableNote({ note, onClose, onSave }: DraggableResizableNoteProps) {
  const [currentTitle, setCurrentTitle] = useState(note.title);
  const [currentContent, setCurrentContent] = useState(note.content);
  const [currentColor, setCurrentColor] = useState(note.color || 'bg-white/70');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorButtonRef = useRef<HTMLButtonElement>(null);

  // Color picker dışına tıklayınca kapansın
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorButtonRef.current && !colorButtonRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    }
    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showColorPicker]);

  // Kaydet
  const handleSave = () => {
    onSave({
      ...note,
      title: currentTitle.trim(),
      content: currentContent.trim(),
      color: currentColor,
    });
    onClose();
  };

  // Sayfa yüksekliğini dinamik artır
  const handleDrag: RndDragCallback = (e, d) => {
    const windowHeight = window.innerHeight;
    const noteBottom = d.y + d.node.offsetHeight;
    const body = document.body;
    if (noteBottom + 40 > body.offsetHeight) {
      body.style.height = `${noteBottom + 80}px`;
    }
  };

  return (
    <Rnd
      default={{
        x: 120,
        y: 120,
        width: 520,
        height: 420,
      }}
      minWidth={340}
      minHeight={260}
      bounds="body"
      dragHandleClassName="draggable-note-header"
      className={`z-[200] absolute ${currentColor} shadow-2xl border border-gray-200 rounded-2xl`}
      style={{ background: 'white' }}
      onDrag={handleDrag}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="draggable-note-header cursor-move flex items-center justify-between px-4 py-3 border-b bg-white/80 rounded-t-2xl">
          <div className="flex items-center gap-3 relative">
            <button
              ref={colorButtonRef}
              onClick={() => setShowColorPicker(!showColorPicker)}
              className={`w-9 h-9 rounded-full border-2 ${currentColor} flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg shadow-md`}
              aria-label="Choose note color"
              type="button"
            >
              <FiDroplet className="text-gray-600 text-lg" />
            </button>
            <span className="text-gray-700 text-sm font-semibold">Pick color</span>
            {showColorPicker && (
              <div className="absolute left-0 top-full mt-3 z-30 bg-white rounded-xl shadow-2xl p-4 min-w-[220px]">
                <div className="mb-2 text-xs text-gray-700 font-semibold text-center">Pick color</div>
                <div className="grid grid-cols-4 gap-2">
                  {NOTE_COLORS.map((color) => (
                    <ColorButton
                      key={color.name}
                      color={color.value}
                      isSelected={currentColor === color.value}
                      onClick={() => {
                        setCurrentColor(color.value);
                        setShowColorPicker(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full"
            aria-label="Close"
            type="button"
          >
            <FiX size={22} />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 flex flex-col px-6 py-4 gap-4 overflow-y-auto">
          <input
            type="text"
            value={currentTitle}
            onChange={e => setCurrentTitle(e.target.value)}
            className="text-xl font-medium text-gray-800 outline-none border-b border-gray-200 focus:border-blue-500 bg-transparent py-2"
            placeholder="Title"
          />
          <textarea
            value={currentContent}
            onChange={e => setCurrentContent(e.target.value)}
            className="flex-1 min-h-[120px] text-gray-700 placeholder:text-gray-400 text-base outline-none resize-none bg-transparent"
            placeholder="Add your note content here..."
          />
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-3 border-t bg-white/80 rounded-b-2xl">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </Rnd>
  );
}