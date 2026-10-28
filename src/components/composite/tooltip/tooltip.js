import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/utils/cn';
export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (_jsx(TooltipPrimitive.Content, { ref: ref, sideOffset: sideOffset, className: cn('z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-scale-in', className), ...props })));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
export const Tooltip = ({ content, children, side = 'top', delayDuration = 200, }) => {
    return (_jsx(TooltipProvider, { delayDuration: delayDuration, children: _jsxs(TooltipRoot, { children: [_jsx(TooltipTrigger, { asChild: true, children: children }), _jsx(TooltipContent, { side: side, children: content })] }) }));
};
