import { Priority } from '@/types/types';

export const getPriorityColor = (priority?: string) => {
  const colors = {
    High: 'bg-rose-600',
    Medium: 'bg-cyan-600',
    Low: 'bg-emerald-600',
    default: 'bg-gray-400',
  };
  return priority ? colors[priority as Priority] || colors.default : colors.default;
};
