export const getDynamicNavbar = async (token: string) => {
  const res = await fetch('https://localhost:7117/api/User/GetName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}), // body boş olabilir veya gerekirse ekle
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.title || 'Login failed');
  }

  return res.json();
};
  