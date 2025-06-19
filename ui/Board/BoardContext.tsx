'use client';
import { useState, useEffect } from 'react';
import NoteGrid from '@/ui/Note/NoteGrid';
import ExternalServices from '@/ui/ExternalServices/ExternalService';
import ToDoList from '@/ui/ToDoList/toDoList';
import CalendarPanel from '@/ui/Calendar/CalendarPanel';
import TrackedProductsModal from '@/ui/ExternalServices/TrackedProducts/TrackedProductsModal';
import ModalWrapper from '@/ui/ModalWrapper';
import {TrackedProduct } from '@/types/types';


interface Props {
  activeTab: string;
  onOpenEventReminderModal?: () => void;
  eventReminders?: any[];
}

export default function BoardContent({
  activeTab,
  onOpenEventReminderModal,
  eventReminders,
}: Props) {
  // Tracked Products Modal state ve storage
  const [showTrackedProductsModal, setShowTrackedProductsModal] = useState(false);
  const [savedProducts, setSavedProducts] = useState<TrackedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTrackedProducts, setShowTrackedProducts] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem('trackedProducts');
      if (stored) {
        setSavedProducts(JSON.parse(stored));
      }
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('trackedProducts', JSON.stringify(savedProducts));
    }
  }, [savedProducts, isLoading]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Notes */}
        <div className={`${activeTab === 'notes' ? 'block' : 'hidden'} md:block lg:col-span-1`}>
          <NoteGrid />
        </div>
        {/* External Services */}
        <div className={`${activeTab === 'external' ? 'block' : 'hidden'} md:block`}>
          <div className="h-full">
            <ExternalServices
              onOpenTrackedProductsModal={() => setShowTrackedProductsModal(true)}
              savedProducts={savedProducts}
              setSavedProducts={setSavedProducts}
              isLoading={isLoading}
              showTrackedProducts={showTrackedProducts}
              setShowTrackedProducts={setShowTrackedProducts}
            />
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
      {/* Modalı sayfa seviyesinde aç */}
      {showTrackedProductsModal && (
        <ModalWrapper onClose={() => setShowTrackedProductsModal(false)} maxWidth="max-w-md">
          <TrackedProductsModal
            savedProducts={savedProducts}
            setSavedProducts={setSavedProducts}
            onClose={() => setShowTrackedProductsModal(false)}
          />
        </ModalWrapper>
      )}
    </div>
  );
}