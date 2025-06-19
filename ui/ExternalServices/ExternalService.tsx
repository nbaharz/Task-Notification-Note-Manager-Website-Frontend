'use client';

import { FiExternalLink, FiPlus, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { SiAmazon } from 'react-icons/si';
import { RiNewsLine } from 'react-icons/ri';
import { FaChartLine } from 'react-icons/fa';

interface TrackedProduct {
  id: string;
  title: string;
  productUrl: string;
  recentPrice: string;
  isDiscounted: boolean;
  lastFetchTime: string;
  notifyOnDiscount: boolean;
}

interface Props {
  onOpenTrackedProductsModal: () => void;
  savedProducts: TrackedProduct[];
  setSavedProducts: React.Dispatch<React.SetStateAction<TrackedProduct[]>>;
  isLoading: boolean;
  showTrackedProducts: boolean;
  setShowTrackedProducts: (v: boolean) => void;
}

export default function ExternalServices({
  onOpenTrackedProductsModal,
  savedProducts,
  isLoading,
  showTrackedProducts,
  setShowTrackedProducts,
}: Props) {
  const services = [
    {
      name: 'Tracked Products',
      description: 'Amazon product tracking',
      icon: <SiAmazon className="text-[#FF9900]" size={32} />,
      subIcon: <FaChartLine className="text-green-500 absolute -bottom-2 -right-2" size={20} />,
      color: 'bg-white border-gray-200 border-b hover:bg-orange-100',
      textColor: 'text-orange-800',
      bgPattern: 'bg-[url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54 54L6 6M6 54L54 6\' stroke=\'%23FF9900\' stroke-width=\'0.5\' stroke-linecap=\'square\'/%3E%3C/svg%3E")]'
    },
    {
      name: 'News API',
      description: 'Latest news updates',
      icon: <RiNewsLine className="text-blue-600" size={32} />,
      color: 'bg-white border-gray-200 border-b  hover:bg-blue-100',
      textColor: 'text-blue-800',
      bgPattern: 'bg-[url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 6v6M30 48v6M6 30h6M48 30h6\' stroke=\'%232563EB\' stroke-width=\'1\' stroke-linecap=\'square\'/%3E%3C/svg%3E")]'
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] border border-white">
      <h2 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-3">
        <FiExternalLink className="text-gray-500" size={24} />
        {isLoading ? (
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
        ) : (
          <span>External Services</span>
        )}
      </h2>
      <div className="flex flex-col gap-5">
        {services.map((service, index) => (
          <div key={index}>
            {isLoading ? (
              <div className="rounded-xl px-6 py-5 w-full bg-gray-100 animate-pulse mb-4">
                <div className="h-6 w-32 bg-gray-300 rounded mb-3" />
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>
            ) : (
              <>
                <button
                  disabled={isLoading}
                  onClick={() => {
                    if (service.name === 'Tracked Products') setShowTrackedProducts(!showTrackedProducts);
                  }}
                  className={`relative flex items-start gap-5 border-2 rounded-xl px-6 py-5 cursor-pointer transition-all w-full ${service.color} ${service.textColor} hover:shadow-md hover:-translate-y-1`}
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
                  <div className="text-left flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">{service.name}</h3>
                      {service.name === 'Tracked Products' && (
                        <div className="text-orange-800">
                          {showTrackedProducts ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                        </div>
                      )}
                    </div>
                    <p className="text-sm opacity-80 mt-1">{service.description}</p>
                  </div>
                </button>
                {service.name === 'Tracked Products' && showTrackedProducts && (
                  <div className="mt-4 space-y-3">
                    <button
                      onClick={onOpenTrackedProductsModal}
                      className="w-full flex items-center justify-center gap-2 bg-orange-50 border-2 border-orange-100 text-orange-800 px-4 py-3 rounded-xl hover:bg-orange-100 transition-all"
                    >
                      <FiPlus size={20} />
                      <span className="font-medium">Add New Product</span>
                    </button>
                    {savedProducts.length > 0 ? (
                      savedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">{product.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">Price: {product.recentPrice}</p>
                            </div>
                            <a
                              href={product.productUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-500 hover:text-orange-600"
                            >
                              <FiExternalLink size={18} />
                            </a>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className={`text-sm ${product.isDiscounted ? 'text-green-600' : 'text-gray-500'}`}>
                              {product.isDiscounted ? 'Discounted' : 'Regular Price'}
                            </span>
                            <span className="text-xs text-gray-400">
                              Last updated: {product.lastFetchTime}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-xl">
                        No tracked products yet
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}