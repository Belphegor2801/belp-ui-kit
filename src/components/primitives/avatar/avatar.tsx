import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full border border-border select-none',
  {
    variants: {
      size: {
        sm: 'h-7 w-7 text-xs',
        md: 'h-9 w-9 text-sm',
        lg: 'h-11 w-11 text-base',
        xl: 'h-14 w-14 text-lg font-semibold',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  status?: 'online' | 'busy' | 'offline' | 'away';
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, src, alt, fallback, status, ...props }, ref) => {
  return (
    <div className="relative inline-block">
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback
          className="flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground uppercase"
        >
          {fallback || (alt ? alt.slice(0, 2) : '?')}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-background',
            size === 'sm' && 'h-2 w-2',
            (size === 'md' || !size) && 'h-2.5 w-2.5',
            size === 'lg' && 'h-3 w-3',
            size === 'xl' && 'h-3.5 w-3.5',
            status === 'online' && 'bg-emerald-500',
            status === 'busy' && 'bg-rose-500',
            status === 'away' && 'bg-amber-500',
            status === 'offline' && 'bg-slate-400'
          )}
        />
      )}
    </div>
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;
