// components/ModalWrapper.tsx
'use client';
import { motion } from 'framer-motion';
import { useEffect, ReactNode, MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalWrapperProps {
  onClose: () => void;
  children: ReactNode;
  position?: 'center' | 'top';
  maxWidth?: string;
  maxHeight?:string;
  scrollable?: boolean;
}

export default function ModalWrapper({
  onClose,
  children,
  position = 'center',
  maxWidth = 'max-w-xl',
  maxHeight= 'max-h-2xl',
  scrollable = false,
}: ModalWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // ESC ile kapatma
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Dikey hizalama
  const positionClass =
    position === 'top' ? 'items-start pt-20' : 'items-center';

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-black/20 backdrop-blur-sm`}
      onClick={onClose}
    >
      <div className={`flex ${positionClass} min-h-full justify-center p-4`}>
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-white w-full ${maxWidth} ${maxHeight}
            ${scrollable ? 'overflow-y-auto' : ''}
            rounded-xl shadow-lg border border-gray-200
          `}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );

  if (!isMounted) return null;

  return createPortal(modalContent, document.body);
}
