import React, { useState, useRef, useEffect, useId } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

import { cn } from '@/utils/cn';

interface DateTimePickerProps {
  label?: string;
  error?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DateTimePicker({
  label,
  error,
  value,
  onChange,
  placeholder = 'Chọn ngày giờ',
  className,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'days' | 'months' | 'years'>('days');
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [yearPage, setYearPage] = useState((value || new Date()).getFullYear());
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [prevValue, setPrevValue] = useState(value);

  // Sync incoming value to internal state properly (Derived State)
  if (value !== prevValue) {
    setPrevValue(value);
    if (value) {
      setCurrentMonth(value);
      setYearPage(value.getFullYear());
    }
  }

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  // weekStartsOn: 1 means Monday
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = 'dd/MM/yyyy HH:mm';
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === 'years') {
      setYearPage(yearPage - 12);
    } else if (viewMode === 'months') {
      setCurrentMonth(subMonths(currentMonth, 12));
    } else {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === 'years') {
      setYearPage(yearPage + 12);
    } else if (viewMode === 'months') {
      setCurrentMonth(addMonths(currentMonth, 12));
    } else {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const handleSelectDate = (day: Date) => {
    const newDate = new Date(day);
    if (value) {
      newDate.setHours(value.getHours());
      newDate.setMinutes(value.getMinutes());
    } else {
      newDate.setHours(new Date().getHours());
      newDate.setMinutes(new Date().getMinutes());
    }
    onChange?.(newDate);
    // Don't close immediately so user can pick time if needed
  };

  const handleTimeChange = (type: 'hours' | 'minutes', val: string) => {
    const newDate = value ? new Date(value) : new Date(currentMonth);
    if (type === 'hours') newDate.setHours(parseInt(val, 10));
    if (type === 'minutes') newDate.setMinutes(parseInt(val, 10));
    onChange?.(newDate);
  };

  return (
    <div className={cn('relative w-full space-y-1', className)} ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="text-[10px] font-bold uppercase tracking-widest text-slate-500"
        >
          {label}
        </label>
      )}

      <button
        type="button"
        id={id}
        onClick={() => {
          setIsOpen(!isOpen);
          setViewMode('days');
        }}
        className={cn(
          'flex h-8 w-full items-center justify-between rounded-md border bg-white px-2.5 text-left text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-2',
          isOpen
            ? 'border-primary ring-2 ring-primary/20'
            : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50/50',
          error && 'border-red-500 focus:ring-red-500/20',
          !value && 'text-slate-500',
        )}
      >
        <span>{value ? format(value, dateFormat) : placeholder}</span>
        <CalendarIcon className={cn('h-3.5 w-3.5', isOpen ? 'text-primary' : 'text-slate-400')} />
      </button>

      {error && <p className="text-[11px] font-medium text-red-500 animate-in fade-in">{error}</p>}

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-[280px] rounded-xl border border-slate-200 bg-white p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 slide-in-from-top-2">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'months' ? 'days' : 'months')}
                className="rounded px-2 py-0.5 text-[13px] font-bold text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Tháng {currentMonth.getMonth() + 1}
              </button>
              <button
                type="button"
                onClick={() => {
                  setYearPage(currentMonth.getFullYear());
                  setViewMode(viewMode === 'years' ? 'days' : 'years');
                }}
                className="rounded px-2 py-0.5 text-[13px] font-bold text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {viewMode === 'years'
                  ? `${yearPage - 4} - ${yearPage + 7}`
                  : currentMonth.getFullYear()}
              </button>
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {viewMode === 'days' && (
            <>
              {/* Days of week */}
              <div className="mb-2 grid grid-cols-7 gap-1">
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
                  <div key={day} className="text-center text-[10px] font-bold text-slate-400">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                  const isSelected = value ? isSameDay(day, value) : false;
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isTodayDate = isToday(day);

                  return (
                    <button
                      key={day.toString()}
                      type="button"
                      onClick={() => handleSelectDate(day)}
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-medium transition-all hover:scale-110',
                        !isCurrentMonth && 'text-slate-300 hover:text-slate-500',
                        isCurrentMonth &&
                          !isSelected &&
                          'text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm',
                        isSelected &&
                          'bg-primary font-bold text-white shadow-md hover:bg-primary-hover',
                        isTodayDate &&
                          !isSelected &&
                          'bg-primary/5 font-bold text-primary ring-1 ring-inset ring-primary/20',
                      )}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {viewMode === 'months' && (
            <div className="grid grid-cols-3 gap-2 py-2">
              {Array.from({ length: 12 }).map((_, i) => {
                const isSelected = currentMonth.getMonth() === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      const newDate = new Date(currentMonth);
                      newDate.setMonth(i);
                      setCurrentMonth(newDate);
                      setViewMode('days');
                    }}
                    className={cn(
                      'flex h-10 items-center justify-center rounded-lg text-[13px] font-semibold transition-all',
                      isSelected
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                    )}
                  >
                    Tháng {i + 1}
                  </button>
                );
              })}
            </div>
          )}

          {viewMode === 'years' && (
            <div className="grid grid-cols-3 gap-2 py-2">
              {Array.from({ length: 12 }).map((_, i) => {
                const year = yearPage - 4 + i;
                const isSelected = currentMonth.getFullYear() === year;
                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => {
                      const newDate = new Date(currentMonth);
                      newDate.setFullYear(year);
                      setCurrentMonth(newDate);
                      setViewMode('months');
                    }}
                    className={cn(
                      'flex h-10 items-center justify-center rounded-lg text-[13px] font-semibold transition-all',
                      isSelected
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                    )}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          )}

          {viewMode === 'days' && (
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1 shadow-sm">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <select
                  value={value ? value.getHours().toString().padStart(2, '0') : '00'}
                  onChange={(e) => handleTimeChange('hours', e.target.value)}
                  className="appearance-none bg-transparent text-[13px] font-bold text-slate-700 outline-none hover:text-slate-900 focus:text-primary cursor-pointer"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i.toString().padStart(2, '0')}>
                      {i.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <span className="text-[13px] font-bold text-slate-400">:</span>
                <select
                  value={value ? value.getMinutes().toString().padStart(2, '0') : '00'}
                  onChange={(e) => handleTimeChange('minutes', e.target.value)}
                  className="appearance-none bg-transparent text-[13px] font-bold text-slate-700 outline-none hover:text-slate-900 focus:text-primary cursor-pointer"
                >
                  {Array.from({ length: 60 }).map((_, i) => (
                    <option key={i} value={i.toString().padStart(2, '0')}>
                      {i.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                onChange?.(now);
                setCurrentMonth(now);
                setYearPage(now.getFullYear());
              }}
              className="rounded px-2 py-1 text-[11px] font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              Hiện tại
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onChange?.(undefined);
                  setIsOpen(false);
                }}
                className="rounded px-2 py-1 text-[11px] font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Xóa
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-primary px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-primary-hover"
              >
                Xong
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
