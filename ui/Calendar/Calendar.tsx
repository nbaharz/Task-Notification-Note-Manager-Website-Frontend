'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronUp, FiChevronDown, FiCalendar} from 'react-icons/fi';
import './Calendar.css';

export default function CustomCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [showCalendar, setShowCalendar] = useState(true);

  return (
    <div className="pr-4">
     
       
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