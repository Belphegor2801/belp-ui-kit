import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
export const headingVariants = cva('tracking-tight text-foreground font-semibold', {
    variants: {
        level: {
            h1: 'text-3xl font-bold lg:text-4xl',
            h2: 'text-2xl font-bold lg:text-3xl',
            h3: 'text-xl font-semibold',
            h4: 'text-lg font-semibold',
            h5: 'text-base font-medium',
            h6: 'text-sm font-medium',
        },
    },
    defaultVariants: {
        level: 'h2',
    },
});
export const Heading = React.forwardRef(({ className, level = 'h2', as, children, ...props }, ref) => {
    const Component = as || level || 'h2';
    return (_jsx(Component, { ref: ref, className: cn(headingVariants({ level, className })), ...props, children: children }));
});
Heading.displayName = 'Heading';
export const textVariants = cva('text-foreground', {
    variants: {
        variant: {
            body: 'text-sm leading-relaxed',
            lead: 'text-lg text-muted-foreground leading-relaxed',
            large: 'text-base font-semibold',
            small: 'text-xs leading-normal',
            muted: 'text-sm text-muted-foreground',
        },
    },
    defaultVariants: {
        variant: 'body',
    },
});
export const Text = React.forwardRef(({ className, variant, as = 'p', children, ...props }, ref) => {
    const Component = as;
    return (_jsx(Component, { ref: ref, className: cn(textVariants({ variant, className })), ...props, children: children }));
});
Text.displayName = 'Text';
export const Code = React.forwardRef(({ className, children, ...props }, ref) => {
    return (_jsx("code", { ref: ref, className: cn('relative rounded bg-muted px-[0.35rem] py-[0.15rem] font-mono text-xs font-semibold text-foreground border border-border/50', className), ...props, children: children }));
});
Code.displayName = 'Code';
export const Kbd = React.forwardRef(({ className, children, ...props }, ref) => {
    return (_jsx("kbd", { ref: ref, className: cn('pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm', className), ...props, children: children }));
});
Kbd.displayName = 'Kbd';
