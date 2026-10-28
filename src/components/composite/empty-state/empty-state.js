import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Inbox } from 'lucide-react';
import { cn } from '@/utils/cn';
export const EmptyState = ({ className, icon = _jsx(Inbox, { className: "h-10 w-10 text-muted-foreground stroke-1" }), title, description, action, ...props }) => {
    return (_jsxs("div", { className: cn('flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center animate-fade-in', className), ...props, children: [_jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-muted/60 mb-3", children: icon }), _jsx("h4", { className: "text-base font-semibold text-foreground", children: title }), description && (_jsx("p", { className: "mt-1 max-w-sm text-xs text-muted-foreground leading-relaxed", children: description })), action && _jsx("div", { className: "mt-5", children: action })] }));
};
EmptyState.displayName = 'EmptyState';
