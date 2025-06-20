'use client';

import { useState } from 'react';
import { FiCalendar, FiPlus, FiTrash2 } from 'react-icons/fi';

export interface EventItem {
  title: string;
  date: string;
}

export default function Event() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleAddEvent = () => {
    if (!title.trim() || !date) return;
    setEvents(prev => [...prev, { title: title.trim(), date }]);
    setTitle('');
    setDate('');
  };

  const handleDelete = (idx: number) => {
    setEvents(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-lg mx-auto">
      <form
        className="flex flex-col sm:flex-row gap-2 mb-6"
        onSubmit={e => {
          e.preventDefault();
          handleAddEvent();
        }}
      >
        <div className="flex-1 relative">
          <input
            className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-pink-400 transition"
            placeholder="Event title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={40}
          />
          <FiCalendar className="absolute right-3 top-3 text-pink-300" />
        </div>
        <input
          type="date"
          className="border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 transition"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-pink-600 transition"
        >
          <FiPlus /> Add
        </button>
      </form>
      <ul className="space-y-3">
        {events.length === 0 && (
          <li className="text-gray-400 text-center py-6 bg-pink-50 rounded-lg">
            No events yet.
          </li>
        )}
        {events.map((event, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between bg-white border border-pink-100 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition"
          >
            <div>
              <div className="font-semibold text-pink-700">{event.title}</div>
              <div className="text-xs text-gray-500">{event.date}</div>
            </div>
            <button
              onClick={() => handleDelete(idx)}
              className="p-2 rounded-full hover:bg-pink-100 transition"
              title="Delete"
            >
              <FiTrash2 className="text-pink-400" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}