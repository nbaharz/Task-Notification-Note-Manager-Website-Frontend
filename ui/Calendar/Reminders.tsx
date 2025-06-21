'use client';

import { useState } from 'react';
import ReminderTabs from './ReminderTabs';
import EventReminders from './EventReminders';
import TaskReminders from './TaskReminders';

export default function Reminders({ onOpenEventReminderModal }: { onOpenEventReminderModal: () => void }) {
  const [activeTab, setActiveTab] = useState<'event' | 'task'>('event');

  return (
    <div>
      <ReminderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'event' && (
        <EventReminders
          onOpenEventReminderModal={onOpenEventReminderModal}
        />
      )}
      {activeTab === 'task' && <TaskReminders />}
    </div>
  );
}