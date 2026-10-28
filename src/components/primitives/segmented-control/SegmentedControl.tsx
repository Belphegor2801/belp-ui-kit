import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const segmentedVariants = cva(
  'inline-flex items-center rounded-lg bg-secondary/80 p-1 text-muted-foreground border border-border select-none transition-colors',
  {
    variants: {
      size: {
        sm: 'h-8 text-xs gap-0.5',
        md: 'h-9 text-sm gap-1',
        lg: 'h-11 text-base gap-1.5',
      },
      fullWidth: {
        true: 'w-full flex',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      size: 'md',
      fullWidth: false,
    },
  }
);

const itemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      size: {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
      isActive: {
        true: 'bg-background text-foreground shadow-sm font-semibold border border-border/60',
        false: 'text-muted-foreground hover:text-foreground hover:bg-background/40',
      },
      fullWidth: {
        true: 'flex-1',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      isActive: false,
      fullWidth: false,
    },
  }
);

export interface SegmentedOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof segmentedVariants> {
  options: (SegmentedOption | string)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      className,
      options,
      value,
      defaultValue,
      onChange,
      size = 'md',
      fullWidth = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const normalizedOptions: SegmentedOption[] = React.useMemo(() => {
      return options.map((opt) =>
        typeof opt === 'string' ? { value: opt, label: opt } : opt
      );
    }, [options]);

    const [selectedValue, setSelectedValue] = React.useState<string>(
      value ?? defaultValue ?? (normalizedOptions[0]?.value ?? '')
    );

    const isControlled = value !== undefined;
    const current = isControlled ? value : selectedValue;

    const handleSelect = (val: string, isDisabled?: boolean) => {
      if (disabled || isDisabled) return;
      if (!isControlled) {
        setSelectedValue(val);
      }
      onChange?.(val);
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-disabled={disabled}
        className={cn(segmentedVariants({ size, fullWidth }), className)}
        {...props}
      >
        {normalizedOptions.map((opt) => {
          const active = current === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              disabled={disabled || opt.disabled}
              onClick={() => handleSelect(opt.value, opt.disabled)}
              className={cn(
                itemVariants({
                  size,
                  isActive: active,
                  fullWidth,
                })
              )}
            >
              {opt.icon && <span className="mr-1.5 shrink-0">{opt.icon}</span>}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';
