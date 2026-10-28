import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/primitives/card';
import { cn } from '@/utils/cn';
export const MetricCard = ({ className, title, value, icon, change, changePeriod = 'so với kỳ trước', trend: explicitTrend, invertTrendColor = false, footer, ...props }) => {
    const trend = explicitTrend ||
        (change !== undefined ? (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral') : undefined);
    const isPositiveGood = !invertTrendColor;
    const isUp = trend === 'up';
    const isDown = trend === 'down';
    const badgeColorClass = trend === 'neutral'
        ? 'text-muted-foreground bg-muted'
        : (isUp && isPositiveGood) || (isDown && !isPositiveGood)
            ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
            : 'text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/20';
    return (_jsx(Card, { className: cn('overflow-hidden', className), ...props, children: _jsxs(CardContent, { className: "p-5", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: title }), _jsx("div", { className: "text-2xl font-bold tracking-tight text-foreground", children: value })] }), icon && (_jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary", children: icon }))] }), (change !== undefined || trend) && (_jsxs("div", { className: "mt-3 flex items-center gap-2 text-xs", children: [_jsxs("span", { className: cn('inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-medium border text-[11px]', badgeColorClass), children: [trend === 'up' && _jsx(ArrowUpRight, { className: "h-3 w-3" }), trend === 'down' && _jsx(ArrowDownRight, { className: "h-3 w-3" }), trend === 'neutral' && _jsx(Minus, { className: "h-3 w-3" }), _jsx("span", { children: change !== undefined
                                        ? `${change > 0 ? '+' : ''}${change}%`
                                        : trend?.toUpperCase() })] }), changePeriod && _jsx("span", { className: "text-muted-foreground text-[11px]", children: changePeriod })] })), footer && _jsx("div", { className: "mt-3 pt-3 border-t border-border/60", children: footer })] }) }));
};
MetricCard.displayName = 'MetricCard';
