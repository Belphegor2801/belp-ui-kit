import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { X, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/utils/cn';
export const inputVariants = cva('flex w-full rounded-md border border-input bg-background text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', {
    variants: {
        inputSize: {
            sm: 'h-8 px-2.5 text-xs',
            md: 'h-9 px-3 py-1 text-sm',
            lg: 'h-11 px-4 text-base',
        },
        hasError: {
            true: 'border-destructive focus-visible:ring-destructive/60 text-destructive',
            false: '',
        },
    },
    defaultVariants: {
        inputSize: 'md',
        hasError: false,
    },
});
export const Input = React.forwardRef(({ className, type = 'text', inputSize, hasError = false, leftIcon, rightIcon, isClearable = false, onClear, showPasswordToggle = false, value, onChange, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const resolvedType = showPasswordToggle && type === 'password'
        ? (showPassword ? 'text' : 'password')
        : type;
    const hasRightContent = rightIcon || isClearable || (showPasswordToggle && type === 'password');
    return (_jsxs("div", { className: "relative flex items-center w-full", children: [leftIcon && (_jsx("div", { className: "absolute left-3 flex items-center pointer-events-none text-muted-foreground", children: leftIcon })), _jsx("input", { type: resolvedType, className: cn(inputVariants({ inputSize, hasError }), leftIcon && 'pl-9', hasRightContent && 'pr-9', className), ref: ref, value: value, onChange: onChange, disabled: disabled, ...props }), _jsxs("div", { className: "absolute right-2.5 flex items-center gap-1 text-muted-foreground", children: [isClearable && Boolean(value) && !disabled && (_jsx("button", { type: "button", tabIndex: -1, onClick: onClear, className: "rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors", "aria-label": "X\u00F3a n\u1ED9i dung", children: _jsx(X, { className: "h-3.5 w-3.5" }) })), showPasswordToggle && type === 'password' && (_jsx("button", { type: "button", tabIndex: -1, onClick: () => setShowPassword((prev) => !prev), className: "rounded p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors", "aria-label": showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu', children: showPassword ? _jsx(EyeOff, { className: "h-4 w-4" }) : _jsx(Eye, { className: "h-4 w-4" }) })), rightIcon && _jsx("div", { className: "pointer-events-none", children: rightIcon })] })] }));
});
Input.displayName = 'Input';
