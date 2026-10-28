import * as React from 'react';
import { cn } from '@/utils/cn';

export interface FormFieldProps {
  id?: string;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  className?: string;
  children: React.ReactElement<{
    id?: string;
    hasError?: boolean;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    disabled?: boolean;
  }>;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  hint,
  error,
  required = false,
  className,
  children,
}) => {
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

  return (
    <div className={cn('grid gap-1.5 w-full', className)}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-sm font-medium leading-none text-foreground select-none"
        >
          {label}
          {required && <span className="ml-1 text-destructive font-bold">*</span>}
        </label>
      )}

      {childWithProps}

      {hint && !error && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-xs font-medium text-destructive animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

FormField.displayName = 'FormField';
