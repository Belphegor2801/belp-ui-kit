import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Utility to conditionally merge Tailwind CSS class names with automatic conflict resolution.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
