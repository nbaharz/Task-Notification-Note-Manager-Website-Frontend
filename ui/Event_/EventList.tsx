// ui/Event_/EventList.tsx
'use client';
import { useEvent } from '@/app/context/EventContext';
import { FiCalendar, FiTrash2, FiClock } from 'react-icons/fi';

export default function EventList() {
  const { events, removeEvent } = useEvent();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-3 mt-4">
        {events.length === 0 && (
        <div className="text-center text-gray-500 mt-4 py-8">
          <FiCalendar className="text-gray-300 text-4xl mx-auto mb-3" />
          <p className="text-gray-400">No events yet</p>
          <p className="text-gray-300 text-sm mt-1">Create your first event to get started</p>
        </div>
        )}
        {events.map((event, idx) => (
        <div
            key={event.id || idx}
          className="group relative bg-white rounded-2xl shadow-[0_2px_8px_rgb(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden transition-all"
          >
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
          <div className="flex items-center p-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <FiCalendar className="text-amber-500 text-sm" />
                <span className="font-semibold text-gray-800 truncate">
                {event.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <FiClock className="text-amber-400" />
                <span>{formatDate(event.eventDate)}</span>
              </div>
              {event.description && (
                <p className="text-xs text-gray-600 line-clamp-1">
                  {event.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeEvent(event.id)}
              className="text-gray-400 hover:text-red-500 flex-shrink-0 p-1.5 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Delete event"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>
        ))}
    </div>
  );
}
