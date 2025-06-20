// ui/Event_/EventList.tsx
'use client';
import { useEvent } from '@/app/context/EventContext';
import { FiCalendar, FiTrash2 } from 'react-icons/fi';

export default function EventList() {
  const { events, removeEvent } = useEvent();

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-lg font-bold mb-2">Events</h2>
      <ul className="space-y-3">
        {events.length === 0 && (
          <li className="text-gray-400 text-center py-6 bg-pink-50 rounded-lg">
            No events yet.
          </li>
        )}
        {events.map((event, idx) => (
          <li
            key={event.id}
            className="flex items-center justify-between bg-white border border-pink-100 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition"
          >
            <div>
              <div className="font-semibold text-pink-700 flex items-center gap-2">
                <FiCalendar className="text-pink-400" />
                {event.title}
              </div>
              <div className="text-xs text-gray-500">{event.eventDate}</div>
              <div className="text-xs text-gray-500">{event.description}</div>
            </div>
            <button
              onClick={() => removeEvent(event.id)}
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
