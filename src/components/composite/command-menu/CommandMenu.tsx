import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Search, CornerDownLeft } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Kbd } from '../../primitives/typography';

export interface CommandAction {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  group?: string;
  onSelect?: () => void;
  disabled?: boolean;
}

export interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actions: CommandAction[];
  placeholder?: string;
  emptyText?: string;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  open,
  onOpenChange,
  actions,
  placeholder = 'Nhập lệnh hoặc tìm kiếm dịch vụ... (Esc để đóng)',
  emptyText = 'Không tìm thấy kết quả phù hợp.',
}) => {
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Filter actions based on query
  const filteredActions = React.useMemo(() => {
    if (!query.trim()) return actions;
    const lower = query.toLowerCase();
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(lower) ||
        (a.subtitle && a.subtitle.toLowerCase().includes(lower)) ||
        (a.group && a.group.toLowerCase().includes(lower))
    );
  }, [actions, query]);

  // Group actions
  const groupedActions = React.useMemo(() => {
    const groups: Record<string, CommandAction[]> = {};
    for (const act of filteredActions) {
      const g = act.group || 'Gợi ý';
      if (!groups[g]) groups[g] = [];
      groups[g].push(act);
    }
    return groups;
  }, [filteredActions]);

  // Reset active index when query changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredActions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredActions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredActions[activeIndex];
      if (current && !current.disabled) {
        current.onSelect?.();
        onOpenChange(false);
      }
    }
  };

  let globalIndexCounter = 0;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onKeyDown={handleKeyDown}
          className="fixed left-[50%] top-[20%] z-50 w-full max-w-lg -translate-x-[50%] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] sm:rounded-xl"
        >
          <div className="flex items-center border-b border-border px-3.5 py-2.5">
            <Search className="mr-2.5 h-4 w-4 shrink-0 text-primary opacity-80" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex h-8 w-full rounded-md bg-transparent text-sm font-sans outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs text-muted-foreground hover:text-foreground font-mono px-1.5 py-0.5 rounded bg-secondary border border-border mr-1"
              >
                Clear
              </button>
            )}
            <Kbd>Esc</Kbd>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {filteredActions.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                {emptyText}
              </div>
            ) : (
              Object.entries(groupedActions).map(([groupName, groupItems]) => (
                <div key={groupName} className="mb-2">
                  <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                    {groupName}
                  </div>
                  <div className="space-y-0.5">
                    {groupItems.map((action) => {
                      const itemIndex = globalIndexCounter++;
                      const isSelected = itemIndex === activeIndex;

                      return (
                        <div
                          key={action.id}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            if (!action.disabled) {
                              action.onSelect?.();
                              onOpenChange(false);
                            }
                          }}
                          onMouseEnter={() => setActiveIndex(itemIndex)}
                          className={cn(
                            'group flex items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors cursor-pointer select-none',
                            isSelected
                              ? 'bg-primary text-primary-foreground font-medium'
                              : 'text-foreground hover:bg-secondary/80'
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {action.icon && (
                              <span
                                className={cn(
                                  'h-4 w-4 shrink-0',
                                  isSelected ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                                )}
                              >
                                {action.icon}
                              </span>
                            )}
                            <div className="truncate">
                              <div className="truncate font-medium">{action.title}</div>
                              {action.subtitle && (
                                <div
                                  className={cn(
                                    'text-xs truncate font-normal',
                                    isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                                  )}
                                >
                                  {action.subtitle}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-3">
                            {action.shortcut && action.shortcut.length > 0 && (
                              <div className="flex gap-1">
                                {action.shortcut.map((key) => (
                                  <span
                                    key={key}
                                    className={cn(
                                      'text-[10px] font-mono px-1.5 py-0.5 rounded border',
                                      isSelected
                                        ? 'border-primary-foreground/30 bg-primary-foreground/20 text-primary-foreground'
                                        : 'border-border bg-secondary text-muted-foreground'
                                    )}
                                  >
                                    {key}
                                  </span>
                                ))}
                              </div>
                            )}

                            {isSelected && (
                              <CornerDownLeft className="h-3.5 w-3.5 opacity-80" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border px-3.5 py-2 text-[11px] text-muted-foreground bg-secondary/40 font-mono">
            <div className="flex items-center gap-2">
              <span>Di chuyển: <Kbd>↑</Kbd> <Kbd>↓</Kbd></span>
              <span>Chọn: <Kbd>↵</Kbd></span>
            </div>
            <span>Đóng: <Kbd>Esc</Kbd></span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
