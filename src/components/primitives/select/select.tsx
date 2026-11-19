import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface NativeSelectOption {
  value: string;
  label: string;
  node?: React.ReactNode;
  disabled?: boolean;
}

interface SelectNativeContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  options: NativeSelectOption[];
  placeholder?: string;
}

const SelectNativeContext = React.createContext<SelectNativeContextValue | null>(null);

function extractSelectMeta(children: React.ReactNode): { options: NativeSelectOption[]; placeholder?: string } {
  const options: NativeSelectOption[] = [];
  let placeholder: string | undefined;

  function traverse(node: React.ReactNode) {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach(traverse);
      return;
    }
    if (!React.isValidElement(node)) return;

    const props = node.props as Record<string, unknown> | undefined;
    if (!props) return;

    if (typeof props.placeholder === 'string') {
      placeholder = props.placeholder;
    }

    if (typeof props.value === 'string') {
      let text = '';
      function getText(c: React.ReactNode) {
        if (typeof c === 'string' || typeof c === 'number') {
          text += c;
        } else if (Array.isArray(c)) {
          c.forEach(getText);
        } else if (React.isValidElement(c)) {
          const childProps = c.props as Record<string, unknown> | undefined;
          if (childProps && childProps.children) {
            getText(childProps.children as React.ReactNode);
          }
        }
      }
      getText(props.children as React.ReactNode);
      options.push({
        value: props.value,
        label: text.trim() || props.value,
        node: props.children as React.ReactNode,
        disabled: Boolean(props.disabled),
      });
    }

    if (props.children) {
      traverse(props.children as React.ReactNode);
    }
  }

  traverse(children);
  return { options, placeholder };
}

export const Select: React.FC<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>> = ({
  value,
  onValueChange,
  disabled,
  children,
  ...props
}) => {
  const [internalValue, setInternalValue] = React.useState(props.defaultValue);
  const currentValue = value !== undefined ? value : internalValue;
  const handleValueChange = React.useCallback(
    (val: string) => {
      if (value === undefined) {
        setInternalValue(val);
      }
      onValueChange?.(val);
    },
    [value, onValueChange]
  );

  const meta = React.useMemo(() => extractSelectMeta(children), [children]);

  return (
    <SelectNativeContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        disabled,
        options: meta.options,
        placeholder: meta.placeholder,
      }}
    >
      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        {...props}
      >
        {children}
      </SelectPrimitive.Root>
    </SelectNativeContext.Provider>
  );
};

export const SelectGroup = SelectPrimitive.Group;

export const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ children, placeholder, ...props }, ref) => {
  const nativeContext = React.useContext(SelectNativeContext);

  if (children) {
    return (
      <SelectPrimitive.Value ref={ref} placeholder={placeholder} {...props}>
        {children}
      </SelectPrimitive.Value>
    );
  }

  const selectedOption = nativeContext?.options.find((opt) => opt.value === nativeContext.value);

  return (
    <SelectPrimitive.Value ref={ref} placeholder={placeholder} {...props}>
      {selectedOption ? (selectedOption.node ?? selectedOption.label) : undefined}
    </SelectPrimitive.Value>
  );
});
SelectValue.displayName = SelectPrimitive.Value.displayName;

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    hasError?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }
>(({ className, children, hasError = false, size = 'md', ...props }, ref) => {
  const nativeContext = React.useContext(SelectNativeContext);

  const isFullWidth = !className || (!className.includes('w-') && !className.includes('inline'));
  const wrapperClass = cn(
    'relative',
    isFullWidth ? 'w-full' : 'inline-flex',
    className?.includes('flex-1') && 'flex-1',
    className?.includes('shrink-0') && 'shrink-0'
  );

  return (
    <div className={wrapperClass}>
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex w-full items-center justify-between rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors select-none max-md:pointer-events-none md:pointer-events-auto',
          size === 'sm' && 'h-8 px-2.5 text-xs',
          size === 'md' && 'h-9 px-3 py-1.5 text-sm',
          size === 'lg' && 'h-11 px-4 text-base',
          hasError && 'border-destructive focus:ring-destructive text-destructive',
          className
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-60 transition-transform duration-200" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      {nativeContext && nativeContext.options.length > 0 && (
        <select
          aria-label={props['aria-label'] || nativeContext.placeholder || 'Select option'}
          value={nativeContext.value ?? ''}
          disabled={props.disabled || nativeContext.disabled}
          tabIndex={-1}
          onChange={(e) => {
            nativeContext.onValueChange?.(e.target.value);
          }}
          className="absolute inset-0 z-10 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed md:hidden pointer-events-auto"
        >
          {nativeContext.placeholder && (
            <option value="" disabled hidden>
              {nativeContext.placeholder}
            </option>
          )}
          {nativeContext.options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1 text-muted-foreground', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

export const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1 text-muted-foreground', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md duration-200 ease-spring data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary stroke-[2.5]" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
