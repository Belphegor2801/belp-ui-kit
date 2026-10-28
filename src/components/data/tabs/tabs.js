import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/utils/cn';
export const Tabs = TabsPrimitive.Root;
export const TabsList = React.forwardRef(({ className, variant = 'pill', ...props }, ref) => (_jsx(TabsPrimitive.List, { ref: ref, className: cn(variant === 'pill' &&
        'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground', variant === 'underline' &&
        'inline-flex h-10 items-center justify-start border-b border-border text-muted-foreground w-full gap-6', className), ...props })));
TabsList.displayName = TabsPrimitive.List.displayName;
export const TabsTrigger = React.forwardRef(({ className, variant = 'pill', ...props }, ref) => (_jsx(TabsPrimitive.Trigger, { ref: ref, className: cn(variant === 'pill' &&
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm', variant === 'underline' &&
        'inline-flex items-center justify-center whitespace-nowrap py-2 text-sm font-medium border-b-2 border-transparent transition-all hover:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-primary data-[state=active]:text-primary', className), ...props })));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
export const TabsContent = React.forwardRef(({ className, ...props }, ref) => (_jsx(TabsPrimitive.Content, { ref: ref, className: cn('mt-3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-in', className), ...props })));
TabsContent.displayName = TabsPrimitive.Content.displayName;
