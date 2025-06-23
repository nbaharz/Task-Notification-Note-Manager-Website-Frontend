'use client';
import { FiPlus } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { useToDo } from '@/app/context/ToDoContext';
import { useUser } from '@/app/context/UserContext';
import { useModal } from '@/app/context/ModalContext';
import { createTask } from '@/app/api/TaskApi/CreateTask';
import { Task } from '@/types/types';
import TaskDetailModal from './TaskDetailModal';

export function TaskInput() {
  const { addTask, setSelectedTask, tasks } = useToDo();
  const { token } = useUser();
  const { openModal } = useModal();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateTask = async () => {
    if (!value.trim() || !token) return;
    if (tasks.some(task => task.title.trim().toLowerCase() === value.trim().toLowerCase())) {
      setError('Aynı başlığa sahip bir görev zaten var.');
      return;
    }
    setLoading(true);
    setError('');
    const newTask: Task = {
      id: Date.now().toString(), // benzersiz id
      title: value.trim(),
      iscompleted: false,
      date: new Date().toISOString().split('T')[0],
      description: '',
      priority: 'medium',
    };
    try {
      const created = await createTask(newTask, token);
      addTask(created); // backend'den dönen task'ı ekle
      setValue('');
    } catch (e: any) {
      setError(e.message || 'Görev eklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handlePlusClick = () => {
    if (!token) return;
    const newTask: Task = {
      id: '',
      title: '',
      iscompleted: false,
      date: new Date().toISOString().split('T')[0],
      description: '',
      priority: '',
    };
    setSelectedTask(newTask);
    openModal('taskDetail');
  };

  return (
    <div className="pt-4 relative">
      <div className="flex items-center gap-2">
        <span>Bugün ne yapmak istiyorsun?</span>
        <FiPlus 
          className="text-gray-400 cursor-pointer hover:text-indigo-500"
          onClick={handlePlusClick}
        />
      </div>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      {/* Removed invalid prop 'onCreateTask' from TaskDetailModal */}
      <TaskDetailModal />
    </div>
  );
}