'use client';

import { useState, useEffect } from 'react';
import TrackedProductsModal from './TrackedProducts/TrackedProductsModal';
import { FiExternalLink } from 'react-icons/fi';
import { SiAmazon } from 'react-icons/si';
import { RiNewsLine } from 'react-icons/ri';
import { FaChartLine } from 'react-icons/fa';
import ExternalServicesSkeleton from './ExternalServicesSkeleton'; // Skeleton bileşenini import ediyoruz

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
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu ekliyoruz

  useEffect(() => {
    // Veri yükleme simülasyonu
    const timer = setTimeout(() => {
      const stored = localStorage.getItem('trackedProducts');
      if (stored) {
        setSavedProducts(JSON.parse(stored));
      }
      setIsLoading(false); // Veri yüklendikten sonra yüklemeyi bitir
    }, 200); // 1 saniye gecikme ile yükleme simülasyonu

    return () => clearTimeout(timer); // Cleanup
  }, []);

  useEffect(() => {
    // isLoading true ise localStorage'a yazma işlemini yapmayız.
    // Bu, iskelet gösterilirken boş bir array'in yazılmasını engeller.
    if (!isLoading) { 
      localStorage.setItem('trackedProducts', JSON.stringify(savedProducts));
    }
  }, [savedProducts, isLoading]);

  const services = [
    {
      name: 'Tracked Products',
      description: 'Amazon product tracking',
      icon: <SiAmazon className="text-[#FF9900]" size={32} />,
      subIcon: <FaChartLine className="text-green-500 absolute -bottom-2 -right-2" size={20} />,
      color: 'bg-orange-50 border-orange-100 hover:bg-orange-100',
      textColor: 'text-orange-800',
      bgPattern: 'bg-[url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54 54L6 6M6 54L54 6\' stroke=\'%23FF9900\' stroke-width=\'0.5\' stroke-linecap=\'square\'/%3E%3C/svg%3E")]'
    },
    {
      name: 'News API',
      description: 'Latest news updates',
      icon: <RiNewsLine className="text-blue-600" size={32} />,
      color: 'bg-blue-50 border-blue-100 hover:bg-blue-100',
      textColor: 'text-blue-800',
      bgPattern: 'bg-[url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 6v6M30 48v6M6 30h6M48 30h6\' stroke=\'%232563EB\' stroke-width=\'1\' stroke-linecap=\'square\'/%3E%3C/svg%3E")]'
    },
  ];

  const handleClick = (name: string) => {
    if (name === 'Tracked Products') {
      setShowModal(true);
    }
  };

  if (isLoading) {
    return <ExternalServicesSkeleton />; // Yükleniyorsa iskeleti göster
  }

  return (
    <>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm w-full max-w-[400px] min-w-[350px] border border-gray-200/70">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
          <FiExternalLink className="text-gray-500" size={24} />
          <span>External Services</span>
        </h2>
        <div className="flex flex-col gap-5">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => handleClick(service.name)}
              className={`relative flex items-start gap-5 border-2 rounded-xl px-6 py-5 cursor-pointer transition-all ${service.color} ${service.textColor} hover:shadow-md hover:-translate-y-1`}
            >
              <div className={`absolute inset-0 rounded-lg opacity-10 ${service.bgPattern}`}></div>
              <div className="relative p-4 bg-white rounded-xl shadow-xs border border-gray-100/80">
                {service.icon}
                {service.subIcon && (
                  <div className="relative">
                    {service.subIcon}
                  </div>
                )}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-xl">{service.name}</h3>
                <p className="text-sm opacity-80 mt-1">{service.description}</p>
              </div>
            </button>
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