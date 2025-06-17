'use client'; 

import { useState } from "react";
import SignUpModal from "@/ui/SignUpModal";


export default function Home() {
  const [modalType, setModalType] = useState<null | 'signup' | 'login'>(null);

  const closeModal = () => setModalType(null);

  return (
    <div>
      <div className="flex flex-col items-center pt-50">
        <h1 className="text-4xl font-bold">A BOARD</h1>

        <a href="#features" className="mt-4 text-blue-600 hover:underline text-lg">
          Learn about features
        </a>

        <button
          onClick={() => setModalType('signup')}
          className="mt-2 text-green-600 hover:underline text-lg"
        >
          Get Started
        </button>
      </div>

      <div id="features" className="mt-300 flex justify-center">
        <h2 className="text-3xl font-semibold">Features</h2>
      </div>

      <SignUpModal isOpen={modalType === 'signup'} onClose={closeModal} />
  
    </div>
  );
}
