'use client';

import { useState, useEffect } from 'react';
import TrackedProductsModal from './TrackedProducts/TrackedProductsModal'; // Doğru import!

interface TrackedProduct {
  id: string;
  title: string;
  productUrl: string;
  recentPrice: string;
  isDiscounted: boolean;
  lastFetchTime: string;
  notifyOnDiscount: boolean;
}

export default function ExternalServices() {
  const [showModal, setShowModal] = useState(false);
  const [savedProducts, setSavedProducts] = useState<TrackedProduct[]>([]);

  // Optional: Kalıcılık için localStorage (eklersen çalışır)
  useEffect(() => {
    const stored = localStorage.getItem('trackedProducts');
    if (stored) {
      setSavedProducts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trackedProducts', JSON.stringify(savedProducts));
  }, [savedProducts]);

  const services = [
    { name: 'Tracked Products', color: 'text-red-500 border-red-300' },
    { name: 'News', color: 'text-red-500 border-red-300' },
    { name: 'Mail', color: 'text-red-500 border-red-300' },
  ];

  const handleClick = (name: string) => {
    if (name === 'Tracked Products') {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-md w-full max-w-[220px] border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">External Services</h2>
        <div className="flex flex-col gap-3">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleClick(service.name)}
              className={`border rounded-lg px-4 py-2 cursor-pointer hover:bg-red-50 transition ${service.color}`}
            >
              {service.name}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <TrackedProductsModal
          savedProducts={savedProducts}
          setSavedProducts={setSavedProducts}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
