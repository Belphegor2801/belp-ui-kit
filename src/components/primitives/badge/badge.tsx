import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary border border-primary/25',
        secondary: 'bg-secondary text-secondary-foreground border border-border/80',
        outline: 'border border-border text-foreground',
        success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25',
        warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25',
        destructive: 'bg-destructive/10 text-destructive border border-destructive/25',
        info: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/25',
      },
      size: {
        sm: 'px-2 py-0.2 text-[11px] leading-tight',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
      mono: {
        true: 'font-mono text-[11px] tracking-tight',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      mono: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  withDot?: boolean;
  pulse?: boolean;
  onRemove?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  mono = false,
  withDot = false,
  pulse = false,
  onRemove,
  children,
  ...props
}) => {
  return (
    <div className={cn(badgeVariants({ variant, size, mono }), className)} {...props}>
      {withDot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={cn(
                'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
                variant === 'default' && 'bg-primary',
                variant === 'secondary' && 'bg-muted-foreground',
                variant === 'outline' && 'bg-foreground',
                variant === 'success' && 'bg-emerald-400',
                variant === 'warning' && 'bg-amber-400',
                variant === 'destructive' && 'bg-destructive',
                variant === 'info' && 'bg-sky-400'
              )}
            />
          )}
          <span
            className={cn(
              'relative inline-flex h-2 w-2 rounded-full',
              variant === 'default' && 'bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.7)]',
              variant === 'secondary' && 'bg-muted-foreground',
              variant === 'outline' && 'bg-foreground',
              variant === 'success' && 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]',
              variant === 'warning' && 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]',
              variant === 'destructive' && 'bg-destructive shadow-[0_0_8px_hsl(var(--destructive)/0.7)]',
              variant === 'info' && 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.7)]'
            )}
          />
        </span>
      )}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 -mr-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Xóa nhãn"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

Badge.displayName = 'Badge';
