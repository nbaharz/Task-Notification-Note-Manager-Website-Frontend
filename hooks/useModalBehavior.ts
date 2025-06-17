import { useEffect, useRef } from 'react';

export function useModalBehavior(
  isOpen: boolean,
  onClose: () => void,
  onReset?: () => void
) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC ile kapatma
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Dış tıklama ile kapatma
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Modal kapanınca form temizliği
  useEffect(() => {
    if (!isOpen && onReset) {
      onReset();
    }
  }, [isOpen, onReset]);

  return modalRef;
}
