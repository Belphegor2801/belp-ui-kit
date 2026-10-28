import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { Moon, Sun, LayoutGrid, Layers, Component, Database, Download, Plus, MoreHorizontal, DollarSign, Users, CreditCard, Activity, Trash2, Edit, ExternalLink, Search, Sparkles, } from 'lucide-react';
import { Button, Input, Textarea, Checkbox, RadioGroup, RadioGroupItem, Switch, TypographyHeading, TypographyText, Code, Kbd, Badge, Avatar, Divider, Spinner, Card, CardHeader, CardTitle, CardDescription, CardContent, HStack, VStack, } from '@/components/primitives';
import { FormField, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Tooltip, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, Popover, PopoverTrigger, PopoverContent, Alert, AlertTitle, AlertDescription, Skeleton, useToast, } from '@/components/composite';
import { DataTable, Pagination, FilterBar, MetricCard, Tabs, TabsList, TabsTrigger, TabsContent, } from '@/components/data';
const INITIAL_TRANSACTIONS = [
    {
        id: 'TXN-9021',
        customer: { name: 'Nguyễn Văn An', email: 'an.nguyen@example.com' },
        amount: 14500000,
        status: 'completed',
        date: '2026-10-28 10:24',
        channel: 'Chuyển khoản QR',
    },
    {
        id: 'TXN-9022',
        customer: { name: 'Trần Thị Mai', email: 'mai.tran@fintech.vn' },
        amount: 3200000,
        status: 'processing',
        date: '2026-10-28 09:15',
        channel: 'Thẻ tín dụng Visa',
    },
    {
        id: 'TXN-9023',
        customer: { name: 'Lê Hoàng Nam', email: 'nam.le@enterprise.org' },
        amount: 48900000,
        status: 'completed',
        date: '2026-10-27 16:40',
        channel: 'Cổng thanh toán Stripe',
    },
    {
        id: 'TXN-9024',
        customer: { name: 'Phạm Thu Hương', email: 'huong.pt@domain.com' },
        amount: 850000,
        status: 'failed',
        date: '2026-10-27 14:12',
        channel: 'Ví MoMo',
    },
    {
        id: 'TXN-9025',
        customer: { name: 'Vũ Quốc Bảo', email: 'bao.vu@saascorp.io' },
        amount: 19200000,
        status: 'completed',
        date: '2026-10-27 11:05',
        channel: 'Chuyển khoản QR',
    },
    {
        id: 'TXN-9026',
        customer: { name: 'Đặng Thanh Thảo', email: 'thao.dang@techviet.com' },
        amount: 5400000,
        status: 'refunded',
        date: '2026-10-26 15:30',
        channel: 'Thẻ nội địa NAPAS',
    },
    {
        id: 'TXN-9027',
        customer: { name: 'Bùi Minh Đức', email: 'duc.bui@logistics.vn' },
        amount: 67000000,
        status: 'completed',
        date: '2026-10-26 08:50',
        channel: 'Chuyển khoản QR',
    },
    {
        id: 'TXN-9028',
        customer: { name: 'Hoàng Kim Yến', email: 'yen.hoang@designhub.co' },
        amount: 2750000,
        status: 'processing',
        date: '2026-10-25 18:20',
        channel: 'Ví VNPay',
    },
];
export default function App() {
    const [isDark, setIsDark] = useState(() => {
        return (localStorage.getItem('belp_theme') === 'dark' ||
            window.matchMedia('(prefers-color-scheme: dark)').matches);
    });
    const toast = useToast();
    // Dark Mode Toggle
    const toggleTheme = () => {
        setIsDark((prev) => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('belp_theme', 'dark');
            }
            else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('belp_theme', 'light');
            }
            return next;
        });
    };
    React.useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);
    // Data Table & Filter State
    const [transactions] = useState(INITIAL_TRANSACTIONS);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortColumn, setSortColumn] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [selectedRowIds, setSelectedRowIds] = useState(new Set());
    const [tableDensity, setTableDensity] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [isTableLoading, setIsTableLoading] = useState(false);
    // Form Field Simulation State
    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    // Filtered & Sorted Data
    const filteredData = useMemo(() => {
        let result = [...transactions];
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((item) => item.id.toLowerCase().includes(q) ||
                item.customer.name.toLowerCase().includes(q) ||
                item.customer.email.toLowerCase().includes(q) ||
                item.channel.toLowerCase().includes(q));
        }
        if (statusFilter !== 'all') {
            result = result.filter((item) => item.status === statusFilter);
        }
        // Sort
        result.sort((a, b) => {
            let valA = a[sortColumn] || '';
            let valB = b[sortColumn] || '';
            if (sortColumn === 'customer') {
                valA = a.customer.name;
                valB = b.customer.name;
            }
            if (valA < valB)
                return sortDirection === 'asc' ? -1 : 1;
            if (valA > valB)
                return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        return result;
    }, [transactions, searchQuery, statusFilter, sortColumn, sortDirection]);
    // Paginated Data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredData.slice(startIndex, startIndex + pageSize);
    }, [filteredData, currentPage, pageSize]);
    const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
    const handleSort = (columnKey) => {
        if (sortColumn === columnKey) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        }
        else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };
    const handleSimulateLoad = () => {
        setIsTableLoading(true);
        setTimeout(() => {
            setIsTableLoading(false);
            toast.success('Đã làm mới dữ liệu!', 'Bảng giao dịch đã được đồng bộ hóa tức thì.');
        }, 800);
    };
    // Table Columns Definition
    const columns = [
        {
            key: 'id',
            header: 'Mã GD',
            sortable: true,
            width: '120px',
            accessor: (row) => _jsx(Code, { children: row.id }),
        },
        {
            key: 'customer',
            header: 'Khách hàng',
            sortable: true,
            accessor: (row) => (_jsxs(HStack, { gap: 3, children: [_jsx(Avatar, { alt: row.customer.name, size: "sm", status: "online" }), _jsxs("div", { className: "grid leading-tight", children: [_jsx("span", { className: "font-medium text-foreground", children: row.customer.name }), _jsx("span", { className: "text-xs text-muted-foreground", children: row.customer.email })] })] })),
        },
        {
            key: 'amount',
            header: 'Số tiền',
            sortable: true,
            align: 'right',
            accessor: (row) => (_jsx("span", { className: "font-semibold tabular-nums text-foreground", children: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.amount) })),
        },
        {
            key: 'status',
            header: 'Trạng thái',
            sortable: true,
            align: 'center',
            accessor: (row) => {
                const variantMap = {
                    completed: 'success',
                    processing: 'warning',
                    failed: 'destructive',
                    refunded: 'info',
                };
                const labelMap = {
                    completed: 'Thành công',
                    processing: 'Đang xử lý',
                    failed: 'Thất bại',
                    refunded: 'Hoàn tiền',
                };
                return (_jsx(Badge, { variant: variantMap[row.status], withDot: true, size: "sm", children: labelMap[row.status] }));
            },
        },
        {
            key: 'channel',
            header: 'Kênh thanh toán',
            accessor: (row) => (_jsx("span", { className: "text-xs text-muted-foreground", children: row.channel })),
        },
        {
            key: 'date',
            header: 'Thời gian',
            sortable: true,
            width: '150px',
            accessor: (row) => (_jsx("span", { className: "text-xs text-muted-foreground tabular-nums", children: row.date })),
        },
        {
            key: 'actions',
            header: 'Thao tác',
            align: 'right',
            width: '80px',
            accessor: (row) => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon-sm", "aria-label": "T\u00F9y ch\u1ECDn", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "H\u00E0nh \u0111\u1ED9ng" }), _jsxs(DropdownMenuItem, { onClick: () => toast.info('Xem chi tiết', `Giao dịch ${row.id}`), children: [_jsx(ExternalLink, { className: "mr-2 h-3.5 w-3.5" }), "Xem h\u00F3a \u0111\u01A1n"] }), _jsxs(DropdownMenuItem, { onClick: () => toast.info('Chỉnh sửa', `Cập nhật ${row.id}`), children: [_jsx(Edit, { className: "mr-2 h-3.5 w-3.5" }), "S\u1EEDa ghi ch\u00FA"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { destructive: true, onClick: () => toast.error('Đã hủy giao dịch', `Giao dịch ${row.id} đã bị hủy.`), children: [_jsx(Trash2, { className: "mr-2 h-3.5 w-3.5" }), "H\u1EE7y giao d\u1ECBch"] })] })] })),
        },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground transition-colors duration-200", children: [_jsx("header", { className: "sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-md shadow-primary/20", children: _jsx(Sparkles, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-bold text-lg tracking-tight", children: "Belp UI Kit" }), _jsx(Badge, { variant: "default", size: "sm", children: "v0.1.0" })] }), _jsx("p", { className: "text-[11px] text-muted-foreground hidden sm:block", children: "Design System & Data-Dense Component Framework" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Tooltip, { content: isDark ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối', children: _jsx(Button, { variant: "outline", size: "icon", onClick: toggleTheme, children: isDark ? _jsx(Sun, { className: "h-4 w-4 text-amber-400" }) : _jsx(Moon, { className: "h-4 w-4" }) }) }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "solid", size: "sm", leftIcon: _jsx(Plus, { className: "h-4 w-4" }), children: "T\u1EA1o b\u1EA3n ghi m\u1EDBi" }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Th\u00EAm m\u1EDBi b\u1EA3n ghi giao d\u1ECBch" }), _jsx(DialogDescription, { children: "Nh\u1EADp th\u00F4ng tin giao d\u1ECBch \u0111\u1EC3 hi\u1EC3n th\u1ECB tr\u00EAn h\u1EC7 th\u1ED1ng. D\u1EEF li\u1EC7u s\u1EBD \u0111\u01B0\u1EE3c x\u00E1c th\u1EF1c t\u1EF1 \u0111\u1ED9ng." })] }), _jsxs("div", { className: "grid gap-3.5 py-2", children: [_jsx(FormField, { label: "T\u00EAn kh\u00E1ch h\u00E0ng", required: true, error: formSubmitted && !formName ? 'Vui lòng nhập họ và tên' : undefined, children: _jsx(Input, { placeholder: "V\u00ED d\u1EE5: Nguy\u1EC5n V\u0103n A", value: formName, onChange: (e) => setFormName(e.target.value) }) }), _jsx(FormField, { label: "\u0110\u1ECBa ch\u1EC9 Email", required: true, hint: "H\u1EC7 th\u1ED1ng g\u1EEDi bi\u00EAn nh\u1EADn thanh to\u00E1n qua email n\u00E0y", error: formSubmitted && !formEmail
                                                                ? 'Vui lòng nhập địa chỉ email hợp lệ'
                                                                : undefined, children: _jsx(Input, { type: "email", placeholder: "name@company.com", value: formEmail, onChange: (e) => setFormEmail(e.target.value) }) }), _jsx(FormField, { label: "Ghi ch\u00FA n\u1ED9i b\u1ED9", children: _jsx(Textarea, { placeholder: "Ghi ch\u00FA th\u00EAm n\u1EBFu c\u1EA7n...", showCount: true, maxLength: 200 }) })] }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "H\u1EE7y b\u1ECF" }) }), _jsx(Button, { onClick: () => {
                                                                setFormSubmitted(true);
                                                                if (formName && formEmail) {
                                                                    toast.success('Tạo thành công!', `Đã tạo giao dịch cho ${formName}`);
                                                                    setFormName('');
                                                                    setFormEmail('');
                                                                    setFormSubmitted(false);
                                                                }
                                                            }, children: "X\u00E1c nh\u1EADn t\u1EA1o" })] })] })] })] })] }) }), _jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8", children: [_jsxs("section", { className: "space-y-2", children: [_jsx(TypographyHeading, { level: "h1", children: "Th\u01B0 vi\u1EC7n UI Kit \u0111\u1ED9c l\u1EADp & nh\u1EA5t qu\u00E1n" }), _jsx(TypographyText, { variant: "lead", children: "H\u1EC7 th\u1ED1ng Design Tokens qu\u1EA3n l\u00FD t\u1EADp trung qua CSS Variables, Primitives t\u01B0\u01A1ng th\u00EDch 100% WAI-ARIA, v\u00E0 nh\u00F3m Data-Dense Components chuy\u00EAn bi\u1EC7t cho qu\u1EA3n l\u00FD d\u1EEF li\u1EC7u l\u1EDBn." })] }), _jsxs("section", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(MetricCard, { title: "T\u1ED5ng doanh thu", value: "172.540.000 \u20AB", icon: _jsx(DollarSign, { className: "h-5 w-5" }), change: 18.4, changePeriod: "so v\u1EDBi th\u00E1ng tr\u01B0\u1EDBc" }), _jsx(MetricCard, { title: "Kh\u00E1ch h\u00E0ng t\u00EDch c\u1EF1c", value: "2.845", icon: _jsx(Users, { className: "h-5 w-5" }), change: 12.1, changePeriod: "so v\u1EDBi tu\u1EA7n tr\u01B0\u1EDBc" }), _jsx(MetricCard, { title: "T\u1EF7 l\u1EC7 thanh to\u00E1n th\u00E0nh c\u00F4ng", value: "98.2%", icon: _jsx(CreditCard, { className: "h-5 w-5" }), change: 0.8, changePeriod: "so v\u1EDBi th\u00E1ng tr\u01B0\u1EDBc" }), _jsx(MetricCard, { title: "T\u1EF7 l\u1EC7 h\u1EE7y giao d\u1ECBch", value: "1.4%", icon: _jsx(Activity, { className: "h-5 w-5" }), change: -0.6, changePeriod: "gi\u1EA3m 0.6% (T\u1ED1t)", invertTrendColor: true })] }), _jsxs(Tabs, { defaultValue: "data-views", className: "w-full", children: [_jsxs(TabsList, { variant: "pill", className: "w-full sm:w-auto grid grid-cols-4 max-w-xl", children: [_jsxs(TabsTrigger, { value: "data-views", className: "flex items-center gap-1.5", children: [_jsx(Database, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "B\u1EA3ng D\u1EEF li\u1EC7u" })] }), _jsxs(TabsTrigger, { value: "primitives", className: "flex items-center gap-1.5", children: [_jsx(Component, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "\u0110\u1EE3t 1: Primitives" })] }), _jsxs(TabsTrigger, { value: "composite", className: "flex items-center gap-1.5", children: [_jsx(Layers, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "\u0110\u1EE3t 2: Composite" })] }), _jsxs(TabsTrigger, { value: "tokens", className: "flex items-center gap-1.5", children: [_jsx(LayoutGrid, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "T\u1EA7ng 0: Tokens" })] })] }), _jsx(TabsContent, { value: "data-views", className: "space-y-4 pt-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "B\u1EA3ng Qu\u1EA3n l\u00FD Giao d\u1ECBch T\u00E0i ch\u00EDnh" }), _jsx(CardDescription, { children: "Minh h\u1ECDa DataTable h\u1ED7 tr\u1EE3 s\u1EAFp x\u1EBFp c\u1ED9t, ch\u1ECDn t\u1EEBng d\u00F2ng / t\u1EA5t c\u1EA3, \u0111\u1ED5i m\u1EADt \u0111\u1ED9 hi\u1EC3n th\u1ECB (density) v\u00E0 ph\u00E2n trang." })] }), _jsxs(HStack, { gap: 2, children: [selectedRowIds.size > 0 && (_jsxs(Badge, { variant: "default", size: "md", children: ["\u0110\u00E3 ch\u1ECDn ", selectedRowIds.size, " d\u00F2ng"] })), _jsxs(HStack, { gap: 1, className: "bg-muted p-1 rounded-md text-xs", children: [_jsx(Button, { variant: tableDensity === 'compact' ? 'solid' : 'ghost', size: "sm", className: "h-7 text-xs px-2", onClick: () => setTableDensity('compact'), children: "Nh\u1ECF g\u1ECDn" }), _jsx(Button, { variant: tableDensity === 'default' ? 'solid' : 'ghost', size: "sm", className: "h-7 text-xs px-2", onClick: () => setTableDensity('default'), children: "Chu\u1EA9n" }), _jsx(Button, { variant: tableDensity === 'relaxed' ? 'solid' : 'ghost', size: "sm", className: "h-7 text-xs px-2", onClick: () => setTableDensity('relaxed'), children: "R\u1ED9ng r\u00E3i" })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleSimulateLoad, isLoading: isTableLoading, children: "T\u1EA3i l\u1EA1i" })] })] }), _jsxs(CardContent, { children: [_jsx(FilterBar, { searchValue: searchQuery, onSearchChange: setSearchQuery, searchPlaceholder: "T\u00ECm theo m\u00E3 GD, t\u00EAn kh\u00E1ch h\u00E0ng, email...", activeFilterCount: (searchQuery ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0), onResetFilters: () => {
                                                        setSearchQuery('');
                                                        setStatusFilter('all');
                                                    }, actions: _jsx(Button, { variant: "outline", size: "sm", leftIcon: _jsx(Download, { className: "h-4 w-4" }), onClick: () => toast.success('Xuất file thành công', `Đã xuất ${filteredData.length} bản ghi ra file Excel.`), children: "Xu\u1EA5t Excel" }), children: _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "text-xs text-muted-foreground", children: "Tr\u1EA1ng th\u00E1i:" }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "h-8 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", children: [_jsx("option", { value: "all", children: "T\u1EA5t c\u1EA3 tr\u1EA1ng th\u00E1i" }), _jsx("option", { value: "completed", children: "Th\u00E0nh c\u00F4ng" }), _jsx("option", { value: "processing", children: "\u0110ang x\u1EED l\u00FD" }), _jsx("option", { value: "failed", children: "Th\u1EA5t b\u1EA1i" }), _jsx("option", { value: "refunded", children: "Ho\u00E0n ti\u1EC1n" })] })] }) }), _jsx(DataTable, { data: paginatedData, columns: columns, rowKey: (row) => row.id, isLoading: isTableLoading, density: tableDensity, sortColumn: sortColumn, sortDirection: sortDirection, onSort: handleSort, selectable: true, selectedKeys: selectedRowIds, onSelectionChange: setSelectedRowIds, onRowClick: (row) => toast.info(`Chọn giao dịch ${row.id}`, `Khách hàng: ${row.customer.name}`) }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, totalItems: filteredData.length, pageSize: pageSize, onPageChange: setCurrentPage, onPageSizeChange: (newSize) => {
                                                        setPageSize(newSize);
                                                        setCurrentPage(1);
                                                    } })] })] }) }), _jsxs(TabsContent, { value: "primitives", className: "space-y-6 pt-4", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Button & Tr\u1EA1ng th\u00E1i h\u00E0nh \u0111\u1ED9ng" }), _jsx(CardDescription, { children: "Tu\u00E2n th\u1EE7 nguy\u00EAn t\u1EAFc 1: \u0111\u1EA7y \u0111\u1EE7 tr\u1EA1ng th\u00E1i default, hover, focus, active, disabled, loading." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx(Button, { variant: "solid", children: "Solid (Primary)" }), _jsx(Button, { variant: "secondary", children: "Secondary" }), _jsx(Button, { variant: "outline", children: "Outline" }), _jsx(Button, { variant: "ghost", children: "Ghost" }), _jsx(Button, { variant: "destructive", children: "Destructive" }), _jsx(Button, { variant: "link", children: "Link Button" }), _jsx(Button, { variant: "solid", isLoading: true, children: "\u0110ang l\u01B0u..." }), _jsx(Button, { variant: "solid", disabled: true, children: "V\u00F4 hi\u1EC7u h\u00F3a" })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 pt-2", children: [_jsx(Button, { size: "sm", children: "Size Small (sm)" }), _jsx(Button, { size: "md", children: "Size Medium (md)" }), _jsx(Button, { size: "lg", children: "Size Large (lg)" }), _jsxs("div", { className: "flex items-center gap-2 pl-4 border-l border-border/60", children: [_jsx("span", { className: "text-xs text-muted-foreground", children: "Spinners:" }), _jsx(Spinner, { size: "sm" }), _jsx(Spinner, { size: "md" }), _jsx(Spinner, { size: "lg" })] })] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Nh\u1EADp li\u1EC7u & \u0110i\u1EC1u khi\u1EC3n nh\u1ECB ph\u00E2n" }), _jsx(CardDescription, { children: "Input c\u00F3 icon prefix/suffix, clear button, password visibility toggle; Checkbox, Switch, Radio." })] }), _jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Input, { placeholder: "Input k\u00E8m icon t\u00ECm ki\u1EBFm v\u00E0 n\u00FAt x\u00F3a...", leftIcon: _jsx(Search, { className: "h-4 w-4" }), isClearable: true, defaultValue: "T\u1EEB kh\u00F3a t\u00ECm ki\u1EBFm m\u1EABu" }), _jsx(Input, { type: "password", placeholder: "Nh\u1EADp m\u1EADt kh\u1EA9u an to\u00E0n...", showPasswordToggle: true, defaultValue: "SecurePassword123" }), _jsx(Input, { placeholder: "Input tr\u1EA1ng th\u00E1i l\u1ED7i (hasError)...", hasError: true, defaultValue: "D\u1EEF li\u1EC7u kh\u00F4ng \u0111\u00FAng \u0111\u1ECBnh d\u1EA1ng" }), _jsx(Textarea, { placeholder: "Nh\u1EADp ghi ch\u00FA \u0111a d\u00F2ng k\u00E8m b\u1ED9 \u0111\u1EBFm k\u00FD t\u1EF1...", showCount: true, maxLength: 100, defaultValue: "Giao di\u1EC7n thi\u1EBFt k\u1EBF theo chu\u1EA9n SOLID v\u00E0 Clean Code." })] }), _jsxs("div", { className: "space-y-4 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-border/60 pt-4 md:pt-0", children: [_jsxs(VStack, { gap: 3, children: [_jsx(Checkbox, { label: "K\u00EDch ho\u1EA1t th\u00F4ng b\u00E1o h\u1EC7 th\u1ED1ng", description: "Nh\u1EADn email khi c\u00F3 giao d\u1ECBch ph\u00E1t sinh tr\u00EAn t\u00E0i kho\u1EA3n.", defaultChecked: true }), _jsx(Checkbox, { label: "Ch\u00EDnh s\u00E1ch b\u1EA3o m\u1EADt GDPR", description: "\u0110\u1ED3ng \u00FD x\u1EED l\u00FD d\u1EEF li\u1EC7u theo ti\u00EAu chu\u1EA9n qu\u1ED1c t\u1EBF." })] }), _jsx(Divider, {}), _jsx(Switch, { label: "Ch\u1EBF \u0111\u1ED9 b\u1EA3o v\u1EC7 2 l\u1EDBp (2FA)", description: "Y\u00EAu c\u1EA7u m\u00E3 OTP khi \u0111\u0103ng nh\u1EADp t\u1EEB thi\u1EBFt b\u1ECB l\u1EA1.", defaultChecked: true }), _jsx(Divider, {}), _jsxs(RadioGroup, { defaultValue: "daily", children: [_jsx(RadioGroupItem, { value: "realtime", label: "Th\u1EDDi gian th\u1EF1c (Real-time)" }), _jsx(RadioGroupItem, { value: "daily", label: "T\u1ED5ng k\u1EBFt h\u00E0ng ng\u00E0y (Daily summary)" }), _jsx(RadioGroupItem, { value: "weekly", label: "B\u00E1o c\u00E1o tu\u1EA7n (Weekly digest)" })] })] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Hi\u1EC3n th\u1ECB: Badges, Avatars & Typography" }), _jsx(CardDescription, { children: "C\u00E1c th\u00E0nh ph\u1EA7n bi\u1EC3u di\u1EC5n tr\u1EA1ng th\u00E1i v\u00E0 th\u00F4ng tin \u0111\u1ECBnh danh d\u1EEF li\u1EC7u." })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [_jsx(Badge, { variant: "default", withDot: true, children: "Primary Tag" }), _jsx(Badge, { variant: "success", withDot: true, children: "Th\u00E0nh c\u00F4ng" }), _jsx(Badge, { variant: "warning", withDot: true, children: "C\u1EA3nh b\u00E1o" }), _jsx(Badge, { variant: "destructive", withDot: true, children: "L\u1ED7i nghi\u00EAm tr\u1ECDng" }), _jsx(Badge, { variant: "info", withDot: true, children: "Th\u00F4ng tin" }), _jsx(Badge, { variant: "outline", children: "Vi\u1EC1n m\u1EA3nh" }), _jsx(Badge, { variant: "secondary", onRemove: () => toast.info('Đã xóa nhãn'), children: "Nh\u00E3n c\u00F3 n\u00FAt x\u00F3a" })] }), _jsxs(HStack, { gap: 4, align: "center", children: [_jsx(Avatar, { fallback: "NV", size: "sm", status: "online" }), _jsx(Avatar, { fallback: "TM", size: "md", status: "busy" }), _jsx(Avatar, { fallback: "HN", size: "lg", status: "away" }), _jsx(Avatar, { fallback: "AD", size: "xl", status: "online" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Avatar h\u1ED7 tr\u1EE3 \u0111a k\u00EDch c\u1EE1 (sm, md, lg, xl) k\u00E8m status dot badge." })] }), _jsxs(HStack, { gap: 2, align: "center", children: [_jsx(TypographyText, { variant: "body", children: "Nh\u1EA5n" }), _jsx(Kbd, { children: "\u2318" }), _jsx(Kbd, { children: "K" }), _jsx(TypographyText, { variant: "body", children: "\u0111\u1EC3 m\u1EDF b\u1EA3ng t\u00ECm ki\u1EBFm nhanh. M\u00E3 h\u00E0m:" }), _jsx(Code, { children: "useDataTable()" })] })] })] })] }), _jsxs(TabsContent, { value: "composite", className: "space-y-6 pt-4", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "FormField Wrapper & WAI-ARIA Automatic Binding" }), _jsx(CardDescription, { children: "T\u1EF1 \u0111\u1ED9ng \u0111\u1ED3ng b\u1ED9 id, label, aria-describedby, helper text v\u00E0 th\u00F4ng \u0111i\u1EC7p l\u1ED7i." })] }), _jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(FormField, { label: "T\u00EAn mi\u1EC1n \u1EE9ng d\u1EE5ng", required: true, hint: "Ch\u1EC9 nh\u1EADp t\u00EAn mi\u1EC1n ph\u1EE5, v\u00ED d\u1EE5: my-app.domain.vn", children: _jsx(Input, { placeholder: "my-app", rightIcon: _jsx("span", { className: "text-xs text-muted-foreground", children: ".domain.vn" }) }) }), _jsx(FormField, { label: "H\u1EA1n m\u1EE9c giao d\u1ECBch ng\u00E0y", required: true, error: "H\u1EA1n m\u1EE9c t\u1ED1i \u0111a cho ph\u00E9p l\u00E0 500.000.000 \u20AB", children: _jsx(Input, { defaultValue: "900000000" }) })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "L\u1EDBp Overlay & Ph\u1EA3n h\u1ED3i (Feedback)" }), _jsx(CardDescription, { children: "Modal dialog, Tooltip, Popover, Alert v\u00E0 h\u1EC7 th\u1ED1ng th\u00F4ng b\u00E1o Toast stackable." })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx(Tooltip, { content: "Tooltip gi\u1EA3i th\u00EDch chi ti\u1EBFt ch\u1EE9c n\u0103ng", children: _jsx(Button, { variant: "outline", children: "R\u00EA chu\u1ED9t xem Tooltip" }) }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "M\u1EDF Popover t\u01B0\u01A1ng t\u00E1c" }) }), _jsx(PopoverContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold text-sm", children: "C\u00E0i \u0111\u1EB7t b\u1ED9 l\u1ECDc nhanh" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "B\u1EA1n c\u00F3 th\u1EC3 t\u00F9y ch\u1EC9nh c\u00E1c ch\u1EC9 s\u1ED1 hi\u1EC3n th\u1ECB tr\u00EAn dashboard." }), _jsx(Button, { size: "sm", className: "w-full mt-2", children: "\u00C1p d\u1EE5ng" })] }) })] }), _jsx(Button, { variant: "solid", onClick: () => toast.success('Thao tác thành công', 'Dữ liệu đã được lưu trữ vĩnh viễn.'), children: "K\u00EDch ho\u1EA1t Toast Success" }), _jsx(Button, { variant: "destructive", onClick: () => toast.error('Lỗi kết nối', 'Không thể đồng bộ với máy chủ thanh toán.'), children: "K\u00EDch ho\u1EA1t Toast Error" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs(Alert, { variant: "info", children: [_jsx(AlertTitle, { children: "B\u1EA3o tr\u00EC h\u1EC7 th\u1ED1ng \u0111\u1ECBnh k\u1EF3" }), _jsx(AlertDescription, { children: "H\u1EC7 th\u1ED1ng s\u1EBD c\u1EADp nh\u1EADt phi\u00EAn b\u1EA3n 0.2 v\u00E0o 02:00 s\u00E1ng ch\u1EE7 nh\u1EADt." })] }), _jsxs(Alert, { variant: "success", children: [_jsx(AlertTitle, { children: "B\u1EA3n sao l\u01B0u \u0111\u00E3 ho\u00E0n t\u1EA5t" }), _jsx(AlertDescription, { children: "To\u00E0n b\u1ED9 c\u01A1 s\u1EDF d\u1EEF li\u1EC7u \u0111\u00E3 \u0111\u01B0\u1EE3c backup an to\u00E0n l\u00EAn AWS S3." })] })] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Skeleton Shimmer Effect" }), _jsx(CardDescription, { children: "Hi\u1EC3n th\u1ECB khung h\u00ECnh t\u1EA3i trang m\u01B0\u1EE3t m\u00E0, lo\u1EA1i b\u1ECF hi\u1EC7n t\u01B0\u1EE3ng nh\u1EA3y layout (CLS)." })] }), _jsx(CardContent, { children: _jsxs(HStack, { gap: 4, align: "center", children: [_jsx(Skeleton, { className: "h-12 w-12 rounded-full" }), _jsxs("div", { className: "space-y-2 flex-1", children: [_jsx(Skeleton, { className: "h-4 w-1/3" }), _jsx(Skeleton, { className: "h-3 w-1/2" })] })] }) })] })] }), _jsx(TabsContent, { value: "tokens", className: "space-y-6 pt-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "B\u1EA3ng m\u00E3 m\u00E0u Design Tokens (CSS Variables)" }), _jsx(CardDescription, { children: "To\u00E0n b\u1ED9 giao di\u1EC7n \u0111\u01B0\u1EE3c \u0111i\u1EC1u khi\u1EC3n qua c\u00E1c bi\u1EBFn CSS t\u1EA1i `src/tokens/colors.css`." })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-semibold mb-3", children: "M\u00E0u Th\u01B0\u01A1ng hi\u1EC7u & Trung t\u00EDnh (Brand & Neutral)" }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs", children: [_jsx("div", { className: "rounded-lg p-3 border border-border bg-primary text-primary-foreground font-medium", children: "Primary" }), _jsx("div", { className: "rounded-lg p-3 border border-border bg-secondary text-secondary-foreground font-medium", children: "Secondary" }), _jsx("div", { className: "rounded-lg p-3 border border-border bg-muted text-muted-foreground font-medium", children: "Muted" }), _jsx("div", { className: "rounded-lg p-3 border border-border bg-accent text-accent-foreground font-medium", children: "Accent" }), _jsx("div", { className: "rounded-lg p-3 border border-border bg-card text-card-foreground font-medium", children: "Card / Surface" }), _jsx("div", { className: "rounded-lg p-3 border border-border bg-background text-foreground font-medium", children: "Background" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-semibold mb-3", children: "M\u00E0u Ng\u1EEF ngh\u0129a (Semantic Feedback)" }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs", children: [_jsx("div", { className: "rounded-lg p-3 border border-emerald-500/30 bg-emerald-500 text-white font-medium", children: "Success (Emerald)" }), _jsx("div", { className: "rounded-lg p-3 border border-amber-500/30 bg-amber-500 text-white font-medium", children: "Warning (Amber)" }), _jsx("div", { className: "rounded-lg p-3 border border-rose-500/30 bg-destructive text-white font-medium", children: "Destructive (Crimson)" }), _jsx("div", { className: "rounded-lg p-3 border border-sky-500/30 bg-sky-500 text-white font-medium", children: "Info (Sky)" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-semibold mb-3", children: "H\u1EC7 th\u1ED1ng Thang \u0111o Spacing & Radius" }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs text-muted-foreground", children: [_jsx("div", { className: "p-3 border border-border rounded-sm bg-muted/40", children: "sm: 4px" }), _jsx("div", { className: "p-3 border border-border rounded-md bg-muted/40", children: "md: 6px" }), _jsx("div", { className: "p-3 border border-border rounded-lg bg-muted/40", children: "lg: 8px (Default)" }), _jsx("div", { className: "p-3 border border-border rounded-xl bg-muted/40", children: "xl: 12px" }), _jsx("div", { className: "p-3 border border-border rounded-full bg-muted/40 px-4", children: "full: 9999px" })] })] })] })] }) })] })] }), _jsxs("footer", { className: "border-t border-border mt-16 py-8 text-center text-xs text-muted-foreground", children: [_jsx("p", { children: "Belp UI Kit \u2014 Thi\u1EBFt k\u1EBF & ki\u1EBFn tr\u00FAc theo ti\u00EAu chu\u1EA9n Clean Code, SOLID v\u00E0 WAI-ARIA." }), _jsx("p", { className: "mt-1", children: "X\u00E2y d\u1EF1ng nh\u1EA5t qu\u00E1n cho c\u00E1c h\u1EC7 th\u1ED1ng qu\u1EA3n tr\u1ECB v\u00E0 d\u1EEF li\u1EC7u ph\u1EE9c t\u1EA1p." })] })] }));
}
