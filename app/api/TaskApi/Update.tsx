import { Task } from '@/types/types';
export const updateTask = async (task: Task, token: string) => {
  const res = await fetch('https://localhost:7117/api/ToDo/Update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'Task update failed');
  }

  return res.status === 204 ? null : res.json();
};
