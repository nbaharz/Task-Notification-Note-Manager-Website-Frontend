export const signUp = async (body: {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}) => {
  const res = await fetch('https://localhost:7117/api/User/SignIn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`SignIn error: ${res.status} - ${error}`);
  }

  return res.json();
};