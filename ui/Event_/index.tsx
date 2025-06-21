// ui/Event_/index.tsx
'use client';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import EventList from './EventList';
import EventCreateModal from './EventCreateModal';

export default function EventPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative w-full rounded-xl border border-white bg-white/80 backdrop-blur-md transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] overflow-hidden p-6">
        <div className="flex items-center justify-between w-full pb-4 border-b border-gray-200/60 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Events</h2>
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-amber-600 transition"
              onClick={() => setModalOpen(true)}
            >
              <FiPlus className="text-lg" /> Add Event
            </button>
        </div>
      <EventList />
        <EventCreateModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
