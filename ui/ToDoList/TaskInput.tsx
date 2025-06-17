'use client';
import { FiPlus } from 'react-icons/fi';

interface TaskInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

export function TaskInput({ inputRef, value, onChange, onKeyDown, onAdd }: TaskInputProps) {
  return (
    <div className="pt-4 relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Bugün ne yapmak istiyorsun?"
        className="w-full p-3 pl-10 border-b border-gray-200 focus:outline-none focus:border-indigo-500 rounded-t-lg bg-white/50"
        aria-label="Add new task"
      />
      <FiPlus 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-indigo-500"
        onClick={onAdd}
      />
    </div>
  );
}