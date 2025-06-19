'use client';

import { useState } from 'react';
import CalendarTabs from './CalendarTabs';
import CustomCalendar from './Calendar';
import Reminders from './Reminders';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function CalendarPanel({ onOpenEventReminderModal, eventReminders }: any) {
  const [activeTab, setActiveTab] = useState<'calendar' | 'reminders'>('calendar');
  const [open, setOpen] = useState(true);

  // remindersCount ileride dinamik olabilir
  const remindersCount = 0;

  return (
    <div className="pr-4">
      <div
        className="w-full rounded-xl border border-white/50 bg-white/80 backdrop-blur-md transition-all p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]"
        style={{
          height: open ? 'auto' : 64,
          overflow: open ? 'visible' : 'hidden',
        }}
      >
        {/* Tablar ve panel aç/kapa butonu */}
        <div className="flex items-center justify-between ">
          <CalendarTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            remindersCount={remindersCount}
          />
          <button
            className="ml-2 p-2 rounded-full hover:bg-indigo-50 transition-colors"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Paneli kapat' : 'Paneli aç'}
            type="button"
          >
            {open ? <FiChevronDown size={20} /> : <FiChevronUp size={20} />}
          </button>
        </div>
        {open && (
          <>
            {activeTab === 'calendar' && <CustomCalendar />}
            {activeTab === 'reminders' && (
              <Reminders
                onOpenEventReminderModal={onOpenEventReminderModal}
                eventReminders={eventReminders}
              />
            )}
          </>
        )}
      </div>
      {/* <EventReminderModal open={modalOpen} ... /> BU YANLIŞ */}
    </div>
  );
}