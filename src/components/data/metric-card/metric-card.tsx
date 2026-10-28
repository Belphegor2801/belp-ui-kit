import * as React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/primitives/card';
import { cn } from '@/utils/cn';

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  change?: number; // e.g. 12.5 or -4.2
  changePeriod?: string; // e.g. "so với tháng trước"
  trend?: 'up' | 'down' | 'neutral';
  invertTrendColor?: boolean; // If lower is better (e.g. bounce rate, errors)
  footer?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  className,
  title,
  value,
  icon,
  change,
  changePeriod = 'so với kỳ trước',
  trend: explicitTrend,
  invertTrendColor = false,
  footer,
  ...props
}) => {
  const trend =
    explicitTrend ||
    (change !== undefined ? (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral') : undefined);

  const isPositiveGood = !invertTrendColor;
  const isUp = trend === 'up';
  const isDown = trend === 'down';

  const badgeColorClass =
    trend === 'neutral'
      ? 'text-muted-foreground bg-muted'
      : (isUp && isPositiveGood) || (isDown && !isPositiveGood)
      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      : 'text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/20';

  return (
    <Card className={cn('overflow-hidden', className)} {...props}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </p>
            <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
          </div>

          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>

        {(change !== undefined || trend) && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-medium border text-[11px]',
                badgeColorClass
              )}
            >
              {trend === 'up' && <ArrowUpRight className="h-3 w-3" />}
              {trend === 'down' && <ArrowDownRight className="h-3 w-3" />}
              {trend === 'neutral' && <Minus className="h-3 w-3" />}
              <span>
                {change !== undefined
                  ? `${change > 0 ? '+' : ''}${change}%`
                  : trend?.toUpperCase()}
              </span>
            </span>
            {changePeriod && <span className="text-muted-foreground text-[11px]">{changePeriod}</span>}
          </div>
        )}

        {footer && <div className="mt-3 pt-3 border-t border-border/60">{footer}</div>}
      </CardContent>
    </Card>
  );
};

MetricCard.displayName = 'MetricCard';
