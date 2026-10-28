import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/utils/cn';
export const Skeleton = ({ className, shape = 'rounded', ...props }) => {
    return (_jsx("div", { className: cn('animate-pulse bg-muted', shape === 'rounded' && 'rounded-md', shape === 'circle' && 'rounded-full', shape === 'square' && 'rounded-none', className), ...props }));
};
Skeleton.displayName = 'Skeleton';
