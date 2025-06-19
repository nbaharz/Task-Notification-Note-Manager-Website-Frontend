'use client';

import { useState } from 'react';
import { FiX, FiCalendar, FiClock } from 'react-icons/fi';
import ModalWrapper from '../ModalWrapper';

interface EventReminderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: { title: string; description: string; date: string; time: string }) => void;
}

export default function EventReminderModal({ open, onClose, onSave }: EventReminderModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: string, value: string) => {
    if (!hasChanges) setHasChanges(true);
    switch (field) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'time':
        setTime(value);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;
    onSave({ title, description, date, time });
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setHasChanges(false);
    onClose();
  };

  if (!open) return null;

  return (
    <ModalWrapper onClose={onClose} maxWidth="max-w-md">
      <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-8 border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          aria-label="Kapat"
          type="button"
        >
          <FiX />
        </button>
        <h2 className="text-lg font-semibold mb-6">Set Event Reminder</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Event Title
            </label>
            <input
              className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm placeholder-gray-400"
              value={title}
              onChange={e => handleChange('title', e.target.value)}
              required
              placeholder="Event title"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Description
            </label>
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm placeholder-gray-400"
              value={description}
              onChange={e => handleChange('description', e.target.value)}
              rows={3}
              placeholder="Event description"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Event Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full p-3 pl-10 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
                value={date}
                onChange={e => handleChange('date', e.target.value)}
                required
              />
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" size={20} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Reminder Time
            </label>
            <div className="relative">
              <input
                type="time"
                className="w-full p-3 pl-10 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition shadow-sm"
                value={time}
                onChange={e => handleChange('time', e.target.value)}
                required
              />
              <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" size={20} />
            </div>
          </div>
          {hasChanges && (
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700/90 hover:bg-gray-50 transition-colors font-medium shadow-sm"
              >
                Save Reminder
              </button>
            </div>
          )}
        </form>
      </div>
    </ModalWrapper>
  );
}