import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

export const headingVariants = cva('tracking-tight text-foreground', {
  variants: {
    level: {
      h1: 'text-3xl lg:text-4xl',
      h2: 'text-2xl lg:text-3xl',
      h3: 'text-xl',
      h4: 'text-lg',
      h5: 'text-base',
      h6: 'text-sm',
    },
    variant: {
      sans: 'font-sans font-semibold tracking-tight',
      editorial: 'font-serif tracking-normal font-normal text-foreground/95',
    },
  },
  defaultVariants: {
    level: 'h2',
    variant: 'sans',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 'h2', variant = 'sans', as, children, ...props }, ref) => {
    const Component = as || level || 'h2';
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, variant, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = 'Heading';

export const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      body: 'text-sm leading-relaxed',
      lead: 'text-lg text-muted-foreground leading-relaxed',
      large: 'text-base font-semibold',
      small: 'text-xs leading-normal',
      muted: 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, as = 'p', children, ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = 'Text';

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          'relative rounded bg-muted/80 dark:bg-muted/60 px-[0.4rem] py-[0.15rem] font-mono text-[11px] font-medium text-foreground border border-border/80 tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }
);
Code.displayName = 'Code';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted/70 px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);
Kbd.displayName = 'Kbd';
