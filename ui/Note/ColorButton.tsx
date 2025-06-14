'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

interface ColorButtonProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const ColorButton = memo(({ color, isSelected, onClick }: ColorButtonProps) => (
  <button
    onClick={onClick}
    className={`
      w-12 h-12 rounded-lg border-2 ${color} 
      flex items-center justify-center 
      transition-all hover:scale-105 hover:shadow-md
      ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
    `}
  >
    {isSelected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white/80 rounded-full p-1"
      >
        <FiCheck className="text-gray-700 text-sm" />
      </motion.div>
    )}
  </button>
));

ColorButton.displayName = 'ColorButton';

export default ColorButton; 