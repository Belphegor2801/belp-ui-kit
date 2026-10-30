import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SidebarItemProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface SidebarGroupProps {
  title?: string;
  children: React.ReactNode;
}

export interface SidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ title, children }) => (
  <div className="space-y-1">
    {title && (
      <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground font-mono truncate">
        {title}
      </div>
    )}
    <div className="space-y-0.5">{children}</div>
  </div>
);

export const SidebarItem: React.FC<SidebarItemProps & { collapsed?: boolean }> = ({
  label,
  icon,
  active = false,
  badge,
  onClick,
  disabled = false,
  collapsed = false,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={cn(
        'group flex w-full items-center rounded-lg px-2.5 py-2 text-xs font-medium transition-all duration-150 select-none cursor-pointer',
        collapsed ? 'justify-center' : 'justify-between',
        active
          ? 'bg-primary text-primary-foreground font-semibold shadow-sm shadow-primary/20'
          : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
    >
      <div className={cn('flex items-center gap-2.5 min-w-0', collapsed && 'justify-center')}>
        {icon && (
          <span
            className={cn(
              'h-4 w-4 shrink-0 transition-transform group-hover:scale-110',
              active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary'
            )}
          >
            {icon}
          </span>
        )}
        {!collapsed && <span className="truncate">{label}</span>}
      </div>

      {!collapsed && badge && (
        <span
          className={cn(
            'ml-2 shrink-0 rounded-full px-1.5 py-0.2 text-[10px] font-mono',
            active
              ? 'bg-primary-foreground/20 text-primary-foreground'
              : 'bg-secondary text-muted-foreground border border-border'
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onCollapsedChange,
  header,
  footer,
  children,
  className,
}) => {
  const [internalCollapsed, setInternalCollapsed] = React.useState(false);
  const isCollapsed = onCollapsedChange ? collapsed : internalCollapsed;

  const toggleCollapse = () => {
    if (onCollapsedChange) {
      onCollapsedChange(!collapsed);
    } else {
      setInternalCollapsed((prev) => !prev);
    }
  };

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-border bg-card/60 backdrop-blur-md transition-all duration-300 ease-spring h-full select-none',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Sidebar Header */}
      {header && (
        <div className="flex h-14 items-center justify-between border-b border-border/80 px-3.5">
          <div className="truncate flex-1">{header}</div>
          <button
            type="button"
            onClick={toggleCollapse}
            className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors ml-2 cursor-pointer"
            aria-label={isCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>
      )}

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-4">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Pass collapsed prop down to SidebarItem
            return React.cloneElement(child as React.ReactElement<{ collapsed?: boolean }>, {
              collapsed: isCollapsed,
            });
          }
          return child;
        })}
      </div>

      {/* Sidebar Footer */}
      {footer && (
        <div className="border-t border-border/80 p-2.5">
          {footer}
        </div>
      )}
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';
