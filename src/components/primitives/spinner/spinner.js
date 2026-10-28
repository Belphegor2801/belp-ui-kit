import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2 } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
export const spinnerVariants = cva('animate-spin', {
    variants: {
        size: {
            sm: 'h-3.5 w-3.5',
            md: 'h-5 w-5',
            lg: 'h-8 w-8',
            xl: 'h-12 w-12',
        },
        color: {
            primary: 'text-primary',
            muted: 'text-muted-foreground',
            white: 'text-white',
            current: 'text-current',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'primary',
    },
});
export const Spinner = ({ className, size, color, label = 'Đang tải...', ...props }) => {
    return (_jsxs("div", { className: "inline-flex items-center gap-2", role: "status", ...props, children: [_jsx(Loader2, { className: cn(spinnerVariants({ size, color, className })) }), label && _jsx("span", { className: "sr-only", children: label })] }));
};
Spinner.displayName = 'Spinner';
