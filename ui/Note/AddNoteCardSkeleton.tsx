'use client';
import { motion } from 'framer-motion';

export default function AddNoteModalSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden animate-pulse"
      >
        <div className="p-6 border-b border-gray-100 flex items-center">
          <div className="h-6 w-1/3 bg-gray-300 rounded" />
        </div>
        <div className="p-6 space-y-4">
          <div className="h-10 bg-gray-200 rounded w-full" />
          <div className="h-28 bg-gray-200 rounded w-full" />
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-4">
          <div className="h-10 w-20 bg-gray-300 rounded" />
          <div className="h-10 w-20 bg-gray-300 rounded" />
        </div>
      </motion.div>
    </motion.div>
  );
}
