import { Task } from '@/types/types';

export const deleteTask = async (id: string, token: string) => {
  const res = await fetch(`https://localhost:7117/api/ToDo/Delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'Task deletion failed');
  }

  return res;
};
