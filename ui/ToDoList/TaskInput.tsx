'use client';
import { FiPlus } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { useToDo } from '@/app/context/ToDoContext';

export function TaskInput() {
  const { addTask } = useToDo();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (value.trim()) {
      addTask({
        id: Date.now(),
        text: value.trim(),
        completed: false,
        date: new Date().toISOString().split('T')[0],
      });
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="pt-4 relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Bugün ne yapmak istiyorsun?"
        className="w-full p-3 pl-10 border-b border-gray-200 focus:outline-none focus:border-indigo-500 rounded-t-lg bg-white/50"
        aria-label="Add new task"
      />
      <FiPlus 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-indigo-500"
        onClick={handleAdd}
      />
    </div>
  );
}