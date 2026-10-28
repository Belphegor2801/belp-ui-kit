import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

export const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'h-3.5 w-3.5',
      md: 'h-5 w-5',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    color: {
      primary: 'text-primary',
      muted: 'text-muted-foreground',
      white: 'text-white',
      current: 'text-current',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size,
  color,
  label = 'Đang tải...',
  ...props
}) => {
  return (
    <div className="inline-flex items-center gap-2" role="status" {...props}>
      <Loader2
        className={cn(spinnerVariants({ size, color, className }))}
      />
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
};

Spinner.displayName = 'Spinner';
