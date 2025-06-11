'use client';

import { useState, useEffect, useRef } from 'react';
import { FiTrash2, FiCheck, FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import TaskDetailModal from './TaskDetailModal';
import TaskSkeleton from './ToDoListSkeleton'; // <- burası önemli

interface Task {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
}

export default function ToDoList() {
  const [showTasks, setShowTasks] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      const stored = localStorage.getItem('tasks');
      if (stored) setTasks(JSON.parse(stored));
      setIsLoading(false);
      inputRef.current?.focus();
    }, 300); // simüle edilen yükleme
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

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

  const openModal = (task: Task) => {
    setModalTask(task);
  };

  const closeModal = () => {
    setModalTask(null);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    closeModal();
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-400/80';
      case 'medium': return 'bg-blue-500/80';
      case 'low': return 'bg-green-500/80';
      default: return 'bg-gray-400/80';
    }
  };

  return (
    <>
      <div className="ml-auto w-full max-w-[600px] rounded-xl border border-white bg-white backdrop-blur-md transition-all shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/40">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {tasks.length}
            </span>
            Tasks
          </h2>
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
              <div className="pt-4 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What needs to be done?"
                  className="w-full p-3 pl-10 border-b border-gray-200 focus:outline-none focus:border-indigo-500 rounded-t-lg"
                />
                <FiPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {isLoading ? (
                <div className="space-y-3 mt-4">
                  {[...Array(3)].map((_, i) => (
                    <TaskSkeleton key={i} />
                  ))}
                </div>
              ) : tasks.length > 0 ? (
                <motion.ul className="space-y-3 mt-4 max-h-[350px] overflow-y-auto pr-2 pb-2">
                  <AnimatePresence>
                    {tasks.map(task => (
                      <motion.li
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="relative bg-gray-300/10 rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
                      >
                        <div className={`absolute top-0 left-0 w-full h-1 ${getPriorityColor(task.priority)}`} />
                        <div className="flex items-start p-3">
                          <button
                            onClick={() => toggleComplete(task.id)}
                            className={`w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full border mr-3 mt-1 ${
                              task.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'
                            }`}
                          >
                            {task.completed && <FiCheck className="text-white text-xs" />}
                          </button>

                          <div 
                            className="flex-1 min-w-0 cursor-pointer py-1" 
                            onClick={() => openModal(task)}
                          >
                            <span className={`block break-words whitespace-pre-wrap text-left w-full min-w-0 ${
                              task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                            }`}>
                              {task.text}
                            </span>
                            {task.description && (
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {task.description}
                              </p>
                            )}
                          </div>

                          <div className="flex gap-1">
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-gray-400 hover:text-red-500 flex-shrink-0 p-1"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {modalTask && (
          <TaskDetailModal
            toDo={modalTask}
            onClose={closeModal}
            onSave={updateTask}
            setTask={setModalTask}
          />
        )}
      </AnimatePresence>
    </>
  );
}
