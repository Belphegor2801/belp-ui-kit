import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/utils/cn';
export const FormField = ({ id, label, hint, error, required = false, className, children, }) => {
    const generatedId = React.useId();
    const fieldId = id || children.props.id || generatedId;
    const hintId = `${fieldId}-hint`;
    const errorId = `${fieldId}-error`;
    const ariaDescribedBy = [
        hint ? hintId : null,
        error ? errorId : null,
    ]
        .filter(Boolean)
        .join(' ') || undefined;
    const childWithProps = React.cloneElement(children, {
        id: fieldId,
        hasError: Boolean(error),
        'aria-describedby': ariaDescribedBy,
        'aria-invalid': Boolean(error),
    });
    return (_jsxs("div", { className: cn('grid gap-1.5 w-full', className), children: [label && (_jsxs("label", { htmlFor: fieldId, className: "text-sm font-medium leading-none text-foreground select-none", children: [label, required && _jsx("span", { className: "ml-1 text-destructive font-bold", children: "*" })] })), childWithProps, hint && !error && (_jsx("p", { id: hintId, className: "text-xs text-muted-foreground", children: hint })), error && (_jsx("p", { id: errorId, className: "text-xs font-medium text-destructive animate-fade-in", children: error }))] }));
};
FormField.displayName = 'FormField';
