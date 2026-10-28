import * as React from 'react';
import { Button, type ButtonProps } from './button';
import { Tooltip } from '@/components/composite/tooltip';
import { cn } from '@/utils/cn';

export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon'> {
  icon: React.ReactNode;
  'aria-label': string;
  tooltip?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, tooltip, size = 'icon', 'aria-label': ariaLabel, ...props }, ref) => {
    const button = (
      <Button
        ref={ref}
        size={size}
        className={cn('shrink-0', className)}
        aria-label={ariaLabel}
        {...props}
      >
        {icon}
      </Button>
    );

    if (tooltip) {
      return <Tooltip content={tooltip}>{button}</Tooltip>;
    }

    return button;
  }
);

IconButton.displayName = 'IconButton';
