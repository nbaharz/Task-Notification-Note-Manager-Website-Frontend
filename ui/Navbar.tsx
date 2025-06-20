'use client';
import { useState, useEffect } from 'react';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { useUser } from '@/app/context/UserContext';
import { getDynamicNavbar } from '@/app/api/UserApi/DynamicNavbar';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const {user, token, logout } = useUser();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchName = async () => {
      try {
        const data = await getDynamicNavbar(token);
        setName(data.name);
      } catch (err: any) {
        setError(err.message || 'Bir hata oluştu.' || err.status);
      }
    };
    fetchName();
  }, [token]);

  return (
    <nav
      className={`sticky top-0 z-30 flex justify-between items-center mb-8 pb-4 border-b border-gray-100
        rounded-xl shadow-sm px-5 py-3 transition-all
        ${scrolled ? 'bg-white/60 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-md'}
      `}
      style={{
        boxShadow: scrolled
          ? '0 4px 24px 0 rgba(0,0,0,0.07)'
          : '0 2px 8px 0 rgba(0,0,0,0.04)',
        backdropFilter: 'blur(12px)',
        minHeight: '60px',
        height: '80px',
      }}
    >
      <div className="flex items-center">
        <img
          src="/yeniLogo.png"
          alt="Welcome aboard!"
          className="w-25 h-25 md:w-15 md:h-15 object-contain "
          draggable={false}
        />
        <span className="text-2xl md:text-3xl font-extrabold text-indigo-500 font-sans tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {name || user?.name ? `${name || user?.name}'s board` : "bahar's board"}
        </span>
        <span className="hidden md:inline text-gray-400 text-sm font-medium ml-2">
          Organize your thoughts and tasks
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-600 transition-all shadow-sm hover:shadow-md font-medium"
          onClick={() => {
            logout();
            router.push('/');
          }}
        >
          <FiLogOut className="w-5 h-5 text-indigo-500" />
          <span className="hidden sm:inline">Log out</span>
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