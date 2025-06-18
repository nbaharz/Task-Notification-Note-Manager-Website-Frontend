'use client';
import { useState, useEffect, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiStar, FiEdit2 } from 'react-icons/fi';

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
        rotate: -2,
        boxShadow: '0 12px 32px -8px rgba(99,102,241,0.18), 0 6px 12px -6px rgba(99,102,241,0.10)',
      }}
      className={`
        w-full aspect-square max-w-[200px] rounded-xl 
        border border-dashed border-gray-300
        ${color}
        backdrop-blur-md 
        flex flex-col items-center justify-center 
        cursor-pointer text-center 
        overflow-hidden 
        group 
        relative
        shadow-[0_4px_16px_-4px_rgba(0,0,0,0.10)]
        before:content-[''] before:absolute before:top-3 before:left-1/2 before:-translate-x-1/2 before:w-5 before:h-5 before:bg-gradient-to-br before:from-gray-200 before:to-gray-400 before:rounded-full before:shadow-inner
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-3 after:bg-gradient-to-t after:from-yellow-100/60 after:to-transparent
        ${pinned ? 'ring-2 ring-indigo-300' : ''}
      `}
      style={{
        boxShadow: pinned 
          ? '0 4px 6px -1px rgba(99, 102, 241, 0.2), 0 2px 4px -1px rgba(99, 102, 241, 0.06)'
          : '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 23px, #e0e7ff 24px)`,
      }}
    >
      {/* Kağıt deliği efekti */}
      <span className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-200 border border-gray-300 rounded-full shadow-inner z-20"></span>
      {/* Delete and Pin button */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
        {onDelete && (
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors hover:bg-red-50/80"
            title="Sil"
          >
            <FiTrash2 size={16} />
          </button>
        )}
        {pinned && (
          <span className="text-yellow-400 bg-yellow-50/80 rounded-full p-1" title="Sabit">
            <FiStar size={16} />
          </span>
        )}
      </div>
      {/* Content */}
      <div 
        onClick={!isNew ? onClick : undefined} 
        className="flex flex-col items-center justify-center flex-1 w-full px-4 py-6"
      >
        {isNew ? (
          <div className="flex items-center gap-2 w-full">
            <FiEdit2 className="text-indigo-400" />
            <input
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter title..."
              className="text-sm text-center font-medium text-gray-800 placeholder-gray-400 bg-transparent border-b border-gray-300 focus:outline-none w-full"
            />
          </div>
        ) : (
          <p className="text-gray-800 font-medium group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug flex items-center justify-center gap-2">
            {title}
          </p>
        )}
      </div>
    </motion.div>
  );
});

NoteCard.displayName = 'NoteCard';

export default NoteCard;
