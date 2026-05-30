import { useState, useEffect, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';

interface DeliveryDatePickerProps {
  selectedDate: string | null;
  selectedWindow: string | null;
  onSelectDate: (date: string) => void;
  onSelectWindow: (timeWindow: string) => void;
}

export function DeliveryDatePicker({
  selectedDate,
  selectedWindow,
  onSelectDate,
  onSelectWindow,
}: DeliveryDatePickerProps) {
  // Config
  const WINDOWS = [
    { id: 'morning', label: '10:00 AM – 1:00 PM', startHour: 10, endHour: 13 },
    { id: 'afternoon', label: '2:00 PM – 5:00 PM', startHour: 14, endHour: 17 },
  ];
  
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Determine earliest available date based on 4PM cutoff
  const earliestDate = useMemo(() => {
    const now = new Date();
    // In actual implementation, we might want to ensure we're using the correct timezone (e.g., Tunisia Time)
    const cutoffHour = 16; // 4 PM
    
    const earliest = new Date(now);
    if (now.getHours() >= cutoffHour) {
      // Past 4PM -> Earliest is day after tomorrow
      earliest.setDate(now.getDate() + 2);
    } else {
      // Before 4PM -> Earliest is tomorrow
      earliest.setDate(now.getDate() + 1);
    }
    
    // If the calculated earliest date is a Sunday, skip to Monday
    if (earliest.getDay() === 0) {
      earliest.setDate(earliest.getDate() + 1);
    }
    
    earliest.setHours(0, 0, 0, 0);
    return earliest;
  }, []);

  // Generate calendar days
  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    
    // Padding for first day of month
    const firstDay = date.getDay();
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      days.push(null); // Empty slots for UI alignment
    }
    
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentMonth]);

  const isDateSelectable = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    // Cannot select past dates, dates before earliest, or Sundays (0)
    return d >= earliestDate && d.getDay() !== 0;
  };

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    // Don't go back past the current month
    const now = new Date();
    if (prev.getFullYear() < now.getFullYear() || (prev.getFullYear() === now.getFullYear() && prev.getMonth() < now.getMonth())) {
      return;
    }
    setCurrentMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    // Limit to 2 months ahead
    const now = new Date();
    now.setMonth(now.getMonth() + 2);
    if (next > now) return;
    setCurrentMonth(next);
  };

  const formatDateValue = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white rounded-2xl border border-primary/10 overflow-hidden">
      <div className="p-4 border-b border-primary/10 bg-cream/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <CalendarIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-primary font-serif text-lg">Select Delivery Date</h3>
          <p className="text-muted-foreground text-xs">Orders after 4PM are processed the next business day.</p>
        </div>
      </div>

      <div className="p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2 text-primary hover:bg-cream rounded-full transition-colors"
          >
            &larr;
          </button>
          <span className="font-serif text-primary font-medium">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 text-primary hover:bg-cream rounded-full transition-colors"
          >
            &rarr;
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
            <div key={day} className="text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map((date, i) => {
            if (!date) return <div key={`empty-${i}`} className="p-2" />;
            
            const isSelectable = isDateSelectable(date);
            const dateStr = formatDateValue(date);
            const isSelected = selectedDate === dateStr;
            
            return (
              <button
                key={dateStr}
                type="button"
                disabled={!isSelectable}
                onClick={() => {
                  onSelectDate(dateStr);
                  onSelectWindow(''); // Reset window when date changes
                }}
                className={`
                  aspect-square rounded-full flex items-center justify-center text-sm transition-all
                  ${!isSelectable ? 'text-gray-300 cursor-not-allowed' : ''}
                  ${isSelectable && !isSelected ? 'text-primary hover:bg-cream hover:text-primary-dark cursor-pointer' : ''}
                  ${isSelected ? 'bg-primary text-white shadow-md font-medium scale-105' : ''}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Window Selection */}
      {selectedDate && (
        <div className="border-t border-primary/10 p-6 bg-cream/20">
          <h4 className="text-primary font-serif text-base mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Available Time Windows
          </h4>
          <div className="space-y-3">
            {WINDOWS.map(window => (
              <label
                key={window.id}
                className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedWindow === window.label
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-primary/10 bg-white hover:border-primary/30'
                }`}
              >
                <input
                  type="radio"
                  name="delivery_window"
                  value={window.label}
                  checked={selectedWindow === window.label}
                  onChange={() => onSelectWindow(window.label)}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className={`ml-3 text-sm ${selectedWindow === window.label ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {window.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="bg-amber-50 p-4 border-t border-amber-100 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          We currently deliver within the Sfax greater area. For special orders or locations outside our standard zone, please contact us directly. We do not deliver on Sundays.
        </p>
      </div>
    </div>
  );
}
