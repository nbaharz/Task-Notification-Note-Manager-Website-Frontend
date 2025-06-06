'use client';
import { motion } from 'framer-motion';

export default function NoteCardSkeleton() {
  return (
    <motion.div
      className="
        w-full aspect-square max-w-[200px] rounded-xl 
        border border-white/50
        bg-white/40
        backdrop-blur-sm
        flex flex-col items-center justify-center
        animate-pulse
        overflow-hidden
        relative
      " 
      //notecardin gri arka plani burada
    >
      <div className="absolute top-2 left-2 right-2 flex justify-between">
        <div className="w-5 h-5 bg-gray-300/60 rounded-md" />
        <div className="w-4 h-4 bg-gray-200/50 rounded-full" />
      </div>

      <div className="flex flex-col gap-2 px-4 py-6 w-full items-center justify-center">
        <div className="h-4 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 rounded" />
      </div>

      <div className="absolute bottom-0 w-full h-1.5 bg-gray-300/40" />
      {/* notecardin ortasindaki koyu gri bolge (baslik yeri tutan) burada olusturldu */}
    </motion.div>
  );
}
