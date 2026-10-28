import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../../utils/cn';

export interface SliderMark {
  value: number;
  label: string;
}

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** Optional mark points along the slider track */
  marks?: SliderMark[];
  /** Whether to display a floating or inline value badge */
  showValue?: boolean;
  /** Value formatter for displaying numbers (e.g. (v) => `${v}%`) */
  formatValue?: (value: number) => string;
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, min = 0, max = 100, step = 1, marks, showValue = false, formatValue = (v) => `${v}`, value, defaultValue, onValueChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState<number[]>(
    value ?? defaultValue ?? [min]
  );

  const currentValue = value ?? internalValue;

  const handleChange = (vals: number[]) => {
    setInternalValue(vals);
    onValueChange?.(vals);
  };

  return (
    <div className="w-full space-y-2">
      {showValue && (
        <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
          <span>Min: {formatValue(min)}</span>
          <span className="font-semibold text-foreground bg-secondary/80 px-2 py-0.5 rounded border border-border">
            {currentValue.map(formatValue).join(' – ')}
          </span>
          <span>Max: {formatValue(max)}</span>
        </div>
      )}

      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleChange}
        className={cn(
          'relative flex w-full touch-none select-none items-center py-1 cursor-pointer',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary/80 border border-border/50">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>

        {currentValue.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-4 w-4 rounded-full border-2 border-primary bg-background shadow-md transition-transform duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-115 active:scale-95"
            aria-label={`Slider thumb ${i + 1}`}
          />
        ))}
      </SliderPrimitive.Root>

      {marks && marks.length > 0 && (
        <div className="relative w-full h-4 text-[10px] font-mono text-muted-foreground">
          {marks.map((mark) => {
            const percentage = ((mark.value - min) / (max - min)) * 100;
            return (
              <span
                key={mark.value}
                className="absolute -translate-x-1/2 cursor-pointer hover:text-foreground transition-colors"
                style={{ left: `${percentage}%` }}
                onClick={() => handleChange([mark.value])}
              >
                {mark.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';
