import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
export const badgeVariants = cva('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none', {
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
});
export const Badge = ({ className, variant = 'default', size = 'md', withDot = false, onRemove, children, ...props }) => {
    return (_jsxs("div", { className: cn(badgeVariants({ variant, size }), className), ...props, children: [withDot && (_jsx("span", { className: cn('h-1.5 w-1.5 rounded-full', variant === 'default' && 'bg-primary', variant === 'secondary' && 'bg-muted-foreground', variant === 'outline' && 'bg-foreground', variant === 'success' && 'bg-emerald-500', variant === 'warning' && 'bg-amber-500', variant === 'destructive' && 'bg-destructive', variant === 'info' && 'bg-sky-500') })), _jsx("span", { children: children }), onRemove && (_jsx("button", { type: "button", tabIndex: -1, onClick: (e) => {
                    e.stopPropagation();
                    onRemove();
                }, className: "ml-0.5 -mr-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors", "aria-label": "X\u00F3a nh\u00E3n", children: _jsx(X, { className: "h-3 w-3" }) }))] }));
};
Badge.displayName = 'Badge';
