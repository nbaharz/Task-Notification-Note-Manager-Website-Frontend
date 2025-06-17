import { useState, useRef, useCallback, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  date: string;
}

export function useToDo() {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem('tasks');
      if (stored) {
        try {
          setTasks(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse tasks', error);
        }
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const addTask = useCallback((text: string) => {
    if (!text.trim()) return;
    const dateStr = formatDate(selectedDate);
    const newTask: Task = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      date: dateStr
    };

    setTasks(prev => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), newTask]
    }));

    inputRef.current?.focus();
  }, [selectedDate, formatDate]);

  const toggleComplete = useCallback((id: number) => {
    const dateStr = formatDate(selectedDate);
    setTasks(prev => ({
      ...prev,
      [dateStr]: prev[dateStr]?.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ) || []
    }));
  }, [selectedDate, formatDate]);

  const deleteTask = useCallback((id: number) => {
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
    isLoading,
    setIsLoading,
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
