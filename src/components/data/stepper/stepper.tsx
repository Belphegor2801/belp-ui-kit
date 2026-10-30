import * as React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

export type StepStatus = 'completed' | 'active' | 'pending' | 'error';

export interface StepItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: StepItem[];
  activeStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
  clickable?: boolean;
  stepStatus?: Record<number, StepStatus>;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  orientation = 'horizontal',
  clickable = true,
  stepStatus = {},
  className,
}) => {
  const getStatus = (index: number): StepStatus => {
    if (stepStatus[index]) return stepStatus[index];
    if (index < activeStep) return 'completed';
    if (index === activeStep) return 'active';
    return 'pending';
  };

  if (orientation === 'vertical') {
    return (
      <div className={cn('space-y-4 relative pl-2', className)}>
        {steps.map((step, idx) => {
          const status = getStatus(idx);
          const isClickable = clickable && onStepClick && (status === 'completed' || idx <= activeStep + 1);

          return (
            <div key={step.id} className="relative flex items-start gap-3.5 group">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'absolute left-[15px] top-[32px] bottom-[-16px] w-[2px] transition-colors duration-200',
                    idx < activeStep ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}

              {/* Step indicator circle */}
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(idx)}
                className={cn(
                  'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold font-mono transition-all duration-200 border-2 select-none',
                  status === 'completed' &&
                    'border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/30',
                  status === 'active' &&
                    'border-primary bg-background text-primary ring-4 ring-primary/20 shadow-md',
                  status === 'pending' &&
                    'border-border bg-card text-muted-foreground',
                  status === 'error' &&
                    'border-destructive bg-destructive text-destructive-foreground ring-4 ring-destructive/20',
                  isClickable && 'cursor-pointer hover:scale-110 active:scale-95'
                )}
              >
                {status === 'completed' ? (
                  <Check className="h-4 w-4 stroke-[3]" />
                ) : status === 'error' ? (
                  <AlertCircle className="h-4 w-4" />
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span>{idx + 1}</span>
                )}
              </button>

              {/* Title & Description */}
              <div
                onClick={() => isClickable && onStepClick?.(idx)}
                className={cn(
                  'pt-1 pb-4 flex-1 min-w-0 transition-opacity',
                  isClickable && 'cursor-pointer',
                  status === 'pending' && 'opacity-60'
                )}
              >
                <div
                  className={cn(
                    'text-sm font-semibold leading-tight tracking-tight transition-colors',
                    status === 'active' ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const status = getStatus(idx);
          const isClickable = clickable && onStepClick && (status === 'completed' || idx <= activeStep + 1);

          return (
            <React.Fragment key={step.id}>
              {/* Step Unit */}
              <div
                onClick={() => isClickable && onStepClick?.(idx)}
                className={cn(
                  'flex items-center gap-2.5 transition-all select-none',
                  isClickable ? 'cursor-pointer' : 'cursor-default',
                  status === 'pending' && 'opacity-60'
                )}
              >
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold font-mono transition-all duration-200 border-2',
                    status === 'completed' &&
                      'border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/30',
                    status === 'active' &&
                      'border-primary bg-background text-primary ring-4 ring-primary/20 shadow-sm',
                    status === 'pending' &&
                      'border-border bg-card text-muted-foreground',
                    status === 'error' &&
                      'border-destructive bg-destructive text-destructive-foreground ring-4 ring-destructive/20'
                  )}
                >
                  {status === 'completed' ? (
                    <Check className="h-4 w-4 stroke-[3]" />
                  ) : status === 'error' ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="hidden sm:block text-left">
                  <div
                    className={cn(
                      'text-xs font-semibold leading-tight tracking-tight',
                      status === 'active' ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-[10px] text-muted-foreground leading-tight truncate max-w-[120px]">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connecting line between steps */}
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 mx-3 h-[2px] rounded-full transition-colors duration-200',
                    idx < activeStep ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

Stepper.displayName = 'Stepper';
