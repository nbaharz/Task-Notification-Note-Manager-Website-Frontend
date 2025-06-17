'use client';

export default function Footer() {
  return (
    <footer className="mt-12 py-6 text-center text-gray-400 text-sm border-t border-gray-100 bg-white/70 backdrop-blur-md rounded-xl shadow-sm">
      <span>
        © {new Date().getFullYear()} bahar's board. All rights reserved.
      </span>
    </footer>
  );
}