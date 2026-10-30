import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isClearable?: boolean;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Chọn một mục...',
  searchPlaceholder = 'Tìm kiếm lựa chọn...',
  emptyMessage = 'Không tìm thấy kết quả phù hợp.',
  disabled = false,
  className,
  size = 'md',
  isClearable = true,
}) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const selectedOption = React.useMemo(() => {
    return options.find((opt) => opt.value === value);
  }, [options, value]);

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options;
    const lower = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(lower) ||
        (opt.description && opt.description.toLowerCase().includes(lower)) ||
        opt.value.toLowerCase().includes(lower)
    );
  }, [options, searchQuery]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [open]);

  const handleSelect = (val: string, optDisabled?: boolean) => {
    if (optDisabled) return;
    onChange?.(val);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredOptions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredOptions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredOptions[activeIndex];
      if (current && !current.disabled) {
        handleSelect(current.value);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex w-full items-center justify-between rounded-lg border border-input bg-background text-sm ring-offset-background transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-left shadow-xs hover:border-primary/50 cursor-pointer',
            size === 'sm' && 'h-8 px-2.5 text-xs',
            size === 'md' && 'h-9 px-3 py-1.5 text-sm',
            size === 'lg' && 'h-11 px-4 text-base',
            open && 'border-primary ring-2 ring-primary/20',
            className
          )}
        >
          <div className="flex items-center gap-2 truncate flex-1 min-w-0">
            {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
            <span className={cn('truncate', !selectedOption && 'text-muted-foreground')}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 ml-2">
            {isClearable && value && !disabled && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClear}
                className="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Xóa lựa chọn"
              >
                <X className="h-3.5 w-3.5" />
              </span>
            )}
            <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
          </div>
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={5}
          className="z-50 w-[var(--radix-popover-trigger-width)] min-w-[200px] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl outline-none duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <div className="flex items-center border-b border-border px-3 py-2">
            <Search className="mr-2 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="flex h-6 w-full rounded bg-transparent text-xs font-sans outline-none placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-muted-foreground hover:text-foreground font-mono"
              >
                Clear
              </button>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground font-sans">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value, opt.disabled)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={cn(
                      'relative flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer select-none',
                      opt.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
                      isSelected && 'bg-primary/10 text-primary font-medium',
                      isActive && !isSelected && 'bg-accent text-accent-foreground',
                      isActive && isSelected && 'bg-primary/15'
                    )}
                  >
                    <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                      {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                      <div className="truncate">
                        <div className="truncate font-medium">{opt.label}</div>
                        {opt.description && (
                          <div className="text-[10px] text-muted-foreground truncate font-normal">
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 ml-2" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

Combobox.displayName = 'Combobox';
