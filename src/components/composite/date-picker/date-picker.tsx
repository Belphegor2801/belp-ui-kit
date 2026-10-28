import * as React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/composite/popover';
import { Button } from '@/components/primitives/button';
import { cn } from '@/utils/cn';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const DAYS_OF_WEEK = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const MONTH_NAMES = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Chọn ngày...',
  disabled = false,
  hasError = false,
  className,
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState<Date>(() => value || new Date());

  React.useEffect(() => {
    if (value) {
      setViewDate(value);
    }
  }, [value]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const selected = new Date(year, month, day);
    onChange?.(selected);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    const today = new Date();
    onChange?.(today);
    setViewDate(today);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  // Calendar calculations
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const formatDisplayDate = (d: Date) => {
    const day = String(d.getDate()).padStart(2, '0');
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const y = d.getFullYear();
    return `${day}/${m}/${y}`;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    return (
      value.getDate() === day &&
      value.getMonth() === month &&
      value.getFullYear() === year
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex items-center justify-between rounded-md border border-input bg-background text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none text-left',
            size === 'sm' && 'h-8 px-2.5 text-xs',
            size === 'md' && 'h-9 px-3 py-1.5 text-sm',
            size === 'lg' && 'h-11 px-4 text-base',
            hasError && 'border-destructive focus:ring-destructive text-destructive',
            className
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className={cn('truncate', !value && 'text-muted-foreground')}>
              {value ? formatDisplayDate(value) : placeholder}
            </span>
          </div>

          {value && !disabled ? (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              className="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-1"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          ) : (
            <span className="w-3" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-3" align="start">
        <div className="space-y-3">
          {/* Header Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={handlePrevMonth}
              aria-label="Tháng trước"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-xs font-semibold text-foreground">
              {MONTH_NAMES[month]} năm {year}
            </span>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={handleNextMonth}
              aria-label="Tháng sau"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-muted-foreground">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="h-7 w-7 flex items-center justify-center">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Prev month days */}
            {Array.from({ length: firstDayIndex }).map((_, idx) => (
              <div
                key={`prev-${idx}`}
                className="h-7 w-7 flex items-center justify-center text-xs text-muted-foreground/30 select-none"
              >
                {daysInPrevMonth - firstDayIndex + idx + 1}
              </div>
            ))}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const selected = isSelected(day);
              const today = isToday(day);

              return (
                <button
                  key={`curr-${day}`}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={cn(
                    'h-7 w-7 rounded-md text-xs font-medium transition-colors flex items-center justify-center',
                    selected
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'hover:bg-muted text-foreground',
                    today && !selected && 'border border-primary text-primary font-semibold'
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Quick Footer Action */}
          <div className="flex items-center justify-between border-t border-border pt-2 text-xs">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs px-2 text-primary"
              onClick={handleSelectToday}
            >
              Hôm nay
            </Button>

            {value && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs px-2 text-muted-foreground"
                onClick={() => {
                  onChange?.(null);
                  setIsOpen(false);
                }}
              >
                Xóa ngày
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

DatePicker.displayName = 'DatePicker';
