'use client';

interface ReminderTabsProps {
  activeTab: 'event' | 'task';
  setActiveTab: (tab: 'event' | 'task') => void;
}

export default function ReminderTabs({ activeTab, setActiveTab }: ReminderTabsProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        className={`px-4 py-1 rounded-t-lg border-b-2 transition-all font-medium
          ${activeTab === 'event'
            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow'
            : 'bg-transparent border-transparent text-gray-400 hover:text-indigo-600'}
        `}
        onClick={() => setActiveTab('event')}
      >
        Event Reminder
      </button>
      <button
        className={`px-4 py-1 rounded-t-lg border-b-2 transition-all font-medium
          ${activeTab === 'task'
            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow'
            : 'bg-transparent border-transparent text-gray-400 hover:text-indigo-600'}
        `}
        onClick={() => setActiveTab('task')}
      >
        Task Reminder
      </button>
    </div>
  );
}