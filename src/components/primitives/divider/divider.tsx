import * as React from 'react';
import { cn } from '@/utils/cn';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', label, ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          className={cn('inline-block h-auto w-px self-stretch bg-border', className)}
          role="separator"
          aria-orientation="vertical"
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center w-full my-4 text-xs text-muted-foreground', className)}
          role="separator"
          aria-orientation="horizontal"
          {...props}
        >
          <div className="flex-grow border-t border-border" />
          <span className="px-3 select-none">{label}</span>
          <div className="flex-grow border-t border-border" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('h-px w-full bg-border my-4', className)}
        role="separator"
        aria-orientation="horizontal"
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
