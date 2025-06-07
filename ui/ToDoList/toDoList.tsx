'use client';
import { useState, useEffect, useRef } from 'react';
import { FiTrash2, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import AllTasksModal from '@/ui/ToDoList/AllTasksModal';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  isEditing?: boolean;
}

export default function ToDoList() {
  const [showAllModal, setShowAllModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const visibleTasks = tasks.slice(0, 5);

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask();
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleTaskClick = (task: Task) => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, isEditing: true } : t));
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const handleEditBlur = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isEditing: false } : t));
  };

  return (
    <div className="rounded-xl border border-white/50 bg-white/70 backdrop-blur-md transition-all flex flex-col items-center justify-center cursor-pointer text-center overflow-hidden group max-w-md mx-auto p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Tasks</h2>
        <p className="text-sm text-gray-500">
          {tasks.filter(t => !t.completed).length} remaining
        </p>
      </div>

      <div className="mb-6 w-full">
        <input
          ref={inputRef}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="w-full p-3 border-b border-gray-200 focus:outline-none text-center focus:border-indigo-500"
        />
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>No tasks yet. Add one above.</p>
        </div>
      ) : (
        <motion.ul className="space-y-2 w-full">
          <AnimatePresence>
            {visibleTasks.map(task => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center py-2 w-full"
              >
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full border mr-3 mt-1 ${
                    task.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'
                  }`}
                >
                  {task.completed && <FiCheck className="text-white text-xs" />}
                </button>

              {task.isEditing ? (
              <input
                ref={editInputRef}
                type="text"
                value={task.text}
                onChange={(e) =>
                  setTasks(tasks.map(t =>
                    t.id === task.id ? { ...t, text: e.target.value } : t
                  ))
                }
                onBlur={() => handleEditBlur(task.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEditBlur(task.id);
                }}
                className="flex-1 bg-transparent outline-none"
                autoFocus
              />
            ) : (
              <span
                onClick={() => handleTaskClick(task)}
                className={`flex-1 break-words whitespace-pre-wrap text-left w-full min-w-0 ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                }`}
              >
                {task.text}
              </span>
            )}

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 ml-2 flex-shrink-0"
                >
                  <FiTrash2 size={16} />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {tasks.length > 5 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAllModal(true)}
            className="text-sm text-blue-500 hover:underline"
          >
            See All
          </button>
        </div>
      )}

      {tasks.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <button
            onClick={() => setTasks([])}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Modal sadece bu kalsın */}
      <AnimatePresence>
        {showAllModal && (
          <AllTasksModal
            tasks={tasks}
            onClose={() => setShowAllModal(false)}
            onDelete={deleteTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
