'use client'; 

import { useState } from "react";
import SignUpModal from "@/ui/SignUpModal"; // Yola göre ayarla 

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex flex-col items-center pt-50">
        <h1 className="text-4xl font-bold">A BOARD</h1>

        <a href="#features" className="mt-4 text-blue-600 hover:underline text-lg">
          Learn about features
        </a>

        <button
          onClick={() => setShowModal(true)}
          className="mt-2 text-green-600 hover:underline text-lg"
        >
          Get Started
        </button>
      </div>

      <div id="features" className="mt-300 flex justify-center">
        <h2 className="text-3xl font-semibold">Features</h2>
      </div>

      <SignUpModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
