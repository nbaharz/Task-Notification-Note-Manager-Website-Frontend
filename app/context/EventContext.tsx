'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Event } from '@/types/types';
import { getUserEvents, createEvent, deleteEvent, updateEvent as updateEventApi } from '@/app/api/EventApi/EventApi';

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

// Cookie'den token çekme yardımcı fonksiyonu
function getTokenFromCookie() {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : '';
}

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // refreshEvents fonksiyonunu backend API ile entegre edin
  const refreshEvents = async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) return;
      const data = await getUserEvents(token);
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setEvents([]);
    }
  };

  const addEvent = async (event: Event) => {
    try {
      const token = getTokenFromCookie();
      if (!token) return;
      const created = await createEvent(event, token);
      await refreshEvents();
    } catch (err) {
      // Hata yönetimi
    }
  };

  const removeEvent = async (id: string) => {
    try {
      const token = getTokenFromCookie();
      if (!token) return;
      await deleteEvent(id, token);
      await refreshEvents();
    } catch (err) {
      // Hata yönetimi
    }
  };

  const updateEvent = async (updatedEvent: Event) => {
    try {
      const token = getTokenFromCookie();
      if (!token) return;
      const updated = await updateEventApi(updatedEvent, token);
      setEvents((prev) => prev.map((e) => (e.id === updatedEvent.id ? updated : e)));
    } catch (err) {
      // Hata yönetimi
    }
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, selectedEvent, setSelectedEvent, addEvent, removeEvent, updateEvent, refreshEvents }}>
      {children}
    </EventContext.Provider>
  );
};
