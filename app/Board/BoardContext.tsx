'use client';
import NoteGrid from '@/ui/Note/NoteGrid';
import ExternalServices from '@/ui/ExternalServices/ExternalService';
import ToDoList from '@/ui/ToDoList/toDoList';
import CustomCalendar from '@/ui/Calendar/Calendar';
import { Note } from '@/types/types';

interface Props {
  activeTab: string;
  notes: Note[];
  onAddNote: (title: string) => void;
  onViewNote: (note: Note) => void;
  onDeleteNote: (title: string) => void;
  onShowAllNotes: () => void;
}

export default function BoardContent({
  activeTab,
  notes,
  onAddNote,
  onViewNote,
  onDeleteNote,
  onShowAllNotes,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className={`${activeTab === 'notes' ? 'block' : 'hidden'} md:block lg:col-span-1`}>
        <NoteGrid
          notes={notes}
          onAddNote={onAddNote}
          onViewNote={onViewNote}
          onDeleteNote={onDeleteNote}
          onShowAllNotes={onShowAllNotes}
        />
      </div>
      <div className={`${activeTab === 'external' ? 'block' : 'hidden'} md:block`}>
        <div className="w-full flex justify-center">
          <ExternalServices />
        </div>
      </div>
      <div className={`${activeTab === 'tasks' ? 'block' : 'hidden'} md:block`}>
        <ToDoList />
      </div>
      <div className={`${activeTab === 'calendar' ? 'block' : 'hidden'} md:block`}>
        <CustomCalendar />
      </div>
    </div>
  );
}
