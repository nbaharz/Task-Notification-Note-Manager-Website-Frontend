'use client';
import { AnimatePresence } from 'framer-motion';
import ViewNoteModal from '@/ui/Note/ViewNoteModal';
import AllNotesModal from '@/ui/Note/AllNotesModal';
import { Note } from '@/types/types';

interface Props {
  showViewModal: boolean;
  setShowViewModal: (v: boolean) => void;
  showAllNotesModal: boolean;
  setShowAllNotesModal: (v: boolean) => void;
  selectedNote: Note | null;
  setSelectedNote: (note: Note) => void;
  notes: Note[];
  updateNote: (note: Note) => void;
  togglePin: (title: string) => void;
  deleteNote: (title: string) => void;
}

export default function Modals({
  showViewModal,
  setShowViewModal,
  showAllNotesModal,
  setShowAllNotesModal,
  selectedNote,
  setSelectedNote,
  notes,
  updateNote,
  togglePin,
  deleteNote,
}: Props) {
  return (
    <AnimatePresence>
      {showViewModal && selectedNote && (
        <ViewNoteModal
          note={selectedNote}
          onClose={() => setShowViewModal(false)}
          onSave={updateNote}
          setNote={setSelectedNote}
        />
      )}

      {showAllNotesModal && (
        <AllNotesModal
          notes={notes}
          onClose={() => setShowAllNotesModal(false)}
          onSelectNote={(note) => {
            setSelectedNote(note);
            setShowViewModal(true);
            setShowAllNotesModal(false);
          }}
          togglePin={togglePin}
          onDeleteNote={deleteNote}
        />
      )}
    </AnimatePresence>
  );
}
