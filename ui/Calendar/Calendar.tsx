'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="mt-6 w-full rounded-xl border border-white/50 bg-white/70 backdrop-blur-md p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Calendar</h3>
      <Calendar
        onChange={(date) => setSelectedDate(date as Date)}
        value={selectedDate}
        className="rounded-md border border-gray-200 w-full"
      />
    </div>
  );
}
