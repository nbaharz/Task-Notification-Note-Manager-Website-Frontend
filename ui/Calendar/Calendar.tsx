'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import './Calendar.css';

export default function CustomCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="ml-auto w-full h-full max-w-[400px] rounded-xl border border-white/50 bg-white/70 backdrop-blur-md transition-all p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Calendar</h2>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="text-gray-600 hover:text-indigo-600 transition cursor-pointer"
        >
          {showCalendar ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showCalendar && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Calendar
              onChange={(e) => setDate(e as Date)}
              value={date}
              locale="tr-TR"
              calendarType="gregory"
              className="modern-calendar w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
