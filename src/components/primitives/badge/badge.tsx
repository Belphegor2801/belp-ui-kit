import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary border border-primary/20',
        secondary: 'bg-secondary text-secondary-foreground border border-transparent',
        outline: 'border border-border text-foreground',
        success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
        destructive: 'bg-destructive/10 text-destructive border border-destructive/20',
        info: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
      },
      size: {
        sm: 'px-2 py-0.2 text-[11px] leading-tight',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  withDot?: boolean;
  onRemove?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  withDot = false,
  onRemove,
  children,
  ...props
}) => {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {withDot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'default' && 'bg-primary',
            variant === 'secondary' && 'bg-muted-foreground',
            variant === 'outline' && 'bg-foreground',
            variant === 'success' && 'bg-emerald-500',
            variant === 'warning' && 'bg-amber-500',
            variant === 'destructive' && 'bg-destructive',
            variant === 'info' && 'bg-sky-500'
          )}
        />
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
