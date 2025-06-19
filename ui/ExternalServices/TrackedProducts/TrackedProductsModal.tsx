'use client';

import { useState } from 'react';
import { TrackedProduct } from '@/types/types';

interface Props {
  onClose: () => void;
  savedProducts: TrackedProduct[];
  setSavedProducts: React.Dispatch<React.SetStateAction<TrackedProduct[]>>;
}

export default function TrackedProductsModal({ onClose, savedProducts, setSavedProducts }: Props) {
  const [productTitle, setProductTitle] = useState('');
  const [productUrl, setProductUrl] = useState('');

  const handleSave = () => {
    if (!productTitle || !productUrl) return;

    const newProduct: TrackedProduct = {
      id: Date.now().toString(),
      title: productTitle,
      productUrl: productUrl,
      recentPrice: '...',
      isDiscounted: false,
      lastFetchTime: new Date().toLocaleDateString(),
      notifyOnDiscount: true,
    };

    setSavedProducts(prev => [newProduct, ...prev]);
    setProductTitle('');
    setProductUrl('');
    onClose();
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Tracked Product</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
          <input
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            placeholder="Product Title"
            value={productTitle}
            onChange={e => setProductTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product URL</label>
          <input
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            placeholder="Product URL"
            value={productUrl}
            onChange={e => setProductUrl(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}