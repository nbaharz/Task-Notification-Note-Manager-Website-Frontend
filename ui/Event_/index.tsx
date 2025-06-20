// ui/Event_/index.tsx
'use client';
import EventInput from './EventInput';
import EventList from './EventList';

export default function EventPage() {
  return (
    <div className="w-full h-full rounded-xl border border-amber-200 bg-white/80 shadow-lg overflow-hidden p-6 mt-0">
      <h2 className="text-xl font-bold text-amber-700 mb-4 text-center">Events</h2>
      <EventInput />
      <EventList />
    </div>
  );
}
