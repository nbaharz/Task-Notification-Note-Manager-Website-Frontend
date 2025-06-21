'use client';
import { useState, useEffect } from 'react';
import NoteGrid from '@/ui/Note/NoteGrid';
import ExternalServices from '@/ui/ExternalServices/ExternalService';
import ToDoList from '@/ui/ToDoList/toDoList';
import CalendarPanel from '@/ui/Calendar/CalendarPanel';
import EventBoardSection from '@/ui/Board/EventBoardSection'; // Import EventBoardSection


interface Props {
  activeTab: string;
  onOpenEventReminderModal: () => void;
}

export default function BoardContent({
  activeTab,
  onOpenEventReminderModal,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Notes */}
        <div className={`${activeTab === 'notes' ? 'block' : 'hidden'} md:block lg:col-span-1`}>
          <NoteGrid />
        </div>
        {/* External Services */}
        <div className={`${activeTab === 'external' ? 'block' : 'hidden'} md:block`}>
          <div className="h-full">
            <ExternalServices
              onOpenTrackedProductsModal={() => {}}
            />
          </div>
        </div>
        {/* ToDo List + Events (alt alta) */}
        <div className={`${activeTab === 'tasks' ? 'block' : 'hidden'} md:block`}>
          <div className="h-full flex flex-col gap-6">
            <ToDoList />
            <div>
              <EventBoardSection />
            </div>
          </div>
        </div>
        {/* Calendar */}
        <div className={`${activeTab === 'calendar' ? 'block' : 'hidden'} md:block`}>
          <div className="h-full">
            <CalendarPanel
              onOpenEventReminderModal={onOpenEventReminderModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}