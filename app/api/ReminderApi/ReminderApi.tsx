// Reminder API endpoints

// Reminder oluştur
export const setReminder = async (reminderData: {
  title: string;
  description?: string;
  date: string;
  time: string;
  referenceType?: string;
  referenceId?: string;
}, token: string) => {
  const res = await fetch('https://localhost:7117/api/Reminder/SetReminder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(reminderData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'Reminder creation failed');
  }

  return res.json();
};

// Kullanıcının reminderlarını getir
export const getUserReminders = async (token: string) => {
  const res = await fetch('https://localhost:7117/api/Reminder/GetUserReminders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'GetUserReminders failed');
  }

  return res.json();
};

// Reminder sil
export const deleteReminder = async (id: string, token: string) => {
  const res = await fetch(`https://localhost:7117/api/Reminder/Delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'Reminder deletion failed');
  }

  return res;
}; 