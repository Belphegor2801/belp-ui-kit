import React, { useState, useMemo } from 'react';
import {
  Moon,
  Sun,
  LayoutGrid,
  Layers,
  Component,
  Database,
  Download,
  Plus,
  MoreHorizontal,
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  Sparkles,
} from 'lucide-react';

import {
  Button,
  Input,
  Textarea,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  TypographyHeading,
  TypographyText,
  Code,
  Kbd,
  Badge,
  Avatar,
  Divider,
  Spinner,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  HStack,
  VStack,
} from '@/components/primitives';

import {
  FormField,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Tooltip,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Alert,
  AlertTitle,
  AlertDescription,
  Skeleton,
  useToast,
} from '@/components/composite';

import {
  DataTable,
  ColumnDef,
  TableDensity,
  Pagination,
  FilterBar,
  MetricCard,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/data';

// Mock Transaction Data Item
interface Transaction {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  amount: number;
  status: 'completed' | 'processing' | 'failed' | 'refunded';
  date: string;
  channel: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
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
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('belp_theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toast = useToast();

  // Dark Mode Toggle
  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('belp_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('belp_theme', 'light');
      }
      return next;
    });
  };

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  // Data Table & Filter State
  const [transactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortColumn, setSortColumn] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(new Set());
  const [tableDensity, setTableDensity] = useState<TableDensity>('default');
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
      result = result.filter(
        (item) =>
          item.id.toLowerCase().includes(q) ||
          item.customer.name.toLowerCase().includes(q) ||
          item.customer.email.toLowerCase().includes(q) ||
          item.channel.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((item) => item.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let valA: string | number = (a as unknown as Record<string, string | number>)[sortColumn] || '';
      let valB: string | number = (b as unknown as Record<string, string | number>)[sortColumn] || '';

      if (sortColumn === 'customer') {
        valA = a.customer.name;
        valB = b.customer.name;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
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

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
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
  const columns: ColumnDef<Transaction>[] = [
    {
      key: 'id',
      header: 'Mã GD',
      sortable: true,
      width: '120px',
      accessor: (row) => <Code>{row.id}</Code>,
    },
    {
      key: 'customer',
      header: 'Khách hàng',
      sortable: true,
      accessor: (row) => (
        <HStack gap={3}>
          <Avatar alt={row.customer.name} size="sm" status="online" />
          <div className="grid leading-tight">
            <span className="font-medium text-foreground">{row.customer.name}</span>
            <span className="text-xs text-muted-foreground">{row.customer.email}</span>
          </div>
        </HStack>
      ),
    },
    {
      key: 'amount',
      header: 'Số tiền',
      sortable: true,
      align: 'right',
      accessor: (row) => (
        <span className="font-semibold tabular-nums text-foreground">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
            row.amount
          )}
        </span>
      ),
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
        } as const;

        const labelMap = {
          completed: 'Thành công',
          processing: 'Đang xử lý',
          failed: 'Thất bại',
          refunded: 'Hoàn tiền',
        };

        return (
          <Badge variant={variantMap[row.status]} withDot size="sm">
            {labelMap[row.status]}
          </Badge>
        );
      },
    },
    {
      key: 'channel',
      header: 'Kênh thanh toán',
      accessor: (row) => (
        <span className="text-xs text-muted-foreground">{row.channel}</span>
      ),
    },
    {
      key: 'date',
      header: 'Thời gian',
      sortable: true,
      width: '150px',
      accessor: (row) => (
        <span className="text-xs text-muted-foreground tabular-nums">{row.date}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'right',
      width: '80px',
      accessor: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Tùy chọn">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => toast.info('Xem chi tiết', `Giao dịch ${row.id}`)}>
              <ExternalLink className="mr-2 h-3.5 w-3.5" />
              Xem hóa đơn
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info('Chỉnh sửa', `Cập nhật ${row.id}`)}>
              <Edit className="mr-2 h-3.5 w-3.5" />
              Sửa ghi chú
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              destructive
              onClick={() => toast.error('Đã hủy giao dịch', `Giao dịch ${row.id} đã bị hủy.`)}
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Hủy giao dịch
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-md shadow-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight">Belp UI Kit</span>
                <Badge variant="default" size="sm">v0.1.0</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground hidden sm:block">
                Design System &amp; Data-Dense Component Framework
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip content={isDark ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'}>
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
              </Button>
            </Tooltip>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="solid" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                  Tạo bản ghi mới
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Thêm mới bản ghi giao dịch</DialogTitle>
                  <DialogDescription>
                    Nhập thông tin giao dịch để hiển thị trên hệ thống. Dữ liệu sẽ được xác thực tự động.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3.5 py-2">
                  <FormField
                    label="Tên khách hàng"
                    required
                    error={formSubmitted && !formName ? 'Vui lòng nhập họ và tên' : undefined}
                  >
                    <Input
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </FormField>

                  <FormField
                    label="Địa chỉ Email"
                    required
                    hint="Hệ thống gửi biên nhận thanh toán qua email này"
                    error={
                      formSubmitted && !formEmail
                        ? 'Vui lòng nhập địa chỉ email hợp lệ'
                        : undefined
                    }
                  >
                    <Input
                      type="email"
                      placeholder="name@company.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                    />
                  </FormField>

                  <FormField label="Ghi chú nội bộ">
                    <Textarea placeholder="Ghi chú thêm nếu cần..." showCount maxLength={200} />
                  </FormField>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Hủy bỏ</Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      setFormSubmitted(true);
                      if (formName && formEmail) {
                        toast.success('Tạo thành công!', `Đã tạo giao dịch cho ${formName}`);
                        setFormName('');
                        setFormEmail('');
                        setFormSubmitted(false);
                      }
                    }}
                  >
                    Xác nhận tạo
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <section className="space-y-2">
          <TypographyHeading level="h1">
            Thư viện UI Kit độc lập &amp; nhất quán
          </TypographyHeading>
          <TypographyText variant="lead">
            Hệ thống Design Tokens quản lý tập trung qua CSS Variables, Primitives tương thích 100% WAI-ARIA,
            và nhóm Data-Dense Components chuyên biệt cho quản lý dữ liệu lớn.
          </TypographyText>
        </section>

        {/* Live KPI Metric Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Tổng doanh thu"
            value="172.540.000 ₫"
            icon={<DollarSign className="h-5 w-5" />}
            change={18.4}
            changePeriod="so với tháng trước"
          />
          <MetricCard
            title="Khách hàng tích cực"
            value="2.845"
            icon={<Users className="h-5 w-5" />}
            change={12.1}
            changePeriod="so với tuần trước"
          />
          <MetricCard
            title="Tỷ lệ thanh toán thành công"
            value="98.2%"
            icon={<CreditCard className="h-5 w-5" />}
            change={0.8}
            changePeriod="so với tháng trước"
          />
          <MetricCard
            title="Tỷ lệ hủy giao dịch"
            value="1.4%"
            icon={<Activity className="h-5 w-5" />}
            change={-0.6}
            changePeriod="giảm 0.6% (Tốt)"
            invertTrendColor
          />
        </section>

        {/* Showcase Tabs */}
        <Tabs defaultValue="data-views" className="w-full">
          <TabsList variant="pill" className="w-full sm:w-auto grid grid-cols-4 max-w-xl">
            <TabsTrigger value="data-views" className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5" />
              <span>Bảng Dữ liệu</span>
            </TabsTrigger>
            <TabsTrigger value="primitives" className="flex items-center gap-1.5">
              <Component className="h-3.5 w-3.5" />
              <span>Đợt 1: Primitives</span>
            </TabsTrigger>
            <TabsTrigger value="composite" className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>Đợt 2: Composite</span>
            </TabsTrigger>
            <TabsTrigger value="tokens" className="flex items-center gap-1.5">
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Tầng 0: Tokens</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: DATA-DENSE VIEWS (Live DataTable, FilterBar, Pagination) */}
          <TabsContent value="data-views" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Bảng Quản lý Giao dịch Tài chính</CardTitle>
                  <CardDescription>
                    Minh họa DataTable hỗ trợ sắp xếp cột, chọn từng dòng / tất cả, đổi mật độ hiển thị (density) và phân trang.
                  </CardDescription>
                </div>

                <HStack gap={2}>
                  {selectedRowIds.size > 0 && (
                    <Badge variant="default" size="md">
                      Đã chọn {selectedRowIds.size} dòng
                    </Badge>
                  )}

                  <HStack gap={1} className="bg-muted p-1 rounded-md text-xs">
                    <Button
                      variant={tableDensity === 'compact' ? 'solid' : 'ghost'}
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={() => setTableDensity('compact')}
                    >
                      Nhỏ gọn
                    </Button>
                    <Button
                      variant={tableDensity === 'default' ? 'solid' : 'ghost'}
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={() => setTableDensity('default')}
                    >
                      Chuẩn
                    </Button>
                    <Button
                      variant={tableDensity === 'relaxed' ? 'solid' : 'ghost'}
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={() => setTableDensity('relaxed')}
                    >
                      Rộng rãi
                    </Button>
                  </HStack>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSimulateLoad}
                    isLoading={isTableLoading}
                  >
                    Tải lại
                  </Button>
                </HStack>
              </CardHeader>

              <CardContent>
                {/* Unified FilterBar */}
                <FilterBar
                  searchValue={searchQuery}
                  onSearchChange={setSearchQuery}
                  searchPlaceholder="Tìm theo mã GD, tên khách hàng, email..."
                  activeFilterCount={(searchQuery ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0)}
                  onResetFilters={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  actions={
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Download className="h-4 w-4" />}
                      onClick={() =>
                        toast.success('Xuất file thành công', `Đã xuất ${filteredData.length} bản ghi ra file Excel.`)
                      }
                    >
                      Xuất Excel
                    </Button>
                  }
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">Trạng thái:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="h-8 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="all">Tất cả trạng thái</option>
                      <option value="completed">Thành công</option>
                      <option value="processing">Đang xử lý</option>
                      <option value="failed">Thất bại</option>
                      <option value="refunded">Hoàn tiền</option>
                    </select>
                  </div>
                </FilterBar>

                {/* Main DataTable */}
                <DataTable<Transaction>
                  data={paginatedData}
                  columns={columns}
                  rowKey={(row) => row.id}
                  isLoading={isTableLoading}
                  density={tableDensity}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  selectable
                  selectedKeys={selectedRowIds}
                  onSelectionChange={setSelectedRowIds}
                  onRowClick={(row) =>
                    toast.info(`Chọn giao dịch ${row.id}`, `Khách hàng: ${row.customer.name}`)
                  }
                />

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredData.length}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setCurrentPage(1);
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: PRIMITIVES SHOWCASE */}
          <TabsContent value="primitives" className="space-y-6 pt-4">
            {/* Buttons Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Button &amp; Trạng thái hành động</CardTitle>
                <CardDescription>
                  Tuân thủ nguyên tắc 1: đầy đủ trạng thái default, hover, focus, active, disabled, loading.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="solid">Solid (Primary)</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link Button</Button>
                  <Button variant="solid" isLoading>Đang lưu...</Button>
                  <Button variant="solid" disabled>Vô hiệu hóa</Button>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button size="sm">Size Small (sm)</Button>
                  <Button size="md">Size Medium (md)</Button>
                  <Button size="lg">Size Large (lg)</Button>
                  <div className="flex items-center gap-2 pl-4 border-l border-border/60">
                    <span className="text-xs text-muted-foreground">Spinners:</span>
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inputs & Controls Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Nhập liệu &amp; Điều khiển nhị phân</CardTitle>
                <CardDescription>
                  Input có icon prefix/suffix, clear button, password visibility toggle; Checkbox, Switch, Radio.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Input
                    placeholder="Input kèm icon tìm kiếm và nút xóa..."
                    leftIcon={<Search className="h-4 w-4" />}
                    isClearable
                    defaultValue="Từ khóa tìm kiếm mẫu"
                  />
                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu an toàn..."
                    showPasswordToggle
                    defaultValue="SecurePassword123"
                  />
                  <Input
                    placeholder="Input trạng thái lỗi (hasError)..."
                    hasError
                    defaultValue="Dữ liệu không đúng định dạng"
                  />
                  <Textarea
                    placeholder="Nhập ghi chú đa dòng kèm bộ đếm ký tự..."
                    showCount
                    maxLength={100}
                    defaultValue="Giao diện thiết kế theo chuẩn SOLID và Clean Code."
                  />
                </div>

                <div className="space-y-4 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-border/60 pt-4 md:pt-0">
                  <VStack gap={3}>
                    <Checkbox
                      label="Kích hoạt thông báo hệ thống"
                      description="Nhận email khi có giao dịch phát sinh trên tài khoản."
                      defaultChecked
                    />
                    <Checkbox
                      label="Chính sách bảo mật GDPR"
                      description="Đồng ý xử lý dữ liệu theo tiêu chuẩn quốc tế."
                    />
                  </VStack>

                  <Divider />

                  <Switch
                    label="Chế độ bảo vệ 2 lớp (2FA)"
                    description="Yêu cầu mã OTP khi đăng nhập từ thiết bị lạ."
                    defaultChecked
                  />

                  <Divider />

                  <RadioGroup defaultValue="daily">
                    <RadioGroupItem value="realtime" label="Thời gian thực (Real-time)" />
                    <RadioGroupItem value="daily" label="Tổng kết hàng ngày (Daily summary)" />
                    <RadioGroupItem value="weekly" label="Báo cáo tuần (Weekly digest)" />
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Badges & Avatars */}
            <Card>
              <CardHeader>
                <CardTitle>Hiển thị: Badges, Avatars &amp; Typography</CardTitle>
                <CardDescription>
                  Các thành phần biểu diễn trạng thái và thông tin định danh dữ liệu.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="default" withDot>Primary Tag</Badge>
                  <Badge variant="success" withDot>Thành công</Badge>
                  <Badge variant="warning" withDot>Cảnh báo</Badge>
                  <Badge variant="destructive" withDot>Lỗi nghiêm trọng</Badge>
                  <Badge variant="info" withDot>Thông tin</Badge>
                  <Badge variant="outline">Viền mảnh</Badge>
                  <Badge variant="secondary" onRemove={() => toast.info('Đã xóa nhãn')}>
                    Nhãn có nút xóa
                  </Badge>
                </div>

                <HStack gap={4} align="center">
                  <Avatar fallback="NV" size="sm" status="online" />
                  <Avatar fallback="TM" size="md" status="busy" />
                  <Avatar fallback="HN" size="lg" status="away" />
                  <Avatar fallback="AD" size="xl" status="online" />
                  <div className="text-xs text-muted-foreground">
                    Avatar hỗ trợ đa kích cỡ (sm, md, lg, xl) kèm status dot badge.
                  </div>
                </HStack>

                <HStack gap={2} align="center">
                  <TypographyText variant="body">Nhấn</TypographyText>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                  <TypographyText variant="body">để mở bảng tìm kiếm nhanh. Mã hàm:</TypographyText>
                  <Code>useDataTable()</Code>
                </HStack>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: COMPOSITE COMPONENTS */}
          <TabsContent value="composite" className="space-y-6 pt-4">
            {/* FormField & Validation */}
            <Card>
              <CardHeader>
                <CardTitle>FormField Wrapper &amp; WAI-ARIA Automatic Binding</CardTitle>
                <CardDescription>
                  Tự động đồng bộ id, label, aria-describedby, helper text và thông điệp lỗi.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Tên miền ứng dụng"
                  required
                  hint="Chỉ nhập tên miền phụ, ví dụ: my-app.domain.vn"
                >
                  <Input placeholder="my-app" rightIcon={<span className="text-xs text-muted-foreground">.domain.vn</span>} />
                </FormField>

                <FormField
                  label="Hạn mức giao dịch ngày"
                  required
                  error="Hạn mức tối đa cho phép là 500.000.000 ₫"
                >
                  <Input defaultValue="900000000" />
                </FormField>
              </CardContent>
            </Card>

            {/* Overlays: Tooltips, Popovers, Alerts, Toasts */}
            <Card>
              <CardHeader>
                <CardTitle>Lớp Overlay &amp; Phản hồi (Feedback)</CardTitle>
                <CardDescription>
                  Modal dialog, Tooltip, Popover, Alert và hệ thống thông báo Toast stackable.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Tooltip content="Tooltip giải thích chi tiết chức năng">
                    <Button variant="outline">Rê chuột xem Tooltip</Button>
                  </Tooltip>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Mở Popover tương tác</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Cài đặt bộ lọc nhanh</h4>
                        <p className="text-xs text-muted-foreground">
                          Bạn có thể tùy chỉnh các chỉ số hiển thị trên dashboard.
                        </p>
                        <Button size="sm" className="w-full mt-2">Áp dụng</Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Button
                    variant="solid"
                    onClick={() => toast.success('Thao tác thành công', 'Dữ liệu đã được lưu trữ vĩnh viễn.')}
                  >
                    Kích hoạt Toast Success
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => toast.error('Lỗi kết nối', 'Không thể đồng bộ với máy chủ thanh toán.')}
                  >
                    Kích hoạt Toast Error
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Alert variant="info">
                    <AlertTitle>Bảo trì hệ thống định kỳ</AlertTitle>
                    <AlertDescription>
                      Hệ thống sẽ cập nhật phiên bản 0.2 vào 02:00 sáng chủ nhật.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="success">
                    <AlertTitle>Bản sao lưu đã hoàn tất</AlertTitle>
                    <AlertDescription>
                      Toàn bộ cơ sở dữ liệu đã được backup an toàn lên AWS S3.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Skeleton Loading State */}
            <Card>
              <CardHeader>
                <CardTitle>Skeleton Shimmer Effect</CardTitle>
                <CardDescription>
                  Hiển thị khung hình tải trang mượt mà, loại bỏ hiện tượng nhảy layout (CLS).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HStack gap={4} align="center">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </HStack>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: DESIGN TOKENS FOUNDATIONS */}
          <TabsContent value="tokens" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Bảng mã màu Design Tokens (CSS Variables)</CardTitle>
                <CardDescription>
                  Toàn bộ giao diện được điều khiển qua các biến CSS tại `src/tokens/colors.css`.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3">Màu Thương hiệu &amp; Trung tính (Brand &amp; Neutral)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
                    <div className="rounded-lg p-3 border border-border bg-primary text-primary-foreground font-medium">
                      Primary
                    </div>
                    <div className="rounded-lg p-3 border border-border bg-secondary text-secondary-foreground font-medium">
                      Secondary
                    </div>
                    <div className="rounded-lg p-3 border border-border bg-muted text-muted-foreground font-medium">
                      Muted
                    </div>
                    <div className="rounded-lg p-3 border border-border bg-accent text-accent-foreground font-medium">
                      Accent
                    </div>
                    <div className="rounded-lg p-3 border border-border bg-card text-card-foreground font-medium">
                      Card / Surface
                    </div>
                    <div className="rounded-lg p-3 border border-border bg-background text-foreground font-medium">
                      Background
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Màu Ngữ nghĩa (Semantic Feedback)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="rounded-lg p-3 border border-emerald-500/30 bg-emerald-500 text-white font-medium">
                      Success (Emerald)
                    </div>
                    <div className="rounded-lg p-3 border border-amber-500/30 bg-amber-500 text-white font-medium">
                      Warning (Amber)
                    </div>
                    <div className="rounded-lg p-3 border border-rose-500/30 bg-destructive text-white font-medium">
                      Destructive (Crimson)
                    </div>
                    <div className="rounded-lg p-3 border border-sky-500/30 bg-sky-500 text-white font-medium">
                      Info (Sky)
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Hệ thống Thang đo Spacing &amp; Radius</h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="p-3 border border-border rounded-sm bg-muted/40">sm: 4px</div>
                    <div className="p-3 border border-border rounded-md bg-muted/40">md: 6px</div>
                    <div className="p-3 border border-border rounded-lg bg-muted/40">lg: 8px (Default)</div>
                    <div className="p-3 border border-border rounded-xl bg-muted/40">xl: 12px</div>
                    <div className="p-3 border border-border rounded-full bg-muted/40 px-4">full: 9999px</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 text-center text-xs text-muted-foreground">
        <p>Belp UI Kit — Thiết kế &amp; kiến trúc theo tiêu chuẩn Clean Code, SOLID và WAI-ARIA.</p>
        <p className="mt-1">Xây dựng nhất quán cho các hệ thống quản trị và dữ liệu phức tạp.</p>
      </footer>
    </div>
  );
}
