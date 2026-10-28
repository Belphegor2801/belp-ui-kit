import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  onChange?: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  placeholder,
  disabled = false,
  hasError = false,
  prefix,
  suffix,
  className,
  size = 'md',
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const updateValue = (nextVal: number) => {
    const clamped = Math.min(max, Math.max(min, nextVal));
    if (!isControlled) {
      setInternalValue(clamped);
    }
    onChange?.(clamped);
  };

  const handleDecrement = () => {
    if (disabled) return;
    updateValue(value - step);
  };

  const handleIncrement = () => {
    if (disabled) return;
    updateValue(value + step);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      updateValue(val);
    } else if (e.target.value === '') {
      updateValue(0);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center rounded-md border border-input bg-background text-sm transition-colors ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 overflow-hidden',
        size === 'sm' && 'h-8 text-xs',
        size === 'md' && 'h-9 text-sm',
        size === 'lg' && 'h-11 text-base',
        hasError && 'border-destructive focus-within:ring-destructive',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <button
        type="button"
        disabled={disabled || value <= min}
        onClick={handleDecrement}
        className="flex items-center justify-center h-full px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/80 disabled:opacity-40 disabled:hover:bg-transparent transition-colors select-none"
        aria-label="Giảm"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <div className="flex flex-1 items-center justify-center px-1">
        {prefix && <span className="text-muted-foreground mr-1 select-none">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className="w-full text-center bg-transparent border-none outline-none font-mono text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && <span className="text-muted-foreground ml-1 select-none font-mono text-xs">{suffix}</span>}
      </div>

      <button
        type="button"
        disabled={disabled || value >= max}
        onClick={handleIncrement}
        className="flex items-center justify-center h-full px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/80 disabled:opacity-40 disabled:hover:bg-transparent transition-colors select-none"
        aria-label="Tăng"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

NumberInput.displayName = 'NumberInput';
