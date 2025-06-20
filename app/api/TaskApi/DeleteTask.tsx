import { Task } from '@/types/types';

export const deleteTask = async (task: Task ,token: string) => {
  const res = await fetch(`https://localhost:7117/api/ToDo/Delete/`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
     },
    body: JSON.stringify(task),

  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'Task creation failed');
  }

  return res.json();
};
  