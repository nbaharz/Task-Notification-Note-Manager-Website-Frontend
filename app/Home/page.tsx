'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {FiArrowRight } from "react-icons/fi";
import Footer from '@/ui/Footer';
import LoginModal from '@/ui/LoginModal';
import SignUpModal from '@/ui/SignUpModal';

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-[#f7fafc] via-[#fdf6e3] to-[#f7e2c5] text-gray-800 font-sans">
      {/* Profesyonel soft bloblar */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-80px] w-[320px] h-[320px] bg-blue-200 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-80px] right-[-60px] w-[260px] h-[260px] bg-slate-300 opacity-20 rounded-full blur-2xl" />
        <div className="absolute top-[40%] left-[60%] w-[180px] h-[180px] bg-indigo-100 opacity-20 rounded-full blur-2xl" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <section className="max-w-2xl w-full text-center py-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-4 drop-shadow-sm flex items-center justify-center gap-1">
            Welcome A
            <span className="inline-block bg-white border-2 border-indigo-400 rounded-xl px-4 py-1 shadow font-black text-indigo-600">
              Board
            </span>
            !
            </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Easily manage your notes, tasks, and ideas. Boost your productivity with a modern and clean interface!
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-2 px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition text-lg"
            >
              Get Started <FiArrowRight className="ml-1" />
            </button>
          </div>
        </section>
        <section className="w-full max-w-4xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/60 rounded-xl shadow p-6 flex flex-col items-center">
            <svg className="w-10 h-10 text-indigo-400 mb-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0V7a4 4 0 00-4-4H7a4 4 0 00-4 4v10a4 4 0 004 4h4" />
            </svg>
            <h3 className="font-bold text-lg mb-2 text-indigo-700">Take Notes</h3>
            <p className="text-gray-500 text-sm text-center">Quickly save your ideas and important information.</p>
          </div>
          <div className="bg-white/60 rounded-xl shadow p-6 flex flex-col items-center">
            <svg className="w-10 h-10 text-pink-400 mb-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="font-bold text-lg mb-2 text-pink-700 ">Manage Tasks</h3>
            <p className="text-gray-500 text-sm text-center">Easily add, edit, and complete your to-dos.</p>
          </div>
          <div className="bg-white/60 rounded-xl shadow p-6 flex flex-col items-center">
            <svg className="w-10 h-10 text-yellow-400 mb-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <h3 className="font-bold text-lg mb-2 text-yellow-700">Plan Your Time</h3>
            <p className="text-gray-500 text-sm text-center">Manage your time better with calendar and reminders.</p>
          </div>
          {/* Yeni: Dış Servisler */}
          <div className="bg-white/60 rounded-xl shadow p-6 flex flex-col items-center md:col-span-3">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
              </svg>
              <h3 className="font-bold text-lg text-green-700">Connect External Services</h3>
            </div>
            <p className="text-gray-500 text-sm mb-2">
              Easily integrate with external services (like shopping sites, news, or finance tools) and bring live data directly into your board.
            </p>
            <span className="inline-flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium mt-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Try our Amazon Tracked Products module!
            </span>
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
        onSuccess={() => router.push('/Board')}
        onSignUpClick={() => setIsSignUpOpen(true)}
      />
    </div>
  );
}
