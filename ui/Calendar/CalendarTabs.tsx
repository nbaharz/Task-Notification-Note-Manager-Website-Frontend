'use client';

import { FiCalendar, FiBell } from 'react-icons/fi';

interface CalendarTabsProps {
  activeTab: 'calendar' | 'reminders';
  setActiveTab: (tab: 'calendar' | 'reminders') => void;
  remindersCount?: number;
}

export default function CalendarTabs({
  activeTab,
  setActiveTab,
  remindersCount = 0,
}: CalendarTabsProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <button
        className={`flex items-center gap-2 px-5 py-2 rounded-t-lg border-b-2 transition-all
          ${activeTab === 'calendar'
            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow'
            : 'bg-white border-transparent text-gray-400 hover:text-indigo-600'}
        `}
        onClick={() => setActiveTab('calendar')}
      >
        <FiCalendar className="text-indigo-400" />
        <span className="font-semibold">Calendar</span>
      </button>
      <button
        className={`flex items-center gap-2 px-5 py-2 rounded-t-lg border-b-2 transition-all
          ${activeTab === 'reminders'
            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow'
            : 'bg-white border-transparent text-gray-400 hover:text-indigo-600'}
        `}
        onClick={() => setActiveTab('reminders')}
      >
        <FiBell className="text-yellow-400" />
        <span className="font-semibold">Reminders</span>
        <span className="ml-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
          {remindersCount}
        </span>
      </button>
    </div>
  );
}