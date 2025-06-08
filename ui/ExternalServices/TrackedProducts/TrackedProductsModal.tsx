'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiPlus, FiExternalLink } from 'react-icons/fi';

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
  onClose: () => void;
  savedProducts: TrackedProduct[];
  setSavedProducts: React.Dispatch<React.SetStateAction<TrackedProduct[]>>;
}

export default function TrackedProductsModal({ onClose, savedProducts, setSavedProducts }: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
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
    setShowAddForm(false);
  };

  const toggleNotification = (id: string) => {
    setSavedProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, notifyOnDiscount: !product.notifyOnDiscount }
          : product
      )
    );
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md relative flex flex-col" style={{ maxHeight: '80vh' }}>
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          <FiX size={20} />
        </button>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Tracked Products List</h2>

        {/* Products List */}
        <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-3">
          {savedProducts.length > 0 ? (
            savedProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800">{product.title}</h3>
                  <a 
                    href={product.productUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-500"
                    title="View Product"
                  >
                    <FiExternalLink size={16} />
                  </a>
                </div>
                
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p>Recent Price: {product.recentPrice}</p>
                  <p>Is Discounted: <span className={product.isDiscounted ? 'text-green-600' : 'text-gray-600'}>
                    {product.isDiscounted ? 'Yes' : 'No'}
                  </span></p>
                  <p>Last Data Fetch Time: {product.lastFetchTime}</p>
                </div>
                
                <div className="mt-3 flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={product.notifyOnDiscount}
                        onChange={() => toggleNotification(product.id)}
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${
                        product.notifyOnDiscount ? 'bg-red-500' : 'bg-gray-300'
                      }`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        product.notifyOnDiscount ? 'translate-x-4' : ''
                      }`}></div>
                    </div>
                    <span className="ml-3 text-sm text-gray-700">
                      get notification when discounted
                    </span>
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No tracked products yet. Add your first product!
            </div>
          )}
        </div>

        {/* Add Product Form */}
        <div className="border-t border-gray-300 pt-4">
          {showAddForm ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/product"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={!productTitle || !productUrl}
                  className={`px-4 py-2 rounded-lg transition flex-1 ${
                    !productTitle || !productUrl
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              <FiPlus />
              <span>Add New</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
