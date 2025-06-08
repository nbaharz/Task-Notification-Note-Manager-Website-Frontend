'use client';
import { motion } from 'framer-motion';

export default function NoteCardSkeleton() {
  return (
    <motion.div
      className="
        w-full aspect-square max-w-[200px] rounded-xl 
        border border-gray-200
        bg-white/50
        flex flex-col
        overflow-hidden
        relative
      " 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Top bar with placeholder icons */}
      <div className="absolute top-3 left-3 right-3 flex justify-between">
        <div className="w-5 h-5 bg-gray-300 rounded-md" />
        <div className="w-4 h-4 bg-gray-300 rounded-full" />
      </div>

      {/* Content placeholder */}
      <div className="flex flex-col gap-3 px-4 py-6 w-full h-full items-center justify-center">
        <div className="h-5 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 rounded mt-2" />
      </div>

      {/* Bottom accent bar placeholder */}
      <div className="absolute bottom-0 w-full h-1.5 bg-gray-300" />
    </motion.div>
  );
}