'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

export default function CustomCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className=" ml-auto max-w-[400px] max-h-[400px] rounded-xl border border-white/50 bg-white/70 backdrop-blur-md transition-all p-6 shadow-sm ">
      <Calendar
        onChange={(e) => setDate(e as Date)}
        value={date}
        locale="tr-TR"
        calendarType="gregory"
        className="modern-calendar w-full h-full"
      />
    </div>
  );
}
