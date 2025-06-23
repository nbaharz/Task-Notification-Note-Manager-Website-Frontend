'use client';
import { FiTrash2, FiCheck, FiMove } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types/types';
import { getPriorityColor } from './getPriorityColor';



interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onOpenModal: (task: Task) => void;
}



const formatTaskDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('tr-TR', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export function TaskItem({ task, onToggleComplete, onDelete, onOpenModal }: TaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id || '' });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 0.2s ease',
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
  } as const;

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout={false}
      initial={false}
      className={`relative bg-white rounded-2xl shadow-[0_2px_8px_rgb(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden transition-all ${isDragging ? 'relative' : ''}`}
    >
      <div className={`h-2 ${getPriorityColor(task.priority)}`} />
      <div className="flex items-center p-3">
        <button
          onClick={() => onToggleComplete(task.id!)}
          className={`w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full border mr-3 transition-colors ${
            task.iscompleted ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 hover:border-indigo-300'
          }`}
          aria-label={task.iscompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.iscompleted && <FiCheck className="text-white text-xs" />}
        </button>

        <div 
          className="flex-1 min-w-0 cursor-pointer" 
          onClick={() => onOpenModal(task)}
        >
          <span className={`block break-words whitespace-pre-wrap text-left w-full min-w-0 text-sm ${
            task.iscompleted ? 'line-through text-gray-400' : 'text-gray-700'
          }`}>
            {task.title}
          </span>
          <div className="flex items-center gap-2 mt-1">
            {task.description && (
              <p className="text-xs text-gray-500 line-clamp-1">
                {task.description}
              </p>
            )}
            <span className="text-xs text-gray-400">
              {formatTaskDate(task.date)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 ml-2">
          <button
            {...attributes}
            {...listeners}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0 p-1.5 transition-colors cursor-grab active:cursor-grabbing"
            aria-label="Drag to reorder"
          >
            <FiMove size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id || '');
            }}
            className="text-gray-400 hover:text-red-500 flex-shrink-0 p-1.5 transition-colors"
            aria-label="Delete task"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>
    </motion.li>
  );
}