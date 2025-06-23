'use client';

import { FiX } from 'react-icons/fi';
import ModalWrapper from '../ModalWrapper';
import { useState } from 'react';
import { useToDo } from '@/app/context/ToDoContext';
import { useModal } from '@/app/context/ModalContext';
import { Task, Priority } from '@/types/types';
import { useUser } from '@/app/context/UserContext';
import { createTask } from '@/app/api/TaskApi/CreateTask';
import { updateTask as updateTaskApi } from '@/app/api/TaskApi/Update';
import { getPriorityColor } from './getPriorityColor';


const priorityOptions: Priority[] = ['High', 'Medium', 'Low'];

export default function TaskDetailModal() {
  const { selectedTask, setSelectedTask, addTask, updateTask, tasks, refreshTasks } = useToDo();
  const { closeModal } = useModal();
  const { token } = useUser();
  const [error, setError] = useState('');
  const toDo = selectedTask;
  if (!toDo) return null;

  const handleTaskChange = (updated: Partial<Task>) => {
    setSelectedTask({ ...toDo, ...updated });
    setError('');
  };

  const handleSaveAndClose = async () => {
    if (!toDo.title.trim()) return;
    if (!toDo.id) {
      if (!token) return;
      // Duplicate title check
      const duplicate = tasks.some(
        t => t.title && toDo.title && t.title.trim().toLowerCase() === toDo.title.trim().toLowerCase()
      );
      if (duplicate) {
        setError('Aynı başlığa sahip bir görev zaten var.');
        return;
      }
      try {
        const created = await createTask(toDo, token);
        addTask(created);
        await refreshTasks(); // Task ekledikten sonra backend'den güncel listeyi çek
      } catch (e) {
        setError('Görev oluşturulamadı.');
      }
    } else {
      if (!token) return;
      try {
        await updateTaskApi(toDo, token);
        await refreshTasks();
      } catch (e) {
        setError('Görev güncellenemedi.');
        return;
      }
    }
    setSelectedTask(null);
    closeModal();
  };

  return (
    <ModalWrapper onClose={() => { setSelectedTask(null); closeModal(); }} maxWidth="max-w-md">
      <div className={`h-2 ${getPriorityColor(toDo.priority)} rounded-t-xl`} />
      <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-b-xl p-8 border border-gray-200">
        <button 
          onClick={() => { setSelectedTask(null); closeModal(); }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          aria-label="Close"
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
              value={toDo.title}
              onChange={(e) => handleTaskChange({ title: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm placeholder-gray-400"
              placeholder="Task"
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Details
            </label>
            <textarea
              value={toDo.description || ''}
              onChange={(e) => handleTaskChange({ description: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm placeholder-gray-400"
              placeholder="Details"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Priority
            </label>
            <div className="flex gap-2">
              {priorityOptions.map(priority => (
                <button
                  key={priority}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                    toDo.priority === priority
                      ? `${getPriorityColor(priority)} text-white scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTaskChange({ priority })}
                  type="button"
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSaveAndClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700/90 hover:bg-gray-50 transition-colors font-medium shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}