import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        solid:
          'bg-primary text-primary-foreground font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_1px_3px_0_rgba(0,0,0,0.35)] hover:bg-primary-hover active:bg-primary-hover border border-primary/50 hover:shadow-[0_0_16px_hsl(var(--primary)/0.35)]',
        secondary:
          'bg-secondary text-secondary-foreground border border-border shadow-sm hover:bg-secondary-hover hover:border-muted-foreground/30',
        outline:
          'border border-border bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-muted-foreground/30',
        ghost:
          'hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:bg-destructive/90',
        link:
          'text-primary underline-offset-4 hover:underline p-0 h-auto font-normal',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
        md: 'h-9 px-4 py-2 text-sm rounded-xl gap-2',
        lg: 'h-11 px-6 text-base rounded-2xl gap-2.5',
        icon: 'h-9 w-9 p-0 rounded-xl',
        'icon-sm': 'h-8 w-8 p-0 rounded-lg',
      },
      radius: {
        default: '',
        none: 'rounded-none',
        sm: 'rounded-md',
        md: 'rounded-lg',
        lg: 'rounded-xl',
        xl: 'rounded-2xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      radius: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
