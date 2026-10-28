import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';
const ToastContext = React.createContext(undefined);
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = React.useState([]);
    const removeToast = React.useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
    const addToast = React.useCallback(({ title, description, variant = 'default', duration = 4000 }) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { id, title, description, variant, duration };
        setToasts((prev) => [...prev, newToast]);
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
        return id;
    }, [removeToast]);
    return (_jsxs(ToastContext.Provider, { value: { toasts, addToast, removeToast }, children: [children, _jsx("div", { "aria-live": "polite", className: "fixed bottom-4 right-4 z-[var(--z-toast,1080)] flex max-h-screen w-full flex-col-reverse gap-2 sm:max-w-sm pointer-events-none", children: toasts.map((toast) => (_jsxs("div", { className: cn('pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all animate-slide-in-right bg-card text-card-foreground', toast.variant === 'success' && 'border-emerald-500/30 text-emerald-900 dark:text-emerald-100 bg-emerald-500/10 backdrop-blur-sm', toast.variant === 'destructive' && 'border-destructive/30 text-destructive bg-destructive/10 backdrop-blur-sm', toast.variant === 'warning' && 'border-amber-500/30 text-amber-900 dark:text-amber-100 bg-amber-500/10 backdrop-blur-sm', toast.variant === 'info' && 'border-sky-500/30 text-sky-900 dark:text-sky-100 bg-sky-500/10 backdrop-blur-sm', (!toast.variant || toast.variant === 'default') && 'border-border'), children: [_jsxs("div", { className: "pt-0.5", children: [toast.variant === 'success' && _jsx(CheckCircle2, { className: "h-5 w-5 text-emerald-600 dark:text-emerald-400" }), toast.variant === 'destructive' && _jsx(AlertCircle, { className: "h-5 w-5 text-destructive" }), toast.variant === 'warning' && _jsx(AlertTriangle, { className: "h-5 w-5 text-amber-600 dark:text-amber-400" }), toast.variant === 'info' && _jsx(Info, { className: "h-5 w-5 text-sky-600 dark:text-sky-400" }), (!toast.variant || toast.variant === 'default') && _jsx(Info, { className: "h-5 w-5 text-primary" })] }), _jsxs("div", { className: "flex-1 grid gap-0.5", children: [toast.title && _jsx("div", { className: "text-sm font-semibold", children: toast.title }), toast.description && _jsx("div", { className: "text-xs text-muted-foreground", children: toast.description })] }), _jsx("button", { type: "button", onClick: () => removeToast(toast.id), className: "rounded p-1 opacity-70 hover:opacity-100 transition-opacity", "aria-label": "\u0110\u00F3ng", children: _jsx(X, { className: "h-4 w-4" }) })] }, toast.id))) })] }));
};
export function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a <ToastProvider />');
    }
    return {
        toast: context.addToast,
        dismiss: context.removeToast,
        success: (title, description) => context.addToast({ title, description, variant: 'success' }),
        error: (title, description) => context.addToast({ title, description, variant: 'destructive' }),
        warning: (title, description) => context.addToast({ title, description, variant: 'warning' }),
        info: (title, description) => context.addToast({ title, description, variant: 'info' }),
    };
}
