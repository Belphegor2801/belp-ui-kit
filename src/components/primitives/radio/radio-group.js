import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '@/utils/cn';
export const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx(RadioGroupPrimitive.Root, { className: cn('grid gap-2.5', className), ...props, ref: ref }));
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
export const RadioGroupItem = React.forwardRef(({ className, label, description, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const itemElement = (_jsx(RadioGroupPrimitive.Item, { ref: ref, id: inputId, disabled: disabled, className: cn('aspect-square h-4 w-4 rounded-full border border-input text-primary ring-offset-background transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary', className), ...props, children: _jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: _jsx(Circle, { className: "h-2.5 w-2.5 fill-primary text-primary" }) }) }));
    if (!label && !description) {
        return itemElement;
    }
    return (_jsxs("div", { className: "flex items-start gap-2.5 select-none", children: [_jsx("div", { className: "pt-0.5", children: itemElement }), _jsxs("div", { className: "grid gap-0.5 leading-tight", children: [label && (_jsx("label", { htmlFor: inputId, className: cn('text-sm font-medium text-foreground cursor-pointer', disabled && 'cursor-not-allowed opacity-50'), children: label })), description && (_jsx("p", { className: "text-xs text-muted-foreground", children: description }))] })] }));
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
