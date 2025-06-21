// ui/Event_/EventInput.tsx
'use client';
import { useState } from 'react';
import { useEvent } from '@/app/context/EventContext';
import { FiCalendar, FiPlus } from 'react-icons/fi';
import EventCreateModal from './EventCreateModal';

export default function EventInput() {
  const { addEvent } = useEvent();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

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
    <div className="pt-4 relative">
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="flex-1 relative">
          <input
            className="w-full border-b border-gray-200 focus:outline-none focus:border-amber-500 rounded-t-lg bg-white/50 px-4 py-3 pr-10"
            placeholder="Event title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={40}
            disabled
          />
          <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <input
          type="date"
          className="w-full sm:w-48 border-b border-gray-200 focus:outline-none focus:border-amber-500 rounded-t-lg bg-white/50 px-4 py-3"
          value={date}
          onChange={e => setDate(e.target.value)}
          disabled
        />
        <input
          type="text"
          className="w-full sm:w-64 border-b border-gray-200 focus:outline-none focus:border-amber-500 rounded-t-lg bg-white/50 px-4 py-3"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled
        />
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-amber-500 text-white px-4 py-3 rounded-lg font-semibold shadow hover:bg-amber-600 transition min-w-[100px] w-full sm:w-auto"
          onClick={() => setModalOpen(true)}
        >
          <FiPlus className="text-lg" /> Add
        </button>
      </div>
      <EventCreateModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
