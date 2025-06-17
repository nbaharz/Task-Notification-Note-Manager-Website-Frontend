'use client';
import { useState, useEffect } from 'react';
import { FiPlus, FiSettings, FiClipboard } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-30 flex justify-between items-center mb-8 pb-6 border-b border-gray-100
        rounded-xl shadow-sm px-6 py-4 transition-all
        ${scrolled ? 'bg-white/60 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-md'}
      `}
      style={{
        boxShadow: scrolled
          ? '0 4px 24px 0 rgba(0,0,0,0.07)'
          : '0 2px 8px 0 rgba(0,0,0,0.04)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center gap-3">
        <FiClipboard className="text-indigo-500 w-8 h-8" />
        <span className="text-2xl md:text-3xl font-extrabold text-indigo-500 font-sans tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
          bahar's board
        </span>
        <span className="hidden md:inline text-gray-400 text-sm font-medium ml-2">
          Organize your thoughts and tasks
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-600 transition-all shadow-sm hover:shadow-md font-medium"
        >
          <FiPlus className="w-5 h-5 text-indigo-500" />
          <span className="hidden sm:inline">New</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-100 text-gray-600 transition-all shadow-sm hover:shadow-md"
        >
          <FiSettings className="w-5 h-5 text-indigo-500" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </nav>
  );
}