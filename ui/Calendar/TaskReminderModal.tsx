'use client';

import { useState, useEffect } from 'react';
import { FiX, FiCheckSquare, FiClock, FiTrash2, FiCalendar } from 'react-icons/fi';
import ModalWrapper from '../ModalWrapper';
import { getUserTasks } from '@/app/api/TaskApi/TaskApi';
import { setReminder } from '@/app/api/ReminderApi/ReminderApi';
import { Task } from '@/types/types';
import { useUser } from '@/app/context/UserContext';

interface TaskReminderModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export default function TaskReminderModal({ open, onClose, onSave }: TaskReminderModalProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminderMessage, setReminderMessage] = useState('');
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useUser();

  // Fetch user tasks when modal opens
  useEffect(() => {
    if (open && token) {
      fetchUserTasks();
    }
  }, [open, token]);

  const fetchUserTasks = async () => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      const tasks = await getUserTasks(token);
      const mapped = Array.isArray(tasks)
        ? tasks.map((t: any) => ({
            id: t.id,
            title: t.title,
            completed: t.isCompleted,
            description: t.description || '',
            priority: t.priority,
            date: t.createdAt,
            userId: t.userId,
            referenceType: t.referenceType,
          }))
        : [];
      setUserTasks(mapped);
    } catch (error) {
      console.error('Error fetching user tasks:', error);
      setUserTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTaskDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority?: string) => {
    const colors = {
      high: 'bg-rose-100 text-rose-700 border-rose-200',
      medium: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      default: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return priority ? colors[priority as keyof typeof colors] : colors.default;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !reminderDate || !reminderTime) return;

    try {
      setIsSubmitting(true);
      
      // Combine date and time into ISO string
      const combinedDateTime = new Date(`${reminderDate}T${reminderTime}`).toISOString();
      
      // Create reminder data
      const reminderData = {
        message: reminderMessage || selectedTask.description || selectedTask.title || 'Task Reminder',
        date: combinedDateTime,
        referenceType: 'Task',
        referenceId: selectedTask.id
      };

      await setReminder(reminderData, token!);
      
      // Reset form
      setSelectedTask(null);
      setReminderDate('');
      setReminderTime('');
      setReminderMessage('');
      
      // Close modal and notify parent
      onSave?.();
      onClose();
    } catch (error) {
      console.error('Error setting reminder:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <ModalWrapper onClose={onClose} maxWidth="max-w-2xl">
      <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-8 border border-gray-200 max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          aria-label="Kapat"
          type="button"
        >
          <FiX />
        </button>
        
        <h2 className="text-lg font-semibold mb-6">Set Task Reminder</h2>
        
        {/* Existing Tasks List */}
        <div className="mb-8">
          <h3 className="text-md font-medium mb-4 text-gray-700">Select a Task</h3>
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading tasks...</p>
            </div>
          ) : userTasks.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {userTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between rounded-lg p-4 border cursor-pointer transition-all ${
                    selectedTask?.id === task.id
                      ? 'bg-yellow-100 border-yellow-300 shadow-md'
                      : 'bg-yellow-50 border-yellow-100 hover:bg-yellow-75'
                  }`}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FiCheckSquare className={`text-sm ${task.completed ? 'text-green-500' : 'text-yellow-500'}`} />
                      <span className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                      </span>
                      {selectedTask?.id === task.id && (
                        <span className="text-xs bg-yellow-200 text-yellow-700 px-2 py-0.5 rounded-full">
                          Selected
                        </span>
                      )}
                      {task.priority && (
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      )}
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-600 mb-1">{task.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FiClock className="text-yellow-400" />
                      <span>{formatTaskDate(task.date)}</span>
                      {task.completed && (
                        <span className="text-green-600 font-medium">Completed</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
              <FiCheckSquare className="text-gray-300 text-2xl mx-auto mb-2" />
              <p>No tasks found</p>
              <p className="text-xs text-gray-300 mt-1">Create some tasks first to set reminders</p>
            </div>
          )}
        </div>

        {/* Reminder Settings Form */}
        {selectedTask && (
          <>
            <div className="border-t border-gray-200 mb-6"></div>
            
            <h3 className="text-md font-medium mb-4 text-gray-700">Reminder Settings</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                    Reminder Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-3 pl-10 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition shadow-sm"
                      value={reminderDate}
                      onChange={e => setReminderDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400 pointer-events-none" size={20} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                    Reminder Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      className="w-full p-3 pl-10 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition shadow-sm"
                      value={reminderTime}
                      onChange={e => setReminderTime(e.target.value)}
                      required
                    />
                    <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400 pointer-events-none" size={20} />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  Reminder Message (Optional)
                </label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition shadow-sm placeholder-gray-400"
                  value={reminderMessage}
                  onChange={e => setReminderMessage(e.target.value)}
                  rows={3}
                  placeholder="Custom reminder message (leave empty to use task description)"
                />
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Setting Reminder...' : 'Set Reminder'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </ModalWrapper>
  );
} 