'use client';

import { FiX } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
import ModalWrapper from '../ModalWrapper';
import { useState } from 'react';
import { useToDo } from '@/app/context/ToDoContext';
import { useModal } from '@/app/context/ModalContext';

type PriorityLevel = 'high' | 'medium' | 'low';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
  priority?: PriorityLevel;
  date: string;
}

const priorityOptions: PriorityLevel[] = ['high', 'medium', 'low'];

const getPriorityColor = (priority?: PriorityLevel) => {
  const colors = {
    high: 'bg-rose-600/80',
    medium: 'bg-cyan-600',
    low: 'bg-emerald-600',
    default: 'bg-gray-400'
  };

  return priority ? colors[priority] : colors.default;
};

export default function TaskDetailModal() {
  const { selectedTask, setSelectedTask, updateTask } = useToDo();
  const { closeModal } = useModal();
  const toDo = selectedTask;
  if (!toDo) return null;

  const [hasChanges, setHasChanges] = useState(false);
  const [originalTask] = useState({ ...toDo });

  const handleTaskChange = (updatedTask: Task) => {
    setSelectedTask({ ...updatedTask, date: toDo.date });
    setHasChanges(true);
  };

  const handleSaveAndClose = () => {
    if (toDo) {
      updateTask(toDo);
      setSelectedTask(null);
      closeModal();
    }
  };

  return (
    <ModalWrapper onClose={handleSaveAndClose} maxWidth="max-w-md">
      <div className={`h-2 ${getPriorityColor(toDo.priority)} rounded-t-xl`} />
      <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-b-xl p-8 border border-gray-200">
        <button 
          onClick={handleSaveAndClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          aria-label="Kapat"
        >
          <FiX />
        </button>
        
        <div className="mt-2">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Task
            </label>
            <input
              type="text"
              value={toDo.text}
              onChange={(e) => handleTaskChange({ ...toDo, text: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm placeholder-gray-400"
              
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Details
            </label>
            <textarea
              value={toDo.description || ''}
              onChange={(e) => handleTaskChange({ ...toDo, description: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm placeholder-gray-400"
              placeholder="Daha fazla detay ekleyin..."
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Priority
            </label>
            <div className="flex gap-2">
              {(['high', 'medium', 'low'] as const).map(priority => (
                <button
                  key={priority}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    toDo.priority === priority
                      ? `${getPriorityColor(priority)} text-white scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTaskChange({ ...toDo, priority })}
                  type="button"
                >
                  {priority === 'high' ? 'High' : priority === 'medium' ? 'Medium' : 'Low'}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {hasChanges && (
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSaveAndClose}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700/90 hover:bg-gray-50 transition-colors font-medium shadow-sm"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}