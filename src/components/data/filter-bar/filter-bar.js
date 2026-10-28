import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search, RotateCcw } from 'lucide-react';
import { Input } from '@/components/primitives/input';
import { Button } from '@/components/primitives/button';
import { cn } from '@/utils/cn';
export const FilterBar = ({ searchValue = '', onSearchChange, searchPlaceholder = 'Tìm kiếm dữ liệu...', children, actions, activeFilterCount = 0, onResetFilters, className, }) => {
    return (_jsxs("div", { className: cn('flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-lg border border-border bg-card shadow-sm mb-4', className), children: [_jsxs("div", { className: "flex flex-1 flex-wrap items-center gap-2.5", children: [onSearchChange && (_jsx("div", { className: "w-full sm:w-64 md:w-72", children: _jsx(Input, { inputSize: "sm", leftIcon: _jsx(Search, { className: "h-4 w-4" }), placeholder: searchPlaceholder, value: searchValue, onChange: (e) => onSearchChange(e.target.value), isClearable: true, onClear: () => onSearchChange('') }) })), children, activeFilterCount > 0 && onResetFilters && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onResetFilters, className: "text-xs text-muted-foreground hover:text-foreground h-8 px-2", children: [_jsx(RotateCcw, { className: "mr-1.5 h-3 w-3" }), "X\u00F3a b\u1ED9 l\u1ECDc (", activeFilterCount, ")"] }))] }), actions && (_jsx("div", { className: "flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/60", children: actions }))] }));
};
FilterBar.displayName = 'FilterBar';
