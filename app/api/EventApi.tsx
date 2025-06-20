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