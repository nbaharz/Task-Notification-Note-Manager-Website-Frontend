import React, { useState } from 'react';
import { useEvent } from '@/app/context/EventContext';
import { Event } from '@/types/types';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-amber-700 text-center">Yeni Event Oluştur</h2>
        <div className="flex flex-col gap-3">
          <input
            className="border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 transition"
            placeholder="Event title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={40}
          />
          <input
            type="date"
            className="border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 transition"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <input
            type="text"
            className="border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 transition"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          {error && <div className="text-red-500 text-xs">{error}</div>}
          <button
            className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-pink-600 transition disabled:opacity-60"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? 'Ekleniyor...' : 'Create Event'}
          </button>
          <button
            className="mt-1 text-gray-500 hover:text-pink-500 text-xs underline"
            onClick={onClose}
            disabled={loading}
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}
