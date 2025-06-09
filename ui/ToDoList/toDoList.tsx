'use client';

import { useState, useEffect, useRef } from 'react';
import { FiTrash2, FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  isEditing?: boolean;
}

export default function ToDoList() {
  const [showTasks, setShowTasks] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

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
    <div className="ml-auto w-full max-w-[400px] rounded-xl border border-white/50 bg-white/70 backdrop-blur-md transition-all shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/40">
        <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
        <button
          onClick={() => setShowTasks(prev => !prev)}
          className="text-gray-600 hover:text-indigo-600 transition cursor-pointer"
        >
          {showTasks ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showTasks && (
          <motion.div
            key="task-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden px-6 pb-4"
          >
            <div className="pt-4">
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
              <div className="text-center py-6 text-gray-400">
                <p>No tasks yet. Add one above.</p>
              </div>
            ) : (
              <motion.ul className="space-y-2 mt-4 max-h-[220px] overflow-y-auto pr-2">
                <AnimatePresence>
                  {tasks.map(task => (
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
                          defaultValue={task.text}
                          onBlur={() => handleEditBlur(task.id)}
                          onKeyDown={(e) => e.key === 'Enter' && handleEditBlur(task.id)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
