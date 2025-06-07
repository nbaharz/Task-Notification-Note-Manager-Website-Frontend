import { motion } from 'framer-motion';
import { FiSettings } from 'react-icons/fi';

export default function BoardHeader() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200"
    >
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          bahar's board
        </h1>
        <p className="text-gray-800 text-sm mt-1">Organize your thoughts and tasks</p>
      </div>
      <button className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-400 border border-gray-200 text-gray-700 transition-colors">
        <FiSettings className="text-indigo-500" />
        <span className="hidden sm:inline">Settings</span>
      </button>
    </motion.header>
  );
}