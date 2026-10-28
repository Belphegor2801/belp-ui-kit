import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/utils/cn';

export const linkVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
  {
    variants: {
      variant: {
        default: 'text-primary hover:text-primary-hover underline underline-offset-4',
        subtle: 'text-foreground hover:text-primary transition-colors no-underline hover:underline underline-offset-4',
        muted: 'text-muted-foreground hover:text-foreground no-underline hover:underline underline-offset-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  isExternal?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, isExternal = false, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, className }))}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer noopener' : undefined}
        {...props}
      >
        {children}
        {isExternal && <ExternalLink className="h-3 w-3 opacity-70" />}
      </a>
    );
  }
);

Link.displayName = 'Link';
