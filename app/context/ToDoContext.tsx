'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Task } from '@/types/types';

interface ToDoContextType {
  tasks: Task[];
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (task: Task) => void;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const useToDo = () => {
  const context = useContext(ToDoContext);
  if (!context) throw new Error("useToDo must be used within a ToDoProvider");
  return context;
};

export const ToDoProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tasks");
      try {
        const parsed = stored ? JSON.parse(stored) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const removeTask = (id: number) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const updateTask = (updatedTask: Task) =>
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));

  return (
    <ToDoContext.Provider value={{ tasks, selectedTask, setSelectedTask, addTask, removeTask, updateTask }}>
      {children}
    </ToDoContext.Provider>
  );
}; 