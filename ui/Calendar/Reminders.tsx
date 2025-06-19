'use client';

import { useState } from 'react';
import ReminderTabs from './ReminderTabs';
import EventReminders from './EventReminders';
import TaskReminders from './TaskReminders';

export default function Reminders({ onOpenEventReminderModal, eventReminders }: any) {
  const [activeTab, setActiveTab] = useState<'event' | 'task'>('event');

  return (
    <div>
      <ReminderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'event' && (
        <EventReminders
          onOpenEventReminderModal={onOpenEventReminderModal}
          eventReminders={eventReminders}
        />
      )}
      {activeTab === 'task' && <TaskReminders />}
    </div>
  );
}