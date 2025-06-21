import React, { useState } from 'react';
import { useEvent } from '@/app/context/EventContext';
import { Event } from '@/types/types';
import ModalWrapper from '../ModalWrapper';
import { FiX, FiCalendar, FiClock, FiFileText } from 'react-icons/fi';

interface EventCreateModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EventCreateModal({ open, onClose }: EventCreateModalProps) {
  const { addEvent } = useEvent();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!title.trim() || !date) {
      setError('Başlık ve tarih zorunlu!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await addEvent({
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
      onClose();
    } catch (e: any) {
      setError(e.message || 'Event eklenemedi');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <ModalWrapper onClose={onClose} maxWidth="max-w-md">
      <div className="h-2 bg-amber-500 rounded-t-xl" />
      <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-b-xl p-8 border border-gray-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          aria-label="Kapat"
        >
          <FiX />
        </button>
        
        <div className="mt-2">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Create New Event</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                Event Title
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition shadow-sm placeholder-gray-400"
                  placeholder="Enter event title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={40}
          />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                Event Date
              </label>
              <div className="relative">
                <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="date"
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition shadow-sm"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                Description
              </label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition shadow-sm placeholder-gray-400 resize-none"
                  placeholder="Add event description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <div className="flex gap-3 mt-8">
          <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium shadow-sm"
            disabled={loading}
          >
              Cancel
          </button>
          <button
              onClick={handleCreate}
              className="flex-1 px-4 py-3 bg-amber-500 text-white rounded-lg font-semibold shadow-sm hover:bg-amber-600 transition-colors disabled:opacity-60"
            disabled={loading}
          >
              {loading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
    </ModalWrapper>
  );
}
