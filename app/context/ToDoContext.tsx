'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Task } from '@/types/types';
import { getUserTasks } from '@/app/api/TaskApi/TaskApi';
import { useUser } from '@/app/context/UserContext';
import { title } from "node:process";
import { createTask } from '@/app/api/TaskApi/CreateTask';

interface ToDoContextType {
  tasks: Task[];
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
  refreshTasks: () => Promise<void>;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const useToDo = () => {
  const context = useContext(ToDoContext);
  if (!context) throw new Error("useToDo must be used within a ToDoProvider");
  return context;
};

export const ToDoProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!token) return;
    const fetchTasks = async () => {
      try {
        const data = await getUserTasks(token);
        const mapped = Array.isArray(data)
          ? data.map((t: any) => ({
              id: t.id,
              title: t.title,
              completed: t.isCompleted,
              description: t.description || '',
              priority: t.priority,
              date: t.createdAt,
              userId: t.userId,
              referenceType: t.referenceType,
            }))
          : [];
        setTasks(mapped);
      } catch (e) {
        // Hata yönetimi eklenebilir
      }
    };
    fetchTasks();
  }, [token]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };
  const removeTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const updateTask = (updatedTask: Task) =>
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));

  const refreshTasks = async () => {
    if (!token) return;
    try {
      const data = await getUserTasks(token);
      const mapped = Array.isArray(data)
        ? data.map((t: any) => ({
            id: t.id,
            title: t.title,
            completed: t.isCompleted,
            description: t.description || '',
            priority: t.priority,
            date: t.createdAt,
            userId: t.userId,
            referenceType: t.referenceType,
          }))
        : [];
      setTasks(mapped);
    } catch (e) {
      // Hata yönetimi eklenebilir
    }
  };

  return (
    <ToDoContext.Provider value={{ tasks, selectedTask, setSelectedTask, addTask, removeTask, updateTask, refreshTasks }}>
      {children}
    </ToDoContext.Provider>
  );
};