'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

export default function CustomCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="calendar-container">
      <Calendar
        onChange={(e) => setDate(e as Date)}
        value={date}
        locale="tr-TR"
        calendarType="gregory"
        className="modern-calendar"
      />
    </div>
  );
}