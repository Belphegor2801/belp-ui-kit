import * as React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Input } from '@/components/primitives/input';
import { Button } from '@/components/primitives/button';
import { cn } from '@/utils/cn';

export interface FilterBarProps {
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  activeFilterCount?: number;
  onResetFilters?: () => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Tìm kiếm dữ liệu...',
  children,
  actions,
  activeFilterCount = 0,
  onResetFilters,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-lg border border-border bg-card shadow-sm mb-4',
        className
      )}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2.5">
        {onSearchChange && (
          <div className="w-full sm:w-64 md:w-72">
            <Input
              inputSize="sm"
              leftIcon={<Search className="h-4 w-4" />}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              isClearable
              onClear={() => onSearchChange('')}
            />
          </div>
        )}

        {children}

        {activeFilterCount > 0 && onResetFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="text-xs text-muted-foreground hover:text-foreground h-8 px-2"
          >
            <RotateCcw className="mr-1.5 h-3 w-3" />
            Xóa bộ lọc ({activeFilterCount})
          </Button>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/60">
          {actions}
        </div>
      )}
    </div>
  );
};

FilterBar.displayName = 'FilterBar';
