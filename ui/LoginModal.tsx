'use client';
import React, { useState } from 'react';
import { login } from '@/app/api/UserApi/Login';
import { FiMail, FiLock, FiLogIn, FiX, FiUserPlus } from 'react-icons/fi';
import { useModal } from '@/app/context/ModalContext';
import { useUser } from '@/app/context/UserContext';

export default function LoginModal({ onSuccess, onSignUpClick }: { onSuccess?: (user: any) => void; onSignUpClick?: () => void }) {
  const { modalType, closeModal } = useModal();
  const { setUser, setToken } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (modalType !== 'login') return null;

  // Cookie yazmak için yardımcı fonksiyonu tekrar tanımla
  function setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login({ email, password });
      if (data.token) {
        setCookie('token', data.token, 7); // 7 gün geçerli
        setToken(data.token);
      }
      if (data.user) {
        setUser(data.user);
      }
      onSuccess?.(data);
      closeModal();
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu.' || err.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm fade-in" onClick={closeModal}></div>
      <div className="relative z-10 w-[90%] max-w-sm rounded-2xl bg-white p-8 shadow-2xl scale-in">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
          aria-label="Kapat"
        >
          <FiX size={22} />
        </button>
        <div className="flex flex-col items-center mb-6">
          <FiLogIn className="text-indigo-500 w-10 h-10 mb-2" />
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded w-full focus:border-indigo-400 focus:outline-none"
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded w-full focus:border-indigo-400 focus:outline-none"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold mt-2"
            disabled={loading}
          >
            {loading ? 'Logging In' : 'Login'}
          </button>
        </form>
        {/* Alt kısım: Hesabın yok mu? Sign up */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => {
              closeModal();
              onSignUpClick && onSignUpClick();
            }}
            className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-semibold"
          >
            <FiUserPlus /> Sign up
          </button>
        </div>
      </div>
    </div>
  );
}