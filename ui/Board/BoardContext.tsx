'use client';
import NoteGrid from '@/ui/Note/NoteGrid';
import ExternalServices from '@/ui/ExternalServices/ExternalService';
import ToDoList from '@/ui/ToDoList/toDoList';
import CalendarPanel from '@/ui/Calendar/CalendarPanel';
import { Note } from '@/types/types';

interface Props {
  activeTab: string;
  notes: Note[];
  onAddNote: (title: string) => void;
  onViewNote: (note: Note) => void;
  onDeleteNote: (title: string) => void;
  onShowAllNotes: () => void;
  onTogglePin: (title: string) => void; // <-- BURAYI EKLE
  onOpenEventReminderModal?: () => void;
  eventReminders?: any[];
}

export default function BoardContent({
  activeTab,
  notes,
  onAddNote,
  onViewNote,
  onDeleteNote,
  onShowAllNotes,
  onTogglePin,
  onOpenEventReminderModal,
  eventReminders,
}: Props) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6"> {/* Eşit yan boşluklar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6"> {/* Gap değerini artırdık */}
        {/* Notes */}
        <div className={`${activeTab === 'notes' ? 'block' : 'hidden'} md:block lg:col-span-1`}>
          <NoteGrid
            notes={notes}
            onAddNote={onAddNote}
            onViewNote={onViewNote}
            onDeleteNote={onDeleteNote}
            onShowAllNotes={onShowAllNotes}
            onTogglePin={onTogglePin} // <-- Burada fonksiyon olmalı!
          />
        </div>
        
        {/* External Services */}
        <div className={`${activeTab === 'external' ? 'block' : 'hidden'} md:block`}>
          <div className="h-full">
            <ExternalServices />
          </div>
        </div>
        
        {/* ToDo List */}
        <div className={`${activeTab === 'tasks' ? 'block' : 'hidden'} md:block`}>
          <div className="h-full">
            <ToDoList />
          </div>
        </div>
        
        {/* Calendar */}
        <div className={`${activeTab === 'calendar' ? 'block' : 'hidden'} md:block`}>
          <div className="h-full">
            <CalendarPanel
              onOpenEventReminderModal={onOpenEventReminderModal}
              eventReminders={eventReminders}
            />
          </div>
        </div>
      </div>
    </div>
  );
}