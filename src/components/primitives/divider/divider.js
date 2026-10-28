import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/utils/cn';
export const Divider = React.forwardRef(({ className, orientation = 'horizontal', label, ...props }, ref) => {
    if (orientation === 'vertical') {
        return (_jsx("div", { ref: ref, className: cn('inline-block h-auto w-px self-stretch bg-border', className), role: "separator", "aria-orientation": "vertical", ...props }));
    }
    if (label) {
        return (_jsxs("div", { ref: ref, className: cn('flex items-center w-full my-4 text-xs text-muted-foreground', className), role: "separator", "aria-orientation": "horizontal", ...props, children: [_jsx("div", { className: "flex-grow border-t border-border" }), _jsx("span", { className: "px-3 select-none", children: label }), _jsx("div", { className: "flex-grow border-t border-border" })] }));
    }
    return (_jsx("div", { ref: ref, className: cn('h-px w-full bg-border my-4', className), role: "separator", "aria-orientation": "horizontal", ...props }));
});
Divider.displayName = 'Divider';
