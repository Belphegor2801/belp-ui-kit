import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Checkbox } from '@/components/primitives/checkbox';
import { Skeleton } from '@/components/composite/skeleton';
import { EmptyState } from '@/components/composite/empty-state';
import { cn } from '@/utils/cn';
export function DataTable({ data, columns, rowKey, isLoading = false, density = 'default', stickyHeader = false, striped = false, sortColumn, sortDirection, onSort, selectable = false, selectedKeys = new Set(), onSelectionChange, onRowClick, emptyMessage = 'Không có dữ liệu phù hợp', emptyIcon, className, }) {
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
    const isAllSelected = data.length > 0 && data.every((row, i) => selectedKeys.has(rowKey(row, i)));
    const isSomeSelected = data.some((row, i) => selectedKeys.has(rowKey(row, i))) && !isAllSelected;
    const handleSelectAll = () => {
        if (!onSelectionChange)
            return;
        if (isAllSelected) {
            onSelectionChange(new Set());
        }
        else {
            const allKeys = new Set(data.map((row, i) => rowKey(row, i)));
            onSelectionChange(allKeys);
        }
    };
    const handleSelectRow = (key, e) => {
        e.stopPropagation();
        if (!onSelectionChange)
            return;
        const next = new Set(selectedKeys);
        if (next.has(key)) {
            next.delete(key);
        }
        else {
            next.add(key);
        }
        onSelectionChange(next);
    };
    return (_jsx("div", { className: cn('w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm', className), children: _jsx("div", { className: "w-full overflow-x-auto", children: _jsxs("table", { className: "w-full caption-bottom text-left border-collapse", children: [_jsx("thead", { className: cn('border-b border-border bg-muted/50 text-muted-foreground uppercase font-semibold tracking-wider select-none', stickyHeader && 'sticky top-0 z-10 backdrop-blur-md bg-muted/80'), children: _jsxs("tr", { children: [selectable && (_jsx("th", { className: cn('w-[44px] text-center', densityHeaderClasses[density]), children: _jsx("div", { className: "flex items-center justify-center", children: _jsx(Checkbox, { checked: isAllSelected ? true : isSomeSelected ? 'indeterminate' : false, onCheckedChange: handleSelectAll, "aria-label": "Ch\u1ECDn t\u1EA5t c\u1EA3" }) }) })), columns.map((col) => {
                                    const isSorted = sortColumn === col.key;
                                    return (_jsx("th", { style: { width: col.width }, className: cn(densityHeaderClasses[density], col.align === 'center' && 'text-center', col.align === 'right' && 'text-right', col.sortable && 'cursor-pointer hover:bg-muted transition-colors', col.className), onClick: () => col.sortable && onSort?.(col.key), children: _jsxs("div", { className: cn('inline-flex items-center gap-1.5', col.align === 'center' && 'justify-center', col.align === 'right' && 'justify-end'), children: [_jsx("span", { children: col.header }), col.sortable && (_jsx("span", { className: "text-muted-foreground/70", children: isSorted ? (sortDirection === 'asc' ? (_jsx(ArrowUp, { className: "h-3.5 w-3.5 text-primary" })) : (_jsx(ArrowDown, { className: "h-3.5 w-3.5 text-primary" }))) : (_jsx(ArrowUpDown, { className: "h-3.5 w-3.5 opacity-40 hover:opacity-100" })) }))] }) }, col.key));
                                })] }) }), _jsx("tbody", { className: "divide-y divide-border/60", children: isLoading ? (
                        // Loading Skeleton Rows
                        Array.from({ length: 5 }).map((_, rIdx) => (_jsxs("tr", { className: "animate-pulse", children: [selectable && (_jsx("td", { className: cn('text-center', densityCellClasses[density]), children: _jsx(Skeleton, { className: "h-4 w-4 mx-auto rounded" }) })), columns.map((col) => (_jsx("td", { className: densityCellClasses[density], children: _jsx(Skeleton, { className: "h-4 w-full max-w-[80%] rounded" }) }, col.key)))] }, `loading-row-${rIdx}`)))) : data.length === 0 ? (
                        // Empty State
                        _jsx("tr", { children: _jsx("td", { colSpan: columns.length + (selectable ? 1 : 0), className: "py-12 text-center", children: _jsx(EmptyState, { icon: emptyIcon, title: emptyMessage, description: "Th\u1EED \u0111i\u1EC1u ch\u1EC9nh l\u1EA1i b\u1ED9 l\u1ECDc ho\u1EB7c t\u00ECm ki\u1EBFm t\u1EEB kh\u00F3a kh\u00E1c.", className: "border-none shadow-none min-h-[160px]" }) }) })) : (
                        // Data Rows
                        data.map((row, rIdx) => {
                            const id = rowKey(row, rIdx);
                            const isSelected = selectedKeys.has(id);
                            return (_jsxs("tr", { onClick: () => onRowClick?.(row), className: cn('transition-colors hover:bg-muted/40 cursor-default', isSelected && 'bg-primary/5 hover:bg-primary/10', striped && rIdx % 2 === 1 && !isSelected && 'bg-muted/15', onRowClick && 'cursor-pointer'), children: [selectable && (_jsx("td", { className: cn('text-center', densityCellClasses[density]), onClick: (e) => handleSelectRow(id, e), children: _jsx("div", { className: "flex items-center justify-center", children: _jsx(Checkbox, { checked: isSelected, onCheckedChange: () => { }, "aria-label": `Chọn dòng ${id}` }) }) })), columns.map((col) => {
                                        const value = col.accessor
                                            ? col.accessor(row, rIdx)
                                            : row[col.key];
                                        return (_jsx("td", { className: cn(densityCellClasses[density], col.align === 'center' && 'text-center', col.align === 'right' && 'text-right', col.className), children: value }, col.key));
                                    })] }, id));
                        })) })] }) }) }));
}
DataTable.displayName = 'DataTable';
