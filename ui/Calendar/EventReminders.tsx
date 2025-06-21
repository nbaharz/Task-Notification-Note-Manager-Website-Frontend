'use client';

import { useState, useEffect } from 'react';
import { FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { getUserReminders, deleteReminder } from '@/app/api/ReminderApi/ReminderApi';
import { useUser } from '@/app/context/UserContext';

interface Reminder {
  id: string;
  userId: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  referenceType?: string;
  referenceId?: string;
  isActive: boolean;
  createdAt: string;
}

export default function EventReminders({ onOpenEventReminderModal }: { onOpenEventReminderModal: () => void }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { token } = useUser();

  // Fetch user reminders
  const fetchReminders = async () => {
    if (!token) return;

    try {
      setIsRefreshing(true);
      const data = await getUserReminders(token);
      setReminders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      setReminders([]);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  // Load reminders on component mount
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      fetchReminders();
    }
  }, [token]);

  // Handle delete reminder
  const handleDeleteReminder = async (reminderId: string) => {
    if (!token) return;

    try {
      await deleteReminder(reminderId, token);
      // Refresh the reminders list
      await fetchReminders();
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Event Reminders</h3>
        <button
          onClick={fetchReminders}
          disabled={isRefreshing}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          title="Refresh reminders"
        >
          <FiRefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-gray-500 mt-2 text-sm">Loading reminders...</p>
        </div>
      ) : (
        <ul className="mb-4 space-y-2">
          {reminders.length > 0 ? (
            reminders.map((reminder) => (
              <li key={reminder.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-indigo-50 rounded-lg px-3 py-3 border border-indigo-100">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">{reminder.title}</span>
                    {!reminder.isActive && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        Inactive
                      </span>
                    )}
                  </div>
                  {reminder.description && (
                    <p className="text-xs text-gray-600 mb-1">{reminder.description}</p>
                  )}
                  <div className="text-xs text-gray-500">
                    {formatDate(reminder.date)} at {reminder.time}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Delete reminder"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-center py-4 bg-gray-50 rounded-lg">
              <p>No reminders found</p>
              <p className="text-xs text-gray-300 mt-1">Create your first reminder to get started</p>
            </li>
          )}
        </ul>
      )}

      <button
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium"
        onClick={onOpenEventReminderModal}
      >
        Set Event Reminder
      </button>
    </div>
  );
}