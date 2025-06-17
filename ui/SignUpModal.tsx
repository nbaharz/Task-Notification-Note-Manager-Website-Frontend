'use client';

import { useEffect } from "react";
import { useSignUp } from "@/hooks/useSignUp";
import { FiUserPlus, FiMail, FiLock, FiUser, FiX } from "react-icons/fi";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const { form, error, handleChange, handleSubmit, loading } = useSignUp(onClose);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
          aria-label="Kapat"
        >
          <FiX size={22} />
        </button>
        <div className="flex flex-col items-center mb-6">
          <FiUserPlus className="text-indigo-500 w-10 h-10 mb-2" />
          <h2 className="text-2xl font-bold text-center text-gray-800">Create Your Account</h2>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Name"
              className="pl-10 pr-3 py-2 border rounded w-full focus:border-indigo-400 focus:outline-none"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Surname"
              className="pl-10 pr-3 py-2 border rounded w-full focus:border-indigo-400 focus:outline-none"
              value={form.surname}
              onChange={(e) => handleChange('surname', e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="pl-10 pr-3 py-2 border rounded w-full focus:border-indigo-400 focus:outline-none"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="pl-10 pr-3 py-2 border rounded w-full focus:border-indigo-400 focus:outline-none"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold mt-2"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
