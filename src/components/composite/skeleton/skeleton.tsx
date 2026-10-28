import * as React from 'react';
import { cn } from '@/utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'rounded' | 'circle' | 'square';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  shape = 'rounded',
  ...props
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        shape === 'rounded' && 'rounded-md',
        shape === 'circle' && 'rounded-full',
        shape === 'square' && 'rounded-none',
        className
      )}
      {...props}
    />
  );
};

Skeleton.displayName = 'Skeleton';
