import * as React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Checkbox } from '@/components/primitives/checkbox';
import { Skeleton } from '@/components/composite/skeleton';
import { EmptyState } from '@/components/composite/empty-state';
import { cn } from '@/utils/cn';

export type TableDensity = 'compact' | 'default' | 'relaxed';

export interface ColumnDef<T> {
  key: string;
  header: React.ReactNode;
  accessor?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  rowKey: (row: T, index: number) => string | number;
  isLoading?: boolean;
  density?: TableDensity;
  stickyHeader?: boolean;
  striped?: boolean;
  // Sorting
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (columnKey: string) => void;
  // Row selection
  selectable?: boolean;
  selectedKeys?: Set<string | number>;
  onSelectionChange?: (selectedKeys: Set<string | number>) => void;
  // Events
  onRowClick?: (row: T) => void;
  // Custom states
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  rowKey,
  isLoading = false,
  density = 'default',
  stickyHeader = false,
  striped = false,
  sortColumn,
  sortDirection,
  onSort,
  selectable = false,
  selectedKeys = new Set(),
  onSelectionChange,
  onRowClick,
  emptyMessage = 'Không có dữ liệu phù hợp',
  emptyIcon,
  className,
}: DataTableProps<T>) {
  // Density heights and paddings
  const densityCellClasses = {
    compact: 'py-2 px-3 text-xs',
    default: 'py-3 px-4 text-sm',
    relaxed: 'py-4 px-5 text-sm',
  };

  const densityHeaderClasses = {
    compact: 'py-2 px-3 text-[11px]',
    default: 'py-2.5 px-4 text-xs',
    relaxed: 'py-3.5 px-5 text-xs',
  };

  const isAllSelected =
    data.length > 0 && data.every((row, i) => selectedKeys.has(rowKey(row, i)));
  const isSomeSelected =
    data.some((row, i) => selectedKeys.has(rowKey(row, i))) && !isAllSelected;

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (isAllSelected) {
      onSelectionChange(new Set());
    } else {
      const allKeys = new Set<string | number>(data.map((row, i) => rowKey(row, i)));
      onSelectionChange(allKeys);
    }
  };

  const handleSelectRow = (key: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onSelectionChange) return;
    const next = new Set(selectedKeys);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    onSelectionChange(next);
  };

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm',
        className
      )}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full caption-bottom text-left border-collapse">
          <thead
            className={cn(
              'border-b border-border bg-muted/60 dark:bg-muted/40 text-muted-foreground dark:text-muted-foreground/90 uppercase font-semibold tracking-wider select-none',
              stickyHeader && 'sticky top-0 z-10 backdrop-blur-md bg-muted/80 dark:bg-muted/90'
            )}
          >
            <tr>
              {selectable && (
                <th className={cn('w-[44px] text-center', densityHeaderClasses[density])}>
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={isAllSelected ? true : isSomeSelected ? 'indeterminate' : false}
                      onCheckedChange={handleSelectAll}
                      aria-label="Chọn tất cả"
                    />
                  </div>
                </th>
              )}

              {columns.map((col) => {
                const isSorted = sortColumn === col.key;
                return (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    className={cn(
                      densityHeaderClasses[density],
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right',
                      col.sortable && 'cursor-pointer hover:bg-muted transition-colors',
                      col.className
                    )}
                    onClick={() => col.sortable && onSort?.(col.key)}
                  >
                    <div
                      className={cn(
                        'inline-flex items-center gap-1.5',
                        col.align === 'center' && 'justify-center',
                        col.align === 'right' && 'justify-end'
                      )}
                    >
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-muted-foreground/70">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp className="h-3.5 w-3.5 text-primary" />
                            ) : (
                              <ArrowDown className="h-3.5 w-3.5 text-primary" />
                            )
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-border/60">
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: 5 }).map((_, rIdx) => (
                <tr key={`loading-row-${rIdx}`} className="animate-pulse">
                  {selectable && (
                    <td className={cn('text-center', densityCellClasses[density])}>
                      <Skeleton className="h-4 w-4 mx-auto rounded" />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={densityCellClasses[density]}>
                      <Skeleton className="h-4 w-full max-w-[80%] rounded" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Empty State
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="py-12 text-center"
                >
                  <EmptyState
                    icon={emptyIcon}
                    title={emptyMessage}
                    description="Thử điều chỉnh lại bộ lọc hoặc tìm kiếm từ khóa khác."
                    className="border-none shadow-none min-h-[160px]"
                  />
                </td>
              </tr>
            ) : (
              // Data Rows
              data.map((row, rIdx) => {
                const id = rowKey(row, rIdx);
                const isSelected = selectedKeys.has(id);

                return (
                  <tr
                    key={id}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      'transition-colors hover:bg-muted/40 cursor-default',
                      isSelected && 'bg-primary/10 hover:bg-primary/15 dark:bg-primary/20 dark:hover:bg-primary/25',
                      striped && rIdx % 2 === 1 && !isSelected && 'bg-muted/15 dark:bg-muted/10',
                      onRowClick && 'cursor-pointer'
                    )}
                  >
                    {selectable && (
                      <td
                        className={cn('text-center', densityCellClasses[density])}
                        onClick={(e) => handleSelectRow(id, e)}
                      >
                        <div className="flex items-center justify-center">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => {}}
                            aria-label={`Chọn dòng ${id}`}
                          />
                        </div>
                      </td>
                    )}

                    {columns.map((col) => {
                      const value = col.accessor
                        ? col.accessor(row, rIdx)
                        : (row as Record<string, unknown>)[col.key];

                      return (
                        <td
                          key={col.key}
                          className={cn(
                            densityCellClasses[density],
                            col.align === 'center' && 'text-center',
                            col.align === 'right' && 'text-right',
                            col.className
                          )}
                        >
                          {value as React.ReactNode}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

DataTable.displayName = 'DataTable';
