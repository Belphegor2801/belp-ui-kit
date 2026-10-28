import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showPresets?: boolean;
}

const DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const MONTHS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
  'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
  'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

function formatDate(date?: Date): string {
  if (!date) return '';
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function isSameDay(d1?: Date, d2?: Date): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isDateInRange(date: Date, from?: Date, to?: Date): boolean {
  if (!from || !to) return false;
  const time = date.getTime();
  const startTime = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
  const endTime = new Date(to.getFullYear(), to.getMonth(), to.getDate()).getTime();
  return time > startTime && time < endTime;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder = 'Chọn khoảng ngày...',
  disabled = false,
  className,
  showPresets = true,
}) => {
  const [internalRange, setInternalRange] = React.useState<DateRange>(defaultValue ?? {});
  const [open, setOpen] = React.useState(false);
  const [hoverDate, setHoverDate] = React.useState<Date | undefined>(undefined);

  const range = value ?? internalRange;

  const [viewDate, setViewDate] = React.useState<Date>(
    range.from ?? new Date()
  );

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const selected = new Date(currentYear, currentMonth, day);

    // If no start date or both dates are already selected, start a new range
    if (!range.from || (range.from && range.to)) {
      const newRange = { from: selected, to: undefined };
      if (!value) setInternalRange(newRange);
      onChange?.(newRange);
      return;
    }

    // If start date exists and clicked date is before start date, treat clicked date as new start
    if (range.from && selected < range.from) {
      const newRange = { from: selected, to: undefined };
      if (!value) setInternalRange(newRange);
      onChange?.(newRange);
      return;
    }

    // Set end date and close popover
    const newRange = { from: range.from, to: selected };
    if (!value) setInternalRange(newRange);
    onChange?.(newRange);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newRange = { from: undefined, to: undefined };
    if (!value) setInternalRange(newRange);
    onChange?.(newRange);
  };

  const applyPreset = (preset: 'today' | 'last7' | 'last30' | 'thisMonth') => {
    const today = new Date();
    let newRange: DateRange = {};

    if (preset === 'today') {
      newRange = { from: today, to: today };
    } else if (preset === 'last7') {
      const from = new Date();
      from.setDate(today.getDate() - 6);
      newRange = { from, to: today };
    } else if (preset === 'last30') {
      const from = new Date();
      from.setDate(today.getDate() - 29);
      newRange = { from, to: today };
    } else if (preset === 'thisMonth') {
      const from = new Date(today.getFullYear(), today.getMonth(), 1);
      newRange = { from, to: today };
    }

    if (!value) setInternalRange(newRange);
    onChange?.(newRange);
    if (newRange.from) setViewDate(newRange.from);
    setOpen(false);
  };

  const displayLabel = React.useMemo(() => {
    if (range.from && range.to) {
      return `${formatDate(range.from)} – ${formatDate(range.to)}`;
    }
    if (range.from) {
      return `${formatDate(range.from)} – ...`;
    }
    return '';
  }, [range]);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'inline-flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-left font-normal',
            !displayLabel && 'text-muted-foreground',
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <Calendar className="h-4 w-4 shrink-0 opacity-60 text-primary" />
            <span className={cn('truncate', displayLabel && 'font-mono text-foreground font-medium')}>
              {displayLabel || placeholder}
            </span>
          </div>

          {displayLabel && (
            <span
              onClick={handleClear}
              className="ml-2 rounded-sm p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
              title="Xóa khoảng ngày"
            >
              <X className="h-3.5 w-3.5" />
            </span>
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
            <div className="flex flex-col gap-1 border-r border-border p-3 text-xs w-36 bg-card/40">
              <span className="font-semibold text-muted-foreground px-2 py-1 uppercase text-[10px] tracking-wider">
                Khoảng nhanh
              </span>
              <button
                type="button"
                onClick={() => applyPreset('today')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent text-foreground transition-colors"
              >
                Hôm nay
              </button>
              <button
                type="button"
                onClick={() => applyPreset('last7')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent text-foreground transition-colors"
              >
                7 ngày qua
              </button>
              <button
                type="button"
                onClick={() => applyPreset('last30')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent text-foreground transition-colors"
              >
                30 ngày qua
              </button>
              <button
                type="button"
                onClick={() => applyPreset('thisMonth')}
                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent text-foreground transition-colors"
              >
                Tháng này
              </button>
            </div>
          )}

          <div className="p-3 w-72">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Tháng trước"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="text-sm font-semibold text-foreground">
                {MONTHS[currentMonth]} {currentYear}
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

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-1">
              {DAYS.map((d) => (
                <div key={d} className="h-7 flex items-center justify-center">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="h-7" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const date = new Date(currentYear, currentMonth, day);
                const isStart = isSameDay(date, range.from);
                const isEnd = isSameDay(date, range.to);
                const effectiveTo = range.to ?? (range.from && hoverDate && hoverDate > range.from ? hoverDate : undefined);
                const inRange = isDateInRange(date, range.from, effectiveTo);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelectDay(day)}
                    onMouseEnter={() => setHoverDate(date)}
                    onMouseLeave={() => setHoverDate(undefined)}
                    className={cn(
                      'h-7 w-full flex items-center justify-center transition-colors font-medium',
                      (isStart || isEnd) &&
                        'bg-primary text-primary-foreground font-semibold rounded-md shadow-xs z-10',
                      isStart && !isEnd && range.to && 'rounded-r-none',
                      isEnd && !isStart && 'rounded-l-none',
                      inRange && !isStart && !isEnd && 'bg-primary/20 text-foreground rounded-none',
                      !isStart && !isEnd && !inRange && 'rounded-md hover:bg-accent text-foreground'
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
