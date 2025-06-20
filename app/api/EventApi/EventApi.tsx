import { Event } from '@/types/types';

// Kullanıcıya ait eventleri getir
export const getUserEvents = async (token: string) => {
  const res = await fetch('https://localhost:7117/api/Event/GetUserEvents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'GetUserEvents failed');
  }

  return res.json();
};

// Yeni event oluştur
export const createEvent = async (event: Event, token: string) => {
  const res = await fetch('https://localhost:7117/api/Event/CreateEvent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(event),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'Event creation failed');
  }

  return res.json();
};

// Event sil
export const deleteEvent = async (id: string, token: string) => {
  const res = await fetch(`https://localhost:7117/api/Event/Delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'Event deletion failed');
  }

  return res;
};

// Event güncelle
export const updateEvent = async (event: Event, token: string) => {
  const res = await fetch('https://localhost:7117/api/Event/UpdateEvent', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(event),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'Event update failed');
  }

  return res.json();
};
