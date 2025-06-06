'use client';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

interface NoteCardProps {
  title: string;
  onClick: () => void;
  onDelete?: () => void;
  pinned?: boolean;
}

export default function NoteCard({ title, onClick, onDelete, pinned }: NoteCardProps) {
  return (
    
    <motion.div
  whileHover={{ 
    y: -5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)', 
  }}
  className={`
    w-full aspect-square max-w-[200px] rounded-xl 
    border border-white/70
    bg-white/70
    backdrop-blur-md 
    flex flex-col items-center justify-center 
    cursor-pointer text-center 
    overflow-hidden 
    group 
    ${pinned ? 'ring-1 ring-indigo-100' : ''} `} //pinned ise board sayfasinda goster
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
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors hover:bg-red-50/80"
        >
          <FiTrash2 size={16} />
        </button>
      )}
      </div>

      {/* Content */}
      <div 
        onClick={onClick} 
        className="flex flex-col items-center justify-center flex-1 w-full px-4 py-6"
      >
        <p className="text-gray-800 font-medium group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
          {title}
        </p>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 w-full h-1.5 bg-gradient-to-r from-indigo-400/80 to-purple-400/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Subtle paper texture */}
      {/* <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }} /> */}
    </motion.div>
  );
}