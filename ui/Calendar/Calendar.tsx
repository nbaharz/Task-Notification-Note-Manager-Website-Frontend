'use client';

import { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import './Calendar.css';

export default function CustomCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const [lastLeftClicked, setLastLeftClicked] = useState<Date | null>(null);
  const [showCreateEventFor, setShowCreateEventFor] = useState<Date | null>(null);

  function isSameDay(a: Date | null, b: Date | null) {
    if (!a || !b) return false;
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function handleContextMenu(e: React.MouseEvent, tileDate: Date) {
    e.preventDefault();
    if (isSameDay(lastLeftClicked, tileDate)) {
      setShowCreateEventFor(tileDate);
    } else {
      setShowCreateEventFor(null);
    }
  }

  function handleLeftClick(tileDate: Date) {
    setLastLeftClicked(tileDate);
    setShowCreateEventFor(null);
  }

  function handleCreateEventClick(tileDate: Date) {
    alert(`${tileDate.toLocaleDateString()} için etkinlik oluştur!`);
    setShowCreateEventFor(null);
  }

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
            <div className="bg-white/80 rounded-xl p-0 sm:p-2 shadow-inner" onContextMenu={e => e.preventDefault()}>
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
                tileContent={({ date: tileDate, view }) => {
                  if (view !== 'month') return null;
                  const dayOfWeek = tileDate.getDay();
                  const openLeft = dayOfWeek >= 5;

                  return (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          zIndex: 10,
                          background: 'transparent',
                          cursor: isSameDay(showCreateEventFor, tileDate) ? 'default' : 'pointer',
                        }}
                        onClick={() => handleLeftClick(tileDate)}
                        onContextMenu={(e) => handleContextMenu(e, tileDate)}
                      />
                      {isSameDay(showCreateEventFor, tileDate) && (
                        <div
                          role="button"
                          tabIndex={0}
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: openLeft ? 'auto' : '100%',
                            right: openLeft ? '100%' : 'auto',
                            transform: 'translateY(-50%)',
                            zIndex: 20,
                            background: '#6d28d9',
                            color: '#fff',
                            borderRadius: '14px',
                            padding: '6px 20px',
                            fontSize: '1rem',
                            fontWeight: 500,
                            boxShadow: '0 4px 16px rgba(109,40,217,0.1)',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            userSelect: 'none',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCreateEventClick(tileDate);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleCreateEventClick(tileDate);
                            }
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              left: openLeft ? 'auto' : '-12px',
                              right: openLeft ? '-12px' : 'auto',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: 0,
                              height: 0,
                              borderTop: '8px solid transparent',
                              borderBottom: '8px solid transparent',
                              borderLeft: openLeft ? '8px solid #6d28d9' : 'none',
                              borderRight: !openLeft ? '8px solid #6d28d9' : 'none',
                            }}
                          />
                          Create Event
                        </div>
                      )}
                    </div>
                  );
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
