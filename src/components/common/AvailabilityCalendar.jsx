import React from 'react';
import { parseISO } from 'date-fns';
import './AvailabilityCalendar.css';

const AvailabilityCalendar = ({ bookings = [], villaStatus = 'available' }) => {
  const currentYear = new Date().getFullYear();
  // Show the next 6 years
  const yearsToShow = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3, currentYear + 4, currentYear + 5];

  const bookedRanges = bookings.map(b => ({
    start: parseISO(b.start_date),
    end: parseISO(b.end_date)
  }));

  const isYearBooked = (year) => {
    // If villa is explicitly marked as not available, the current year is occupied
    if (year === currentYear && villaStatus === 'not available') {
      return true;
    }

    const firstDayOfYear = new Date(year, 0, 1);
    const lastDayOfYear = new Date(year, 11, 31);
    
    return bookedRanges.some(range => {
      // If any part of the year is booked, mark as occupied for yearly business logic
      return (range.start <= lastDayOfYear && range.end >= firstDayOfYear);
    });
  };

  return (
    <div className="availability-calendar-container p-8 bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-cream dark:border-white/5 shadow-sm">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-medium mb-8 text-center">Yearly Availability</h3>

      <div className="grid grid-cols-2 gap-4">
        {yearsToShow.map((year) => {
          const booked = isYearBooked(year);
          return (
            <div 
              key={year} 
              className={`py-8 flex flex-col items-center justify-center rounded-3xl border-2 transition-all duration-500 ${
                booked 
                ? 'bg-red-500/5 border-red-500/10 text-red-500' 
                : 'bg-green-500/5 border-green-500/10 text-green-600'
              }`}
            >
              <span className="text-3xl font-black tracking-tighter">{year}</span>
              <span className={`text-[9px] font-black uppercase tracking-widest mt-3 px-4 py-1.5 rounded-full ${
                booked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}>
                {booked ? 'Occupied' : 'Available'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-cream dark:border-white/5 text-center">
        <p className="text-[9px] font-bold text-gray-medium uppercase tracking-[0.2em] leading-relaxed">
          * Unit is leased in 1-year blocks.
        </p>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
