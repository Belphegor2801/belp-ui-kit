import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/utils/cn';
export const Textarea = React.forwardRef(({ className, hasError = false, showCount = false, maxLength, value, onChange, disabled, ...props }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;
    return (_jsxs("div", { className: "relative w-full", children: [_jsx("textarea", { className: cn('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors', hasError && 'border-destructive focus-visible:ring-destructive/60 text-destructive', className), ref: ref, value: value, onChange: onChange, maxLength: maxLength, disabled: disabled, ...props }), showCount && maxLength && (_jsxs("div", { className: "mt-1 text-right text-xs text-muted-foreground", children: [currentLength, "/", maxLength] }))] }));
});
Textarea.displayName = 'Textarea';
