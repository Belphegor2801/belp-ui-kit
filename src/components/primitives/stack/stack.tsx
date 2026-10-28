import * as React from 'react';
import { cn } from '@/utils/cn';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
}

const gapClasses: Record<number, string> = {
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
};

const alignClasses: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

const justifyClasses: Record<string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = 'column',
      gap = 4,
      align = 'stretch',
      justify = 'start',
      wrap = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          direction === 'row' ? 'flex-row' : 'flex-col',
          gapClasses[gap] || 'gap-4',
          alignClasses[align],
          justifyClasses[justify],
          wrap && 'flex-wrap',
          className
        )}
        {...props}
      />
    );
  }
);
Stack.displayName = 'Stack';

export const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  ({ align = 'center', ...props }, ref) => <Stack ref={ref} direction="row" align={align} {...props} />
);
HStack.displayName = 'HStack';

export const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  ({ align = 'stretch', ...props }, ref) => <Stack ref={ref} direction="column" align={align} {...props} />
);
VStack.displayName = 'VStack';
