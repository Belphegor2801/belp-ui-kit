import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { Avatar } from '../../primitives/avatar';

const dotVariants = cva(
  'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
  {
    variants: {
      status: {
        default: 'border-border bg-card text-muted-foreground',
        info: 'border-sky-500 bg-sky-500/20 text-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.4)]',
        success: 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]',
        warning: 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]',
        destructive: 'border-rose-500 bg-rose-500/20 text-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.4)]',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
);

export interface TimelineItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  timestamp: string;
  status?: 'default' | 'info' | 'success' | 'warning' | 'destructive';
  icon?: React.ReactNode;
  author?: {
    name: string;
    avatar?: string;
  };
  extra?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div className={cn('relative space-y-4 pl-3 before:absolute before:left-[23px] before:top-3 before:bottom-3 before:w-[2px] before:bg-border/60', className)}>
      {items.map((item) => (
        <div key={item.id} className="relative flex items-start gap-3 group">
          <div className={cn(dotVariants({ status: item.status }))}>
            {item.icon ? (
              <span className="h-3 w-3 flex items-center justify-center">
                {item.icon}
              </span>
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            )}
          </div>

          <div className="flex-1 min-w-0 pt-0.5 pb-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {item.title}
                </span>
                {item.author && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full border border-border">
                    {item.author.avatar ? (
                      <Avatar src={item.author.avatar} alt={item.author.name} fallback={item.author.name.slice(0, 2).toUpperCase()} size="sm" />
                    ) : null}
                    <span>{item.author.name}</span>
                  </span>
                )}
              </div>

              <time className="text-xs font-mono text-muted-foreground">
                {item.timestamp}
              </time>
            </div>

            {item.description && (
              <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </div>
            )}

            {item.extra && <div className="mt-2">{item.extra}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};
