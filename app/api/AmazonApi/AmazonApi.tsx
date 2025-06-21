// Amazon ürün detaylarını çekmek için endpoint (POST, url body'de)
export const createTrackedProduct = async (url: string, token: string) => {
  const res = await fetch(`https://localhost:7117/api/TrackedProduct/GetProductDetails/lookup?url=${url}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Ürün bilgisi alınamadı');
  }

  return res.json();
};

// Kullanıcının takip ettiği ürünleri getirmek için endpoint (GET)
export const getUserTrackedProducts = async (token: string) => {
  const res = await fetch('https://localhost:7117/api/TrackedProduct/GetUserTrackedProducts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Kullanıcı ürünleri alınamadı');
  }

  return res.json();
};

export const deleteUserTrackedProducts = async (id:string, token: string) => {
  const res = await fetch(`https://localhost:7117/api/TrackedProduct/DeleteUserProduct/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Ürün silinirken bir hata oluştu');
  }
return res;
};
