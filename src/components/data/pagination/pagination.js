import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/primitives/button';
import { cn } from '@/utils/cn';
export const Pagination = ({ currentPage, totalPages, totalItems, pageSize = 10, pageSizeOptions = [10, 25, 50, 100], onPageChange, onPageSizeChange, className, showItemCount = true, }) => {
    const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
    const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;
    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++)
                pages.push(i);
        }
        else {
            pages.push(1);
            if (currentPage > 3)
                pages.push('...');
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2)
                pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };
    return (_jsxs("div", { className: cn('flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-2 text-xs text-muted-foreground select-none', className), children: [_jsxs("div", { className: "flex items-center gap-4", children: [showItemCount && totalItems !== undefined && (_jsxs("div", { children: ["Hi\u1EC3n th\u1ECB ", _jsx("span", { className: "font-semibold text-foreground", children: startItem }), " -", ' ', _jsx("span", { className: "font-semibold text-foreground", children: endItem }), " tr\u00EAn", ' ', _jsx("span", { className: "font-semibold text-foreground", children: totalItems }), " b\u1EA3n ghi"] })), onPageSizeChange && (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { children: "D\u00F2ng / trang:" }), _jsx("select", { value: pageSize, onChange: (e) => onPageSizeChange(Number(e.target.value)), className: "h-7 rounded border border-input bg-background px-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", children: pageSizeOptions.map((opt) => (_jsx("option", { value: opt, children: opt }, opt))) })] }))] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Button, { variant: "outline", size: "icon-sm", onClick: () => onPageChange(1), disabled: currentPage <= 1, "aria-label": "Trang \u0111\u1EA7u", children: _jsx(ChevronsLeft, { className: "h-3.5 w-3.5" }) }), _jsx(Button, { variant: "outline", size: "icon-sm", onClick: () => onPageChange(currentPage - 1), disabled: currentPage <= 1, "aria-label": "Trang tr\u01B0\u1EDBc", children: _jsx(ChevronLeft, { className: "h-3.5 w-3.5" }) }), _jsx("div", { className: "flex items-center gap-1 px-1", children: getPageNumbers().map((item, index) => {
                            if (item === '...') {
                                return (_jsx("span", { className: "px-2 py-1 text-muted-foreground", children: "..." }, `ellipsis-${index}`));
                            }
                            const pageNum = item;
                            const isActive = pageNum === currentPage;
                            return (_jsx(Button, { variant: isActive ? 'solid' : 'ghost', size: "icon-sm", onClick: () => onPageChange(pageNum), className: cn('text-xs font-semibold', isActive && 'pointer-events-none'), children: pageNum }, pageNum));
                        }) }), _jsx(Button, { variant: "outline", size: "icon-sm", onClick: () => onPageChange(currentPage + 1), disabled: currentPage >= totalPages, "aria-label": "Trang sau", children: _jsx(ChevronRight, { className: "h-3.5 w-3.5" }) }), _jsx(Button, { variant: "outline", size: "icon-sm", onClick: () => onPageChange(totalPages), disabled: currentPage >= totalPages, "aria-label": "Trang cu\u1ED1i", children: _jsx(ChevronsRight, { className: "h-3.5 w-3.5" }) })] })] }));
};
Pagination.displayName = 'Pagination';
