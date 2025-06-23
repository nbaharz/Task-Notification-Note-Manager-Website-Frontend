'use client';

import { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import './Calendar.css';
import { useEvent } from '@/app/context/EventContext';

export default function CustomCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const { events } = useEvent();
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

  function isSameDay(a: Date | null, b: Date | null) {
    if (!a || !b) return false;
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  // Helper: get events for a specific day
  function getEventsForDay(day: Date) {
    return events.filter(event => {
      const eventDate = new Date(event.eventDate);
      return isSameDay(eventDate, day);
    });
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
                  const dayEvents = getEventsForDay(tileDate);
                  return (
                    <div
                      style={{ position: 'relative', width: '100%', height: '100%' }}
                      onMouseEnter={() => dayEvents.length > 0 && setHoveredDay(tileDate)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      {/* Event marker */}
                      {dayEvents.length > 0 && (
                        <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', zIndex: 15 }}>
                          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} />
                        </div>
                      )}
                      {/* Event tooltip on hover, positioned left or right */}
                      {dayEvents.length > 0 && hoveredDay && isSameDay(hoveredDay, tileDate) && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: openLeft ? 'auto' : '100%',
                            right: openLeft ? '100%' : 'auto',
                            transform: 'translateY(-50%)',
                            background: '#fff',
                            color: '#333',
                            border: '1px solid #e5e7eb',
                            borderRadius: 6,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            padding: '4px 8px',
                            fontSize: 12,
                            marginLeft: openLeft ? undefined : 8,
                            marginRight: openLeft ? 8 : undefined,
                            zIndex: 30,
                            minWidth: 80,
                            maxWidth: 160,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {dayEvents.map(ev => (
                            <div key={ev.id} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {ev.title}
                            </div>
                          ))}
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
