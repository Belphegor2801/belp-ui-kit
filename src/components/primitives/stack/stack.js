import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/utils/cn';
const gapClasses = {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
};
const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
};
const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
};
export const Stack = React.forwardRef(({ className, direction = 'column', gap = 4, align = 'stretch', justify = 'start', wrap = false, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn('flex', direction === 'row' ? 'flex-row' : 'flex-col', gapClasses[gap] || 'gap-4', alignClasses[align], justifyClasses[justify], wrap && 'flex-wrap', className), ...props }));
});
Stack.displayName = 'Stack';
export const HStack = React.forwardRef(({ align = 'center', ...props }, ref) => _jsx(Stack, { ref: ref, direction: "row", align: align, ...props }));
HStack.displayName = 'HStack';
export const VStack = React.forwardRef(({ align = 'stretch', ...props }, ref) => _jsx(Stack, { ref: ref, direction: "column", align: align, ...props }));
VStack.displayName = 'VStack';
