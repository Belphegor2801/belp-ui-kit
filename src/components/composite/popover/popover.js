import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/utils/cn';
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = React.forwardRef(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (_jsx(PopoverPrimitive.Portal, { children: _jsx(PopoverPrimitive.Content, { ref: ref, align: align, sideOffset: sideOffset, className: cn('z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-scale-in', className), ...props }) })));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
