// ui/Event_/EventInput.tsx
'use client';
import { useState } from 'react';
import { useEvent } from '@/app/context/EventContext';
import { FiCalendar, FiPlus } from 'react-icons/fi';

export default function EventInput() {
  const { addEvent } = useEvent();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    addEvent({
      id: Date.now().toString(),
      userId: '', // Gerekirse context veya user'dan alınabilir
      title: title.trim(),
      description: description.trim(),
      eventDate: date,
      referenceType: 'Event',
    });
    setTitle('');
    setDate('');
    setDescription('');
  };

  return (
    <form className="flex flex-col gap-2 mb-6 w-full max-w-none" onSubmit={handleAddEvent}>
      <div className="flex flex-col sm:flex-row gap-2 w-full max-w-none">
        <div className="flex-1 relative w-full max-w-none">
          <input
            className="w-full max-w-none border-2 border-pink-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-pink-400 transition"
            placeholder="Event title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={40}
          />
          <FiCalendar className="absolute right-3 top-3 text-pink-300" />
        </div>
        <input
          type="date"
          className="w-full max-w-none border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 transition"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="text"
          className="w-full max-w-none border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 transition"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-pink-600 transition min-w-[80px] w-full sm:w-auto"
        >
          <FiPlus /> Add
        </button>
      </div>
    </form>
  );
}
