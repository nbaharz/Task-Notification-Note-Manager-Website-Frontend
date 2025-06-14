import { motion } from 'framer-motion';
import { FiSettings } from 'react-icons/fi';

export default function BoardHeader() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100"
    >
      <div className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-indigo-500 font-sans tracking-tight"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          bahar's board
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-sm font-medium"
        >
          Organize your thoughts and tasks
        </motion.p>
      </div>
      <div className="flex items-center gap-3">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-100 text-gray-600 transition-all shadow-sm hover:shadow-md"
        >
          <FiSettings className="text-indigo-500" />
          <span className="hidden sm:inline font-medium">Settings</span>
        </motion.button>
      </div>
    </motion.header>
  );
}