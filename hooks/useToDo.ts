import { useState, useRef, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';
import type { Task } from '@/types/types';

export function useToDo() {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [showTasks, setShowTasks] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatDate = useCallback((date: Date) => {
    return date.toISOString().split('T')[0];
  }, []);

  const getCurrentTasks = useCallback(() => {
    const dateStr = formatDate(selectedDate);
    return tasks[dateStr] || [];
  }, [tasks, selectedDate, formatDate]);

  const navigateDate = useCallback((direction: 'prev' | 'next') => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  }, []);

  const addTask = useCallback((text: string) => {
    if (!text.trim()) return;
    const dateStr = formatDate(selectedDate);
    const newTask: Task = {
      id: '',
      title: text.trim(),
      completed: false,
      date: dateStr
    };

    setTasks(prev => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), newTask]
    }));

    inputRef.current?.focus();
  }, [selectedDate, formatDate]);

  const toggleComplete = useCallback((id: string) => {
    const dateStr = formatDate(selectedDate);
    setTasks(prev => ({
      ...prev,
      [dateStr]: prev[dateStr]?.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ) || []
    }));
  }, [selectedDate, formatDate]);

  const deleteTask = useCallback((id: string) => {
    const dateStr = formatDate(selectedDate);
    setTasks(prev => ({
      ...prev,
      [dateStr]: prev[dateStr]?.filter(t => t.id !== id) || []
    }));
  }, [selectedDate, formatDate]);

  const updateTask = useCallback((updated: Task) => {
    const dateStr = formatDate(selectedDate);
    setTasks(prev => ({
      ...prev,
      [dateStr]: prev[dateStr]?.map(t => t.id === updated.id ? updated : t) || []
    }));
    setModalTask(null);
  }, [selectedDate, formatDate]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const dateStr = formatDate(selectedDate);
    setTasks(prev => {
      const current = prev[dateStr] || [];
      const oldIndex = current.findIndex(t => t.id === active.id);
      const newIndex = current.findIndex(t => t.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return prev;

      return {
        ...prev,
        [dateStr]: arrayMove(current, oldIndex, newIndex),
      };
    });
  }, [selectedDate, formatDate]);

  return {
    tasks,
    setTasks,
    selectedDate,
    setSelectedDate,
    modalTask,
    setModalTask,
    showTasks,
    setShowTasks,
    inputRef,
    getCurrentTasks,
    navigateDate,
    addTask,
    toggleComplete,
    deleteTask,
    updateTask,
    handleDragEnd
  };
}
