import * as React from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';

export type ToastVariant = 'default' | 'success' | 'destructive' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = React.useCallback(
    ({ title, description, variant = 'default', duration = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, title, description, variant, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-[var(--z-toast,1080)] flex max-h-screen w-full flex-col-reverse gap-2 sm:max-w-sm pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all animate-slide-in-right bg-card text-card-foreground',
              toast.variant === 'success' && 'border-emerald-500/30 text-emerald-900 dark:text-emerald-100 bg-emerald-500/10 backdrop-blur-sm',
              toast.variant === 'destructive' && 'border-destructive/30 text-destructive bg-destructive/10 backdrop-blur-sm',
              toast.variant === 'warning' && 'border-amber-500/30 text-amber-900 dark:text-amber-100 bg-amber-500/10 backdrop-blur-sm',
              toast.variant === 'info' && 'border-sky-500/30 text-sky-900 dark:text-sky-100 bg-sky-500/10 backdrop-blur-sm',
              (!toast.variant || toast.variant === 'default') && 'border-border'
            )}
          >
            <div className="pt-0.5">
              {toast.variant === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
              {toast.variant === 'destructive' && <AlertCircle className="h-5 w-5 text-destructive" />}
              {toast.variant === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
              {toast.variant === 'info' && <Info className="h-5 w-5 text-sky-600 dark:text-sky-400" />}
              {(!toast.variant || toast.variant === 'default') && <Info className="h-5 w-5 text-primary" />}
            </div>

            <div className="flex-1 grid gap-0.5">
              {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
              {toast.description && <div className="text-xs text-muted-foreground">{toast.description}</div>}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="rounded p-1 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Đóng"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider />');
  }

  return {
    toast: context.addToast,
    dismiss: context.removeToast,
    success: (title: string, description?: string) =>
      context.addToast({ title, description, variant: 'success' }),
    error: (title: string, description?: string) =>
      context.addToast({ title, description, variant: 'destructive' }),
    warning: (title: string, description?: string) =>
      context.addToast({ title, description, variant: 'warning' }),
    info: (title: string, description?: string) =>
      context.addToast({ title, description, variant: 'info' }),
  };
}
