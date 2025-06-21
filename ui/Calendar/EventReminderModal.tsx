'use client';

import { useState, useEffect } from 'react';
import { FiX, FiCalendar, FiClock, FiTrash2 } from 'react-icons/fi';
import ModalWrapper from '../ModalWrapper';
import { getUserEvents, deleteEvent } from '@/app/api/EventApi/EventApi';
import { setReminder } from '@/app/api/ReminderApi/ReminderApi';
import { Event } from '@/types/types';
import { useUser } from '@/app/context/UserContext';

interface EventReminderModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export default function EventReminderModal({ open, onClose, onSave }: EventReminderModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [reminderTime, setReminderTime] = useState('');
  const [reminderMessage, setReminderMessage] = useState('');
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useUser();

  // Fetch user events when modal opens
  useEffect(() => {
    if (open && token) {
      fetchUserEvents();
    }
  }, [open, token]);

  const fetchUserEvents = async () => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      const events = await getUserEvents(token);
      setUserEvents(Array.isArray(events) ? events : []);
    } catch (error) {
      console.error('Error fetching user events:', error);
      setUserEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!token) return;
    
    try {
      await deleteEvent(eventId, token);
      // Refresh the events list
      await fetchUserEvents();
      // Clear selection if deleted event was selected
      if (selectedEvent?.id === eventId) {
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !reminderTime) return;

    try {
      setIsSubmitting(true);
      
      // Create reminder data
      const reminderData = {
        title: selectedEvent.title,
        description: reminderMessage || selectedEvent.description,
        date: selectedEvent.eventDate,
        time: reminderTime,
        referenceType: 'Event',
        referenceId: selectedEvent.id
      };

      await setReminder(reminderData, token!);
      
      // Reset form
      setSelectedEvent(null);
      setReminderTime('');
      setReminderMessage('');
      
      // Close modal and notify parent
      onSave?.();
      onClose();
    } catch (error) {
      console.error('Error setting reminder:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <ModalWrapper onClose={onClose} maxWidth="max-w-2xl">
      <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-8 border border-gray-200 max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          aria-label="Kapat"
          type="button"
        >
          <FiX />
        </button>
        
        <h2 className="text-lg font-semibold mb-6">Set Event Reminder</h2>
        
        {/* Existing Events List */}
        <div className="mb-8">
          <h3 className="text-md font-medium mb-4 text-gray-700">Select an Event</h3>
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading events...</p>
            </div>
          ) : userEvents.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {userEvents.map((event) => (
                <div
                  key={event.id}
                  className={`flex items-center justify-between rounded-lg p-4 border cursor-pointer transition-all ${
                    selectedEvent?.id === event.id
                      ? 'bg-indigo-100 border-indigo-300 shadow-md'
                      : 'bg-indigo-50 border-indigo-100 hover:bg-indigo-75'
                  }`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FiCalendar className="text-indigo-500 text-sm" />
                      <span className="font-semibold text-gray-800">{event.title}</span>
                      {selectedEvent?.id === event.id && (
                        <span className="text-xs bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full">
                          Selected
                        </span>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FiClock className="text-indigo-400" />
                      <span>{formatEventDate(event.eventDate)}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEvent(event.id);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    title="Delete event"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
              <FiCalendar className="text-gray-300 text-2xl mx-auto mb-2" />
              <p>No events found</p>
            </div>
          )}
        </div>

        {/* Reminder Settings Form */}
        {selectedEvent && (
          <>
            <div className="border-t border-gray-200 mb-6"></div>
            
            <h3 className="text-md font-medium mb-4 text-gray-700">Reminder Settings</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  Reminder Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
                    value={reminderTime}
                    onChange={e => setReminderTime(e.target.value)}
                    required
                  />
                  <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" size={20} />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  Reminder Message (Optional)
                </label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm placeholder-gray-400"
                  value={reminderMessage}
                  onChange={e => setReminderMessage(e.target.value)}
                  rows={3}
                  placeholder="Custom reminder message (leave empty to use event description)"
                />
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Setting Reminder...' : 'Set Reminder'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </ModalWrapper>
  );
}