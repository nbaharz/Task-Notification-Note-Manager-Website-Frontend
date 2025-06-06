import { useEffect } from "react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
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
      {/* Arka plan karartma + animasyon */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm fade-in"
        onClick={onClose}
      ></div>

      {/* Modal içeriği */}
      <div className="relative z-10 w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl scale-in">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form className="flex flex-col gap-3">
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <input type="password" placeholder="Password" className="border p-2 rounded" />
          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Submit
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