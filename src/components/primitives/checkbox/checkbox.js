import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';
export const Checkbox = React.forwardRef(({ className, label, description, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const checkboxElement = (_jsx(CheckboxPrimitive.Root, { ref: ref, id: inputId, disabled: disabled, className: cn('peer h-4 w-4 shrink-0 rounded border border-input bg-background ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground', className), ...props, children: _jsx(CheckboxPrimitive.Indicator, { className: cn('flex items-center justify-center text-current'), children: _jsx(Check, { className: "h-3 w-3 stroke-[3]" }) }) }));
    if (!label && !description) {
        return checkboxElement;
    }
    return (_jsxs("div", { className: "flex items-start gap-2.5 select-none", children: [_jsx("div", { className: "pt-0.5", children: checkboxElement }), _jsxs("div", { className: "grid gap-0.5 leading-tight", children: [label && (_jsx("label", { htmlFor: inputId, className: cn('text-sm font-medium text-foreground cursor-pointer', disabled && 'cursor-not-allowed opacity-50'), children: label })), description && (_jsx("p", { className: "text-xs text-muted-foreground", children: description }))] })] }));
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
