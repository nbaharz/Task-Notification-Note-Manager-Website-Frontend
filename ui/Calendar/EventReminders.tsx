'use client';

interface EventReminder {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
}

export default function EventReminders({ onOpenEventReminderModal, eventReminders }: { onOpenEventReminderModal: () => void; eventReminders: EventReminder[] }) {
  const events = eventReminders || [];

  return (
    <div>
      <ul className="mb-4 space-y-2">
        {events.map((event: EventReminder) => (
          <li key={event.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-indigo-50 rounded px-3 py-2">
            <div>
              <span className="font-semibold">{event.title}</span>
              <span className="ml-2 text-xs text-gray-500">{event.description}</span>
            </div>
            <div className="text-xs text-gray-500">
              {event.date} {event.time}
            </div>
          </li>
        ))}
        {events.length === 0 && (
          <li className="text-gray-400 text-center py-4">Henüz event yok.</li>
        )}
      </ul>
      <button
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        onClick={onOpenEventReminderModal}
      >
        Set Event Reminder
      </button>
    </div>
  );
}