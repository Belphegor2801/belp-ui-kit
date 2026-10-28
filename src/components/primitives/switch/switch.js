import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/utils/cn';
export const Switch = React.forwardRef(({ className, label, description, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const switchElement = (_jsx(SwitchPrimitives.Root, { id: inputId, className: cn('peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input', className), ...props, disabled: disabled, ref: ref, children: _jsx(SwitchPrimitives.Thumb, { className: cn('pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0') }) }));
    if (!label && !description) {
        return switchElement;
    }
    return (_jsxs("div", { className: "flex items-center justify-between gap-4 select-none", children: [_jsxs("div", { className: "grid gap-0.5 leading-tight", children: [label && (_jsx("label", { htmlFor: inputId, className: cn('text-sm font-medium text-foreground cursor-pointer', disabled && 'cursor-not-allowed opacity-50'), children: label })), description && (_jsx("p", { className: "text-xs text-muted-foreground", children: description }))] }), switchElement] }));
});
Switch.displayName = SwitchPrimitives.Root.displayName;
