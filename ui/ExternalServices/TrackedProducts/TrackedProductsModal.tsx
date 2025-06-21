'use client';

import { useState } from 'react';
import { TrackedProduct } from '@/types/types';
import { createTrackedProduct } from '@/app/api/AmazonApi/AmazonApi';
import { useUser } from '@/app/context/UserContext';

interface Props {
  onClose: () => void;
  savedProducts: TrackedProduct[];
  setSavedProducts: React.Dispatch<React.SetStateAction<TrackedProduct[]>>;
}

export default function TrackedProductsModal({ onClose, setSavedProducts }: Props) {
  const [productUrl, setProductUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useUser();

  const handleSave = async () => {
    if (!productUrl || !token) return;

    try {
      setIsLoading(true);
      setError('');
      
      const newProduct = await createTrackedProduct(productUrl, token);
      
      setProductUrl('');
      onClose();
      
      // Add the new product to the list
      setSavedProducts(prev => [newProduct, ...prev]);
    } catch (error) {
      console.error('Error creating tracked product:', error);
      setError(error instanceof Error ? error.message : 'Ürün eklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Tracked Product</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product URL</label>
          <input
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            placeholder="Amazon Product URL"
            value={productUrl}
            onChange={e => setProductUrl(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={isLoading || !productUrl}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}