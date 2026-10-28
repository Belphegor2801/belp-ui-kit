import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

export const progressVariants = cva('h-full w-full flex-1 transition-all duration-300 ease-in-out', {
  variants: {
    variant: {
      primary: 'bg-primary',
      success: 'bg-emerald-500',
      warning: 'bg-amber-500',
      destructive: 'bg-destructive',
      info: 'bg-sky-400',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  label?: React.ReactNode;
  showValue?: boolean;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size = 'md',
      variant = 'primary',
      label,
      showValue = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max(0, Math.round((value / max) * 100)), 100);

    return (
      <div className={cn('w-full space-y-1.5', className)} ref={ref} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between text-xs text-muted-foreground select-none">
            {label && <span>{label}</span>}
            {showValue && <span className="font-mono font-medium text-foreground">{percentage}%</span>}
          </div>
        )}

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          className={cn(
            'relative w-full overflow-hidden rounded-full bg-muted/80 dark:bg-muted/50 border border-border/40',
            size === 'sm' && 'h-1.5',
            size === 'md' && 'h-2.5',
            size === 'lg' && 'h-4'
          )}
        >
          <div
            className={cn(progressVariants({ variant }))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
