'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Event } from '@/types/types';

interface EventContextType {
  events: Event[];
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
  addEvent: (event: Event) => void;
  removeEvent: (id: string) => void;
  updateEvent: (event: Event) => void;
  refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvent must be used within an EventProvider');
  return context;
};

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // refreshEvents fonksiyonunu backend API ile entegre edin
  const refreshEvents = async () => {
    // örnek: backend'den eventleri çekip setEvents ile güncelleyin
    // const data = await getUserEvents(token);
    // setEvents(data);
  };

  const addEvent = (event: Event) => setEvents((prev) => [...prev, event]);
  const removeEvent = (id: string) => setEvents((prev) => prev.filter((e) => e.id !== id));
  const updateEvent = (updatedEvent: Event) =>
    setEvents((prev) => prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));

  useEffect(() => {
    refreshEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, selectedEvent, setSelectedEvent, addEvent, removeEvent, updateEvent, refreshEvents }}>
      {children}
    </EventContext.Provider>
  );
};
