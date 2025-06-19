'use client';
import { AnimatePresence } from 'framer-motion';
import ViewNoteModal from '@/ui/Note/ViewNoteModal';
import AllNotesModal from '@/ui/Note/AllNotesModal';
import { useModal } from '@/app/context/ModalContext';

export default function Modals() {
  const { modalType, closeModal } = useModal();

  return (
    <AnimatePresence>
      {modalType === 'viewNote' && (
        <ViewNoteModal />
      )}
      {modalType === 'allNotes' && (
        <AllNotesModal />
      )}
    </AnimatePresence>
  );
}
