import { motion } from 'framer-motion';
import ToDoList from '@/ui/ToDoList/toDoList';

export default function ToDoPanel() {
  return (
    <aside className="w-full lg:w-[100%] mt-6 lg:mt-0 lg:pl-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="h-full"
      >
        <ToDoList />
      </motion.div>
    </aside>
  );
}