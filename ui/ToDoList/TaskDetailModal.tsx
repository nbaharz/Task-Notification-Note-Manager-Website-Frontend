'use client';

import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ModalWrapper from '../ModalWrapper';
import { useState } from 'react';

type PriorityLevel = 'high' | 'medium' | 'low';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
  priority?: PriorityLevel;
}

interface TaskDetailModalProps {
  toDo?: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
  setTask: (task: Task) => void;
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

export default function TaskDetailModal({ 
  toDo, 
  onClose, 
  onSave, 
  setTask 
}: TaskDetailModalProps) {
  if (!toDo) return null;

  const [hasChanges, setHasChanges] = useState(false);
  const [originalTask] = useState({ ...toDo });

  const handleTaskChange = (updatedTask: Task) => {
    setTask(updatedTask);
    setHasChanges(true);
  };

  return (
    <ModalWrapper onClose={onClose} maxWidth="max-w-md">
      <div className={`h-2 ${getPriorityColor(toDo.priority)} rounded-t-xl`} />
      <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-b-xl p-8 border border-gray-200">
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-6 ${getPriorityColor(toDo.priority)} bg-opacity-90`}> 
          <span className="text-white text-2xl"><FiX className="opacity-0" /></span>
          <h3 className="flex-1 text-lg font-bold text-white tracking-wide text-center">Task Details</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors text-2xl"
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Task Title
            </label>
            <input
              type="text"
              value={toDo.text}
              onChange={(e) => handleTaskChange({ ...toDo, text: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm placeholder-gray-400"
              placeholder="Enter task title..."
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Description
            </label>
            <textarea
              value={toDo.description || ''}
              onChange={(e) => handleTaskChange({ ...toDo, description: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm placeholder-gray-400"
              placeholder="Add more details..."
            />
          </div>
          
          <div>
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
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {hasChanges && (
          <div className="flex justify-end mt-8">
            <button
              onClick={() => {
                onSave(toDo);
                onClose();
              }}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium shadow-sm"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}