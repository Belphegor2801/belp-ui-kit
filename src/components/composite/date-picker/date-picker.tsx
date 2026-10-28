import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showPresets?: boolean;
  minDate?: Date;
  maxDate?: Date;
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
  showPresets = false,
  minDate,
  maxDate,
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

  const isDateDisabled = (d: Date) => {
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
      return true;
    }
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) {
      return true;
    }
    return false;
  };

  const handleSelectDay = (day: number) => {
    const selected = new Date(year, month, day);
    if (isDateDisabled(selected)) return;
    onChange?.(selected);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    const today = new Date();
    if (isDateDisabled(today)) return;
    onChange?.(today);
    setViewDate(today);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  const applyPreset = (daysFromToday: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysFromToday);
    if (isDateDisabled(target)) return;
    onChange?.(target);
    setViewDate(target);
    setIsOpen(false);
  };

  // Calendar calculations (Monday = 0)
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
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
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex items-center justify-between rounded-lg border border-input bg-background text-sm ring-offset-background transition-all duration-150 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none text-left shadow-xs hover:border-primary/50 cursor-pointer',
            size === 'sm' && 'h-8 px-2.5 text-xs',
            size === 'md' && 'h-9 px-3 py-1.5 text-sm',
            size === 'lg' && 'h-11 px-4 text-base',
            hasError && 'border-destructive focus:ring-destructive text-destructive',
            isOpen && 'border-primary ring-2 ring-primary/20',
            className
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <CalendarIcon className="h-4 w-4 shrink-0 text-primary opacity-80" />
            <span className={cn('truncate', !value && 'text-muted-foreground', value && 'font-mono text-foreground font-medium')}>
              {value ? formatDisplayDate(value) : placeholder}
            </span>
          </div>

          {value && !disabled ? (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              className="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ml-1 cursor-pointer"
              title="Xóa ngày đã chọn"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          ) : (
            <span className="w-3" />
          )}
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className="z-50 flex rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl outline-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
        >
          {showPresets && (
            <div className="flex flex-col gap-1 border-r border-border p-3 text-xs w-32 bg-card/40">
              <span className="font-semibold text-muted-foreground px-2 py-1 uppercase text-[10px] tracking-wider font-mono">
                Chọn nhanh
              </span>
              <button
                type="button"
                onClick={handleSelectToday}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent text-foreground transition-colors"
              >
                Hôm nay
              </button>
              <button
                type="button"
                onClick={() => applyPreset(1)}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent text-foreground transition-colors"
              >
                Ngày mai
              </button>
              <button
                type="button"
                onClick={() => applyPreset(7)}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent text-foreground transition-colors"
              >
                7 ngày tới
              </button>
              <button
                type="button"
                onClick={() => applyPreset(30)}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent text-foreground transition-colors"
              >
                1 tháng tới
              </button>
            </div>
          )}

          <div className="p-3 w-72 space-y-3">
            {/* Header Navigation */}
            <div className="flex items-center justify-between pb-1 border-b border-border/60">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Tháng trước"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="text-sm font-semibold text-foreground">
                {MONTH_NAMES[month]} {year}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Tháng sau"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-muted-foreground font-mono">
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
                  className="h-7 w-7 flex items-center justify-center text-xs text-muted-foreground/30 select-none font-mono"
                >
                  {daysInPrevMonth - firstDayIndex + idx + 1}
                </div>
              ))}

              {/* Current month days */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const dateObj = new Date(year, month, day);
                const selected = isSelected(day);
                const today = isToday(day);
                const disabledDay = isDateDisabled(dateObj);

                return (
                  <button
                    key={`curr-${day}`}
                    type="button"
                    disabled={disabledDay}
                    onClick={() => handleSelectDay(day)}
                    className={cn(
                      'h-7 w-7 rounded-md text-xs font-medium font-mono transition-all duration-100 flex items-center justify-center',
                      disabledDay && 'opacity-25 cursor-not-allowed',
                      selected
                        ? 'bg-primary text-primary-foreground font-bold shadow-sm shadow-primary/30 scale-105'
                        : 'hover:bg-accent hover:text-accent-foreground text-foreground hover:scale-105 active:scale-95',
                      today && !selected && 'border border-primary/70 text-primary font-semibold'
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Quick Footer Action */}
            <div className="flex items-center justify-between border-t border-border pt-2 text-xs">
              <button
                type="button"
                onClick={handleSelectToday}
                className="font-medium text-primary hover:underline text-xs"
              >
                Hôm nay
              </button>

              {value && (
                <button
                  type="button"
                  onClick={() => {
                    onChange?.(null);
                    setIsOpen(false);
                  }}
                  className="text-muted-foreground hover:text-foreground text-xs"
                >
                  Xóa ngày
                </button>
              )}
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

DatePicker.displayName = 'DatePicker';
