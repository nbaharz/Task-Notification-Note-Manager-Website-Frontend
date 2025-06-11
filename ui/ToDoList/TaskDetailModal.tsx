'use client';

import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ModalWrapper from '../ModalWrapper';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface TaskDetailModalProps {
  toDo?: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
  setTask: (task: Task) => void;
}

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-blue-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-400';
  }
};

export default function TaskDetailModal({ toDo, onClose, onSave, setTask }: TaskDetailModalProps) {
  if (!toDo) return null;

  return (
    <ModalWrapper onClose={onClose} maxWidth="max-w-md">
      <div className={`h-2 ${getPriorityColor(toDo.priority)}`} />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Task Details</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              value={toDo.text}
              onChange={(e) => setTask({ ...toDo, text: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={toDo.description || ''}
              onChange={(e) => setTask({ ...toDo, description: e.target.value })}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Add more details..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <div className="flex gap-2">
              {(['high', 'medium', 'low'] as const).map(priority => (
                <button
                  key={priority}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    toDo.priority === priority
                      ? `${getPriorityColor(priority)} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setTask({ ...toDo, priority })}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(toDo)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}