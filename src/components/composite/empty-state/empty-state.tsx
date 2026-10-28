import * as React from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  className,
  icon = <Inbox className="h-10 w-10 text-muted-foreground stroke-1" />,
  title,
  description,
  action,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center animate-fade-in',
        className
      )}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/60 mb-3">
        {icon}
      </div>
      <h4 className="text-base font-semibold text-foreground">{title}</h4>
      {description && (
        <p className="mt-1 max-w-sm text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
