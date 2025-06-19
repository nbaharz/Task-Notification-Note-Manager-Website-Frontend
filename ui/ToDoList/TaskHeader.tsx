'use client';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import React from 'react';

interface TaskHeaderProps {
  count: number;
  selectedDate: Date;
  navigateDate: (direction: 'prev' | 'next') => void;
}

const formatDisplayDate = (date: Date) => {
  return date.toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export function TaskHeader({ count, selectedDate, navigateDate }: TaskHeaderProps) {
  const formattedDate = selectedDate.toLocaleDateString('tr-TR', { weekday: 'long', month: 'long', day: 'numeric' });
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => { setIsMounted(true); }, []);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {isMounted && (
            <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {count}
            </span>
          )}
          <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateDate('prev')}
            className="text-gray-600 hover:text-indigo-600 transition cursor-pointer"
            aria-label="Previous day"
          >
            <FiChevronLeft size={20} />
          </button>
          <span className="text-sm text-gray-600">
            {formatDisplayDate(selectedDate)}
          </span>
          <button
            onClick={() => navigateDate('next')}
            className="text-gray-600 hover:text-indigo-600 transition cursor-pointer"
            aria-label="Next day"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}