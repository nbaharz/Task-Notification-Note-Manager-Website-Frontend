'use client';

export default function TaskReminders() {
  // Örnek task listesi
  const tasks = [
    { id: 1, title: 'Ödev teslimi', date: '2025-06-21' },
    { id: 2, title: 'Alışveriş', date: '2025-06-23' },
  ];

  return (
    <div>
      <ul className="mb-4 space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center bg-yellow-50 rounded px-3 py-2">
            <span>{task.title}</span>
            <span className="text-xs text-gray-500">{task.date}</span>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="text-gray-400 text-center py-4">Henüz task yok.</li>
        )}
      </ul>
      <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
        Set Task Reminder
      </button>
    </div>
  );
}