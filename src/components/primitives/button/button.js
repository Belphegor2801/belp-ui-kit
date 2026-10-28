import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
export const buttonVariants = cva('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]', {
    variants: {
        variant: {
            solid: 'bg-primary text-primary-foreground shadow hover:bg-primary-hover active:bg-primary-hover',
            secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover',
            outline: 'border border-border bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
            link: 'text-primary underline-offset-4 hover:underline p-0 h-auto font-normal',
        },
        size: {
            sm: 'h-8 px-3 text-xs rounded',
            md: 'h-9 px-4 py-2',
            lg: 'h-11 px-6 text-base rounded-lg',
            icon: 'h-9 w-9 p-0',
            'icon-sm': 'h-8 w-8 p-0',
        },
    },
    defaultVariants: {
        variant: 'solid',
        size: 'md',
    },
});
export const Button = React.forwardRef(({ className, variant, size, asChild = false, isLoading = false, leftIcon, rightIcon, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (_jsxs(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: ref, disabled: disabled || isLoading, ...props, children: [isLoading && _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), !isLoading && leftIcon && _jsx("span", { className: "mr-2 inline-flex items-center", children: leftIcon }), children, !isLoading && rightIcon && _jsx("span", { className: "ml-2 inline-flex items-center", children: rightIcon })] }));
});
Button.displayName = 'Button';
