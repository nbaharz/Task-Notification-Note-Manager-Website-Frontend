'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToDo } from '@/app/context/ToDoContext';
import { TaskHeader } from './TaskHeader';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';
import TaskDetailModal from './TaskDetailModal';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { Task } from '@/types/types';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';

export default function ToDoList() {
  const {
    tasks,
    selectedTask,
  } = useToDo();

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showTasks, setShowTasks] = React.useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Görevleri tarihe göre filtrele
  const getCurrentTasks = () => {
    const day = selectedDate.toISOString().slice(0, 10);
    return tasks.filter(task => task.date && task.date.slice(0, 10) === day);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const currentTasks = getCurrentTasks();
  const [orderedTasks, setOrderedTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    setOrderedTasks(currentTasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, tasks.length]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = orderedTasks.findIndex((t) => t.id === active.id);
    const newIndex = orderedTasks.findIndex((t) => t.id === over.id);
    setOrderedTasks(arrayMove(orderedTasks, oldIndex, newIndex));
  };

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
              <TaskInput />
              <TaskList />
            </div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selectedTask && (
          <TaskDetailModal />
        )}
      </AnimatePresence>
    </>
  );
}