'use client';

import { useEffect } from "react";
import { useSignUp } from "@/hooks/useSignUp"; // dosyanın yolunu uygun şekilde ayarla

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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm fade-in" onClick={onClose}></div>

      <div className="relative z-10 w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl scale-in">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Surname"
            className="border p-2 rounded"
            value={form.surname}
            onChange={(e) => handleChange('surname', e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Submit'}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 block mx-auto text-sm text-gray-600 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
