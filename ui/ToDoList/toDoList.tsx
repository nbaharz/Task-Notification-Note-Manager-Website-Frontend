'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToDo } from '@/hooks/useToDo';
import { TaskHeader } from './TaskHeader';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';
import TaskDetailModal from './TaskDetailModal';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

export default function ToDoList() {
  const {
    selectedDate,
    setShowTasks,
    showTasks,
    inputRef,
    getCurrentTasks,
    addTask,
    isLoading,
    modalTask,
    setModalTask,
    navigateDate,
    toggleComplete,
    deleteTask,
    updateTask,
    handleDragEnd,
  } = useToDo();

  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask(inputValue);
      setInputValue('');
    }
  };

  const handleAdd = () => {
    addTask(inputValue);
    setInputValue('');
  };

  const currentTasks = getCurrentTasks();

  return (
    <>
      <div className="relative w-full rounded-xl border border-white bg-white/80 backdrop-blur-md transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] overflow-hidden">
        {/* Header and toggle button container */}
       <div className="flex items-center justify-between w-full px-6 pt-4 border-b border-white/40">
          <TaskHeader
            count={currentTasks.length}
            selectedDate={selectedDate}
            navigateDate={navigateDate}
          />
          <button
            onClick={() => setShowTasks((prev: boolean) => !prev)}
            className="text-gray-600 hover:text-indigo-600 transition cursor-pointer flex-shrink-0"
            aria-label={showTasks ? 'Hide tasks' : 'Show tasks'}
          >
            {showTasks ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showTasks && (
            <div className="overflow-hidden px-6 pb-4">
              <TaskInput
                inputRef={inputRef}
                value={inputValue}
                onChange={setInputValue}
                onKeyDown={handleKeyDown}
                onAdd={handleAdd}
              />
              <TaskList
                tasks={currentTasks}
                isLoading={isLoading}
                onToggleComplete={toggleComplete}
                onDelete={deleteTask}
                onOpenModal={setModalTask}
                onDragEnd={handleDragEnd}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {modalTask && (
          <TaskDetailModal
            toDo={modalTask}
            onClose={() => setModalTask(null)}
            onSave={updateTask}
            setTask={setModalTask}
          />
        )}
      </AnimatePresence>
    </>
  );
}