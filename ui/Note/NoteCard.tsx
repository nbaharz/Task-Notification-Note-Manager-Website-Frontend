'use client';
import { useState, useEffect, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

interface NoteCardProps {
  title?: string;
  onClick?: () => void;
  onDelete?: () => void;
  pinned?: boolean;
  isNew?: boolean;
  onTitleSubmit?: (title: string) => void;
  color?: string;
}

const NoteCard = memo(({ 
  title, 
  onClick, 
  onDelete, 
  pinned, 
  isNew = false, 
  onTitleSubmit,
  color = 'bg-white/70'
}: NoteCardProps) => {
  const [inputValue, setInputValue] = useState(title ?? '');

  useEffect(() => {
    setInputValue(title ?? '');
  }, [title]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() && onTitleSubmit) {
      onTitleSubmit(inputValue.trim());
    }
  }, [inputValue, onTitleSubmit]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  }, [onDelete]);

  return (
    <motion.div
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.2), 0 5px 10px -5px rgba(99, 102, 241, 0.1)', 
      }}
      className={`
        w-full aspect-square max-w-[200px] rounded-xl 
        border border-white/70
        ${color}
        backdrop-blur-md 
        flex flex-col items-center justify-center 
        cursor-pointer text-center 
        overflow-hidden 
        group 
        ${pinned ? 'ring-1 ring-indigo-100' : ''}`}
      style={{
        boxShadow: pinned 
          ? '0 4px 6px -1px rgba(99, 102, 241, 0.2), 0 2px 4px -1px rgba(99, 102, 241, 0.06)'
          : '0 2px 4px 0 rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Delete button */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
        {onDelete && (
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors hover:bg-red-50/80"
          >
            <FiTrash2 size={16} />
          </button>
        )}
      </div>

      {/* Content */}
      <div 
        onClick={!isNew ? onClick : undefined} 
        className="flex flex-col items-center justify-center flex-1 w-full px-4 py-6"
      >
        {isNew ? (
          <input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter title..."
            className="text-sm text-center font-medium text-gray-800 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:outline-none"
          />
        ) : (
          <p className="text-gray-800 font-medium group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            {title}
          </p>
        )}
      </div>
    </motion.div>
  );
});

NoteCard.displayName = 'NoteCard';

export default NoteCard;
