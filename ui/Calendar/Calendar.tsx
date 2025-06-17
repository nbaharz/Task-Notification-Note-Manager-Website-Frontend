'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import './Calendar.css';

export default function CustomCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [showCalendar, setShowCalendar] = useState(true); // Varsayılan olarak açık

  return (
    <div className="w-full  rounded-xl border border-white/50 bg-white/80 backdrop-blur-md transition-all p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Calendar / Reminders</h2>
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
            <div className="bg-white/80 rounded-xl p-0 sm:p-2 shadow-inner">
              <Calendar
                onChange={(e) => setDate(e as Date)}
                value={date}
                locale="tr-TR"
                calendarType="gregory"
                className="modern-calendar w-full"
                tileClassName={({ date: tileDate }) => 
                  tileDate.getTime() === date?.getTime() 
                    ? 'bg-indigo-500 text-white rounded-full' 
                    : 'hover:bg-indigo-50 rounded-full'
                }
                next2Label={null}
                prev2Label={null}
                minDetail="month"
                formatShortWeekday={(locale, date) => 
                  ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'][date.getDay()]
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}