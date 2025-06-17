export const login = async (body: {
  email: string;
  password: string;
}) => {
  const res = await fetch('https://localhost:7117/api/User/LoginUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body), // direkt body kullanılıyor
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'Login failed');
  }

  return res.json();
};
