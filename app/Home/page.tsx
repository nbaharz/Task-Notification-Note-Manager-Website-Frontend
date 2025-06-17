'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/ui/Navbar';
import Footer from '@/ui/Footer';
import LoginModal from '@/ui/LoginModal';
import SignUpModal from '@/ui/SignUpModal';

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-pink-50 text-gray-800 font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <section className="max-w-2xl w-full text-center py-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-4 drop-shadow-sm flex items-center justify-center gap-2">
            Welcome A
            <span className="inline-block bg-white border-2 border-indigo-400 rounded-xl px-4 py-1 shadow font-black text-indigo-700">
              Board
            </span>
            !
            </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Easily manage your notes, tasks, and ideas. Boost your productivity with a modern and clean interface!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition text-lg"
            >
              Login
            </button>
            <button
              onClick={() => setIsSignUpOpen(true)}
              className="px-8 py-3 rounded-lg bg-white border border-indigo-200 text-indigo-600 font-semibold shadow-md hover:bg-indigo-50 transition text-lg"
            >
              Sign Up
            </button>
          </div>
        </section>
        <section className="w-full max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 rounded-xl shadow p-6 flex flex-col items-center">
            <svg className="w-10 h-10 text-indigo-400 mb-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0V7a4 4 0 00-4-4H7a4 4 0 00-4 4v10a4 4 0 004 4h4" />
            </svg>
            <h3 className="font-bold text-lg mb-2 text-indigo-700">Take Notes</h3>
            <p className="text-gray-500 text-sm">Quickly save your ideas and important information.</p>
          </div>
          <div className="bg-white/80 rounded-xl shadow p-6 flex flex-col items-center">
            <svg className="w-10 h-10 text-pink-400 mb-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="font-bold text-lg mb-2 text-pink-700">Manage Tasks</h3>
            <p className="text-gray-500 text-sm">Easily add, edit, and complete your to-dos.</p>
          </div>
          <div className="bg-white/80 rounded-xl shadow p-6 flex flex-col items-center">
            <svg className="w-10 h-10 text-yellow-400 mb-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <h3 className="font-bold text-lg mb-2 text-yellow-700">Plan Your Time</h3>
            <p className="text-gray-500 text-sm">Manage your time better with calendar and reminders.</p>
          </div>
        </section>
      </main>
      <Footer />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={() => {
          // Redirect to /Board after successful login
          router.push('/Board');
        }}
      />
    </div>
  );
}
