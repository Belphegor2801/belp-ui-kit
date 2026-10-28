import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 text-sm [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-card text-foreground border-border',
        info: 'bg-sky-500/10 text-sky-900 dark:text-sky-200 border-sky-500/30 [&>svg]:text-sky-600 dark:[&>svg]:text-sky-400',
        success: 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border-emerald-500/30 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400',
        warning: 'bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/30 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400',
        destructive: 'bg-destructive/10 text-destructive border-destructive/30 [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  onDismiss?: () => void;
  showIcon?: boolean;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, onDismiss, showIcon = true, ...props }, ref) => {
    const Icon =
      variant === 'success'
        ? CheckCircle2
        : variant === 'warning'
        ? AlertTriangle
        : variant === 'destructive'
        ? AlertCircle
        : Info;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {showIcon && <Icon className="h-4 w-4" />}
        {children}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="absolute right-3 top-3 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Đóng thông báo"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-xs [&_p]:leading-relaxed text-muted-foreground', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
