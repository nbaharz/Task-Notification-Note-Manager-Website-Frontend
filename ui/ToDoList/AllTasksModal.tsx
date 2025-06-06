'use client';
import { FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface AllTasksModalProps {
  tasks: Task[];
  onClose: () => void;
  onDelete: (id: number) => void;
}

export default function AllTasksModal({ tasks, onClose, onDelete }: AllTasksModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800">All Tasks</h3>
        <ul className="space-y-2 max-h-96 overflow-y-auto">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center py-2 w-full border-b">
              <span className={`flex-1 break-words whitespace-pre-wrap text-left w-full min-w-0 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {task.text}
              </span>
              <button
                onClick={() => onDelete(task.id)}
                className="text-gray-400 hover:text-red-500 ml-2 flex-shrink-0"
              >
                <FiTrash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-blue-500"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
