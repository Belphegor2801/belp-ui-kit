import React, { useState, useMemo } from 'react';
import {
  Moon,
  Sun,
  LayoutGrid,
  Layers,
  Component,
  Database,
  Plus,
  MoreHorizontal,
  Activity,
  Trash2,
  ExternalLink,
  Search,
  Server,
  GitBranch,
  Terminal,
  Cpu,
  HardDrive,
  RefreshCw,
  Radio,
  Play,
  Copy,
  Check,
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

// Railway Deployment Service Data Item
interface ServiceDeployment {
  id: string;
  name: string;
  type: 'web' | 'database' | 'worker' | 'cache';
  branch: string;
  commitHash: string;
  status: 'active' | 'building' | 'crashed' | 'sleeping';
  resources: {
    cpu: string;
    ram: string;
  };
  environment: 'production' | 'staging' | 'preview';
  updatedAt: string;
  url: string;
}

const INITIAL_SERVICES: ServiceDeployment[] = [
  {
    id: 'srv-web-01',
    name: 'web-dashboard-nextjs',
    type: 'web',
    branch: 'main',
    commitHash: '7f20a1b',
    status: 'active',
    resources: { cpu: '0.12 vCPU', ram: '210 MB' },
    environment: 'production',
    updatedAt: '2 phút trước',
    url: 'dashboard.railway.app',
  },
  {
    id: 'srv-db-02',
    name: 'primary-postgres-db',
    type: 'database',
    branch: 'release/v2',
    commitHash: 'e499d32',
    status: 'active',
    resources: { cpu: '0.45 vCPU', ram: '1.2 GB' },
    environment: 'production',
    updatedAt: '1 giờ trước',
    url: 'postgres.railway.internal:5432',
  },
  {
    id: 'srv-worker-03',
    name: 'event-worker-celery',
    type: 'worker',
    branch: 'feature/async-jobs',
    commitHash: '3a18e90',
    status: 'building',
    resources: { cpu: '0.80 vCPU', ram: '512 MB' },
    environment: 'staging',
    updatedAt: 'Vừa xong',
    url: 'worker-queue.railway.app',
  },
  {
    id: 'srv-cache-04',
    name: 'session-cache-redis',
    type: 'cache',
    branch: 'main',
    commitHash: '91bc740',
    status: 'active',
    resources: { cpu: '0.05 vCPU', ram: '128 MB' },
    environment: 'production',
    updatedAt: '5 giờ trước',
    url: 'redis.railway.internal:6379',
  },
  {
    id: 'srv-web-05',
    name: 'docs-static-site',
    type: 'web',
    branch: 'docs-revamp',
    commitHash: 'c1208fe',
    status: 'sleeping',
    resources: { cpu: '0.00 vCPU', ram: '0 MB' },
    environment: 'preview',
    updatedAt: '1 ngày trước',
    url: 'docs-pr-42.railway.app',
  },
  {
    id: 'srv-worker-06',
    name: 'billing-cron-sync',
    type: 'worker',
    branch: 'main',
    commitHash: 'b4501a2',
    status: 'crashed',
    resources: { cpu: '0.00 vCPU', ram: '16 MB' },
    environment: 'production',
    updatedAt: '3 giờ trước',
    url: 'cron.railway.internal',
  },
  {
    id: 'srv-web-07',
    name: 'auth-gateway-oauth',
    type: 'web',
    branch: 'main',
    commitHash: 'd887a11',
    status: 'active',
    resources: { cpu: '0.24 vCPU', ram: '340 MB' },
    environment: 'production',
    updatedAt: '12 giờ trước',
    url: 'auth.railway.app',
  },
  {
    id: 'srv-db-08',
    name: 'search-vector-milvus',
    type: 'database',
    branch: 'vector-v1',
    commitHash: '61a029c',
    status: 'active',
    resources: { cpu: '0.62 vCPU', ram: '2.4 GB' },
    environment: 'staging',
    updatedAt: '6 giờ trước',
    url: 'vector.railway.internal',
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
  const [copiedCmd, setCopiedCmd] = useState(false);

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
  const [services] = useState<ServiceDeployment[]>(INITIAL_SERVICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [envFilter, setEnvFilter] = useState<string>('all');
  const [sortColumn, setSortColumn] = useState<string>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(new Set());
  const [tableDensity, setTableDensity] = useState<TableDensity>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isTableLoading, setIsTableLoading] = useState(false);

  // Modal State
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceType, setNewServiceType] = useState('web');
  const [newServiceRepo, setNewServiceRepo] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filtered & Sorted Data
  const filteredData = useMemo(() => {
    let result = [...services];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.branch.toLowerCase().includes(q) ||
          item.commitHash.toLowerCase().includes(q) ||
          item.url.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((item) => item.status === statusFilter);
    }

    if (envFilter !== 'all') {
      result = result.filter((item) => item.environment === envFilter);
    }

    // Sort
    result.sort((a, b) => {
      const valA = (a as unknown as Record<string, string>)[sortColumn] || '';
      const valB = (b as unknown as Record<string, string>)[sortColumn] || '';
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [services, searchQuery, statusFilter, envFilter, sortColumn, sortDirection]);

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

  const handleRefresh = () => {
    setIsTableLoading(true);
    setTimeout(() => {
      setIsTableLoading(false);
      toast.success('Đồng bộ thành công', 'Trạng thái toàn bộ cụm dịch vụ đã được cập nhật.');
    }, 700);
  };

  const copyCliCommand = () => {
    navigator.clipboard?.writeText('npm i -g @railway/cli && railway up');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
    toast.info('Đã sao chép lệnh', 'Dán vào terminal để triển khai dịch vụ.');
  };

  // Columns Definition
  const columns: ColumnDef<ServiceDeployment>[] = [
    {
      key: 'name',
      header: 'Dịch vụ & Repo',
      sortable: true,
      accessor: (row) => (
        <HStack gap={3}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/60 text-primary">
            {row.type === 'web' && <Server className="h-4 w-4" />}
            {row.type === 'database' && <Database className="h-4 w-4" />}
            {row.type === 'worker' && <Cpu className="h-4 w-4" />}
            {row.type === 'cache' && <HardDrive className="h-4 w-4" />}
          </div>
          <div className="grid leading-tight">
            <span className="font-semibold text-foreground tracking-tight hover:text-primary transition-colors cursor-pointer">
              {row.name}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
              <GitBranch className="h-3 w-3 text-muted-foreground/70" />
              <span>{row.branch}</span>
              <span className="text-border">•</span>
              <Code className="text-[10px] px-1 py-0">{row.commitHash}</Code>
            </div>
          </div>
        </HStack>
      ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      sortable: true,
      align: 'center',
      width: '140px',
      accessor: (row) => {
        if (row.status === 'active') {
          return (
            <Badge variant="success" withDot pulse size="sm">
              Active
            </Badge>
          );
        }
        if (row.status === 'building') {
          return (
            <Badge variant="default" withDot pulse size="sm">
              Building
            </Badge>
          );
        }
        if (row.status === 'crashed') {
          return (
            <Badge variant="destructive" withDot size="sm">
              Crashed
            </Badge>
          );
        }
        return (
          <Badge variant="secondary" withDot size="sm">
            Sleeping
          </Badge>
        );
      },
    },
    {
      key: 'environment',
      header: 'Môi trường',
      sortable: true,
      align: 'center',
      width: '120px',
      accessor: (row) => (
        <Badge variant="outline" mono size="sm">
          {row.environment}
        </Badge>
      ),
    },
    {
      key: 'resources',
      header: 'Tài nguyên sử dụng',
      accessor: (row) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.resources.cpu} <span className="text-border">/</span> {row.resources.ram}
        </span>
      ),
    },
    {
      key: 'url',
      header: 'Endpoint / Domain',
      accessor: (row) => (
        <a
          href={`https://${row.url}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <span>{row.url}</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      ),
    },
    {
      key: 'updatedAt',
      header: 'Cập nhật',
      sortable: true,
      width: '120px',
      accessor: (row) => (
        <span className="text-xs text-muted-foreground">{row.updatedAt}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      width: '60px',
      accessor: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Tùy chọn">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Quản lý dịch vụ</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => toast.info('Xem Logs', `Đang tải logs của ${row.name}`)}>
              <Terminal className="mr-2 h-3.5 w-3.5" />
              Xem Live Logs
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success('Redeploy', `Đang triển khai lại ${row.name}`)}>
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              Triển khai lại (Redeploy)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              destructive
              onClick={() => toast.error('Đã xóa dịch vụ', `Dịch vụ ${row.name} đã ngừng hoạt động.`)}
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Xóa dịch vụ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Top Navigation Bar — Railway Signature */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Railway Style Brand Icon */}
            <div className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_12px_hsl(var(--primary)/0.3)]">
              <Radio className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-foreground font-sans">
                Railway
              </span>
              <span className="text-muted-foreground/60">/</span>
              <span className="text-sm font-medium text-muted-foreground">production-cluster</span>
              <Badge variant="default" mono size="sm" className="hidden sm:inline-flex">
                v0.1.0
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={copyCliCommand}
              className="hidden md:inline-flex items-center gap-2 h-8 px-3 rounded-md border border-border bg-muted/60 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-border/80 transition-all"
            >
              <Terminal className="h-3.5 w-3.5 text-primary" />
              <span>railway up</span>
              {copiedCmd ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 opacity-60" />}
            </button>

            <Tooltip content={isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}>
              <Button variant="outline" size="icon-sm" onClick={toggleTheme}>
                {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
              </Button>
            </Tooltip>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="solid" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                  Khởi tạo Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Deploy New Service</DialogTitle>
                  <DialogDescription>
                    Triển khai dịch vụ từ GitHub Repo hoặc Docker Image lên hạ tầng Railway.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                  <FormField
                    label="Tên dịch vụ (Service Name)"
                    required
                    error={formSubmitted && !newServiceName ? 'Vui lòng đặt tên dịch vụ' : undefined}
                  >
                    <Input
                      placeholder="vd: api-gateway, analytics-worker..."
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                    />
                  </FormField>

                  <FormField
                    label="GitHub Repository"
                    required
                    hint="Nhập đường dẫn GitHub repository cần liên kết tự động build"
                    error={formSubmitted && !newServiceRepo ? 'Vui lòng nhập repository' : undefined}
                  >
                    <Input
                      placeholder="org/repo-name"
                      leftIcon={<GitBranch className="h-4 w-4" />}
                      value={newServiceRepo}
                      onChange={(e) => setNewServiceRepo(e.target.value)}
                    />
                  </FormField>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Loại dịch vụ</label>
                    <RadioGroup value={newServiceType} onValueChange={setNewServiceType} className="grid grid-cols-2 gap-2 pt-1">
                      <RadioGroupItem value="web" label="Web Server" description="HTTP API, Next.js, Frontend" />
                      <RadioGroupItem value="worker" label="Background Worker" description="Celery, Cron, Queue" />
                    </RadioGroup>
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Hủy bỏ</Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      setFormSubmitted(true);
                      if (newServiceName && newServiceRepo) {
                        toast.success('Đang khởi tạo dịch vụ', `Service ${newServiceName} đang bắt đầu quá trình build.`);
                        setNewServiceName('');
                        setNewServiceRepo('');
                        setFormSubmitted(false);
                      }
                    }}
                  >
                    Bắt đầu Deploy
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Editorial Display Hero — Railway Signature Serif */}
        <section className="space-y-2 max-w-3xl">
          <TypographyHeading level="h1" variant="editorial" className="text-4xl sm:text-5xl tracking-tight leading-tight">
            Deploy infrastructure, effortlessly.
          </TypographyHeading>
          <TypographyText variant="lead" className="text-muted-foreground text-base sm:text-lg">
            Hệ thống Design System lấy cảm hứng từ Railway: Bảng màu dark-first thanh lịch, điểm nhấn tím đặc trưng,
            typography kết hợp giữa phong cách editorial serif và technical monospace cho hạ tầng đám mây.
          </TypographyText>
        </section>

        {/* Live Cluster Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Services"
            value="8 Dịch vụ"
            icon={<Server className="h-5 w-5 text-primary" />}
            change={14.2}
            changePeriod="so với tuần trước"
          />
          <MetricCard
            title="Total CPU Usage"
            value="2.35 vCPU"
            icon={<Cpu className="h-5 w-5 text-emerald-400" />}
            change={-4.5}
            changePeriod="giảm 4.5% tải"
            invertTrendColor
          />
          <MetricCard
            title="Cluster Memory"
            value="4.87 GB"
            icon={<HardDrive className="h-5 w-5 text-sky-400" />}
            change={8.1}
            changePeriod="trên tổng 16 GB"
          />
          <MetricCard
            title="Monthly Estimate"
            value="$42.50"
            icon={<Activity className="h-5 w-5 text-amber-400" />}
            change={2.3}
            changePeriod="dự kiến cuối tháng"
          />
        </section>

        {/* Tabs Controller */}
        <Tabs defaultValue="services" className="w-full">
          <TabsList variant="pill" className="w-full sm:w-auto grid grid-cols-4 max-w-xl">
            <TabsTrigger value="services" className="flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5" />
              <span>Services Table</span>
            </TabsTrigger>
            <TabsTrigger value="primitives" className="flex items-center gap-1.5">
              <Component className="h-3.5 w-3.5" />
              <span>Primitives</span>
            </TabsTrigger>
            <TabsTrigger value="composite" className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>Composite</span>
            </TabsTrigger>
            <TabsTrigger value="tokens" className="flex items-center gap-1.5">
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Railway Tokens</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: RAILWAY DATA TABLE */}
          <TabsContent value="services" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span>Deployments &amp; Active Containers</span>
                    <Badge variant="default" pulse size="sm">
                      Live
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Quản lý toàn bộ danh sách microservices, tiến trình build và tài nguyên hạ tầng điện toán đám mây.
                  </CardDescription>
                </div>

                <HStack gap={2}>
                  {selectedRowIds.size > 0 && (
                    <Badge variant="default" size="md">
                      Đã chọn {selectedRowIds.size} service
                    </Badge>
                  )}

                  <HStack gap={1} className="bg-muted p-1 rounded-md text-xs">
                    <Button
                      variant={tableDensity === 'compact' ? 'solid' : 'ghost'}
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={() => setTableDensity('compact')}
                    >
                      Compact
                    </Button>
                    <Button
                      variant={tableDensity === 'default' ? 'solid' : 'ghost'}
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={() => setTableDensity('default')}
                    >
                      Default
                    </Button>
                    <Button
                      variant={tableDensity === 'relaxed' ? 'solid' : 'ghost'}
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={() => setTableDensity('relaxed')}
                    >
                      Relaxed
                    </Button>
                  </HStack>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    isLoading={isTableLoading}
                  >
                    Sync Cluster
                  </Button>
                </HStack>
              </CardHeader>

              <CardContent>
                {/* Railway FilterBar */}
                <FilterBar
                  searchValue={searchQuery}
                  onSearchChange={setSearchQuery}
                  searchPlaceholder="Tìm service, branch, commit hash..."
                  activeFilterCount={
                    (searchQuery ? 1 : 0) +
                    (statusFilter !== 'all' ? 1 : 0) +
                    (envFilter !== 'all' ? 1 : 0)
                  }
                  onResetFilters={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setEnvFilter('all');
                  }}
                  actions={
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Play className="h-3.5 w-3.5" />}
                      onClick={() =>
                        toast.info('Restart Cluster', 'Đang gửi tín hiệu khởi động lại các worker.')
                      }
                    >
                      Restart All
                    </Button>
                  }
                >
                  <div className="flex items-center gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="h-8 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono"
                    >
                      <option value="all">Mọi trạng thái</option>
                      <option value="active">Active</option>
                      <option value="building">Building</option>
                      <option value="crashed">Crashed</option>
                      <option value="sleeping">Sleeping</option>
                    </select>

                    <select
                      value={envFilter}
                      onChange={(e) => setEnvFilter(e.target.value)}
                      className="h-8 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono"
                    >
                      <option value="all">Mọi môi trường</option>
                      <option value="production">production</option>
                      <option value="staging">staging</option>
                      <option value="preview">preview</option>
                    </select>
                  </div>
                </FilterBar>

                {/* DataTable */}
                <DataTable<ServiceDeployment>
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
                    toast.info(`Service: ${row.name}`, `Endpoint: https://${row.url}`)
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

          {/* TAB 2: PRIMITIVES */}
          <TabsContent value="primitives" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Buttons &amp; Interactive Controls</CardTitle>
                <CardDescription>
                  Thiết kế nút với viền sắc sảo, ánh tím Railway signature và hiệu ứng active tinh tế.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="solid">Primary Solid</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Border</Button>
                  <Button variant="ghost">Ghost Action</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link Style</Button>
                  <Button variant="solid" isLoading>Deploying...</Button>
                  <Button variant="solid" disabled>Disabled State</Button>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button size="sm">Small (sm)</Button>
                  <Button size="md">Medium (md)</Button>
                  <Button size="lg">Large (lg)</Button>
                  <div className="flex items-center gap-2 pl-4 border-l border-border/80">
                    <span className="text-xs text-muted-foreground">Spinners:</span>
                    <Spinner size="sm" />
                    <Spinner size="md" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inputs &amp; Binary Switches</CardTitle>
                <CardDescription>
                  Ô nhập liệu viền hairline tinh giản kèm tính năng clear nhanh, password toggle và toggle 2FA.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Input
                    placeholder="Tìm kiếm repository..."
                    leftIcon={<Search className="h-4 w-4" />}
                    isClearable
                    defaultValue="railwayapp/core"
                  />
                  <Input
                    type="password"
                    placeholder="API Token..."
                    showPasswordToggle
                    defaultValue="railway_sec_99a80b12cd"
                  />
                  <Textarea
                    placeholder="Dockerfile custom directives..."
                    showCount
                    maxLength={150}
                    defaultValue="FROM node:20-alpine&#10;WORKDIR /app&#10;COPY package*.json ./&#10;RUN npm ci"
                  />
                </div>

                <div className="space-y-4 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-border/80 pt-4 md:pt-0">
                  <Switch
                    label="Tự động Deploy khi git push"
                    description="Xây dựng và phát hành phiên bản mới mỗi khi có commit lên nhánh main."
                    defaultChecked
                  />
                  <Divider />
                  <Switch
                    label="Healthcheck Endpoint"
                    description="Gửi ping mỗi 30s để kiểm tra container còn sống."
                    defaultChecked
                  />
                  <Divider />
                  <VStack gap={3}>
                    <Checkbox
                      label="Bật chế độ Auto-sleep"
                      description="Tạm ngắt container khi không có lưu lượng truy cập để tiết kiệm chi phí."
                      defaultChecked
                    />
                    <Checkbox
                      label="Kích hoạt Ephemeral Volumes"
                      description="Dữ liệu tạm sẽ được dọn sạch khi khởi động lại container."
                    />
                  </VStack>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges với Hiệu ứng Glowing Pulse</CardTitle>
                <CardDescription>
                  Đặc trưng của Railway với chấm trạng thái phát sáng báo hiệu service online, building hoặc lỗi.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="success" withDot pulse>
                    Active / Healthy
                  </Badge>
                  <Badge variant="default" withDot pulse>
                    Building Container
                  </Badge>
                  <Badge variant="warning" withDot pulse>
                    High CPU Usage
                  </Badge>
                  <Badge variant="destructive" withDot>
                    Build Failed
                  </Badge>
                  <Badge variant="secondary" withDot>
                    Sleeping
                  </Badge>
                  <Badge variant="outline" mono>
                    sha256:4b91ac
                  </Badge>
                </div>

                <HStack gap={3} align="center" className="pt-2">
                  <Avatar fallback="RW" size="sm" status="online" />
                  <Avatar fallback="NX" size="md" status="online" />
                  <Avatar fallback="DB" size="lg" status="away" />
                  <div className="text-xs text-muted-foreground">
                    Avatars hỗ trợ fallback initials và status dot viền tương phản.
                  </div>
                </HStack>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: COMPOSITE */}
          <TabsContent value="composite" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>FormField Wrapper &amp; Input Validation</CardTitle>
                <CardDescription>
                  Tự động đồng bộ id, label, required mark, aria-describedby và thông điệp lỗi.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Tên miền phụ (Custom Domain)"
                  required
                  hint="Nhập domain mong muốn cho dịch vụ của bạn"
                >
                  <Input placeholder="my-service" rightIcon={<span className="text-xs font-mono text-muted-foreground">.railway.app</span>} />
                </FormField>

                <FormField
                  label="Port lắng nghe HTTP"
                  required
                  error="Port 80 bị giới hạn cho hệ thống, vui lòng dùng port 3000 hoặc 8080"
                >
                  <Input defaultValue="80" />
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lớp Overlay &amp; Feedback</CardTitle>
                <CardDescription>
                  Modal, Tooltip, Popover, Alert và hệ thống Toast stackable.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Tooltip content="Mở live logs trực tiếp từ container">
                    <Button variant="outline">Tooltip: Live Logs</Button>
                  </Tooltip>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Cấu hình CPU &amp; RAM</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Hạn mức tài nguyên</h4>
                        <p className="text-xs text-muted-foreground">
                          Container tự động co giãn theo dung lượng tải thực tế.
                        </p>
                        <div className="flex items-center justify-between text-xs font-mono border-t border-border pt-2">
                          <span>Max Memory:</span>
                          <span className="font-semibold text-foreground">2048 MB</span>
                        </div>
                        <Button size="sm" className="w-full">Lưu cấu hình</Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Button
                    variant="solid"
                    onClick={() => toast.success('Triển khai hoàn tất', 'Commit 7f20a1b đã được deploy thành công.')}
                  >
                    Kích hoạt Toast Success
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => toast.error('Container Out-of-Memory', 'Service bị tắt do vượt quá hạn mức RAM.')}
                  >
                    Kích hoạt Toast Error
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Alert variant="info">
                    <AlertTitle>Bảo trì hệ thống hạ tầng</AlertTitle>
                    <AlertDescription>
                      Cụm máy chủ Singapore sẽ nâng cấp kernel vào 03:00 UTC thứ 7 tới.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="success">
                    <AlertTitle>SSL Certificate Auto-renewed</AlertTitle>
                    <AlertDescription>
                      Chứng chỉ HTTPS cho toàn bộ domain đã được tự động gia hạn an toàn.
                    </AlertDescription>
                  </Alert>
                </div>

                <HStack gap={4} align="center" className="p-4 rounded-lg border border-border/80 bg-muted/20">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </HStack>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: RAILWAY DESIGN TOKENS */}
          <TabsContent value="tokens" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Bảng mã màu Design Tokens (Railway Signature)</CardTitle>
                <CardDescription>
                  Các biến CSS trung tâm tại `src/tokens/colors.css` định hình phong cách độc bản của Railway.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3">Railway Surface Hierarchy</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="rounded-lg p-3 border border-border bg-background text-foreground font-mono">
                      Canvas (#0b0b0f)
                    </div>
                    <div className="rounded-lg p-3 border border-border bg-card text-card-foreground font-mono">
                      Card (#13111c)
                    </div>
                    <div className="rounded-lg p-3 border border-border bg-popover text-popover-foreground font-mono">
                      Popover (#1b1828)
                    </div>
                    <div className="rounded-lg p-3 border border-primary/40 bg-primary text-primary-foreground font-mono">
                      Primary (#853bce)
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Typography Pairing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 border border-border rounded-lg bg-card space-y-1">
                      <span className="text-muted-foreground uppercase text-[10px]">Headings / Editorial</span>
                      <p className="font-serif text-lg font-normal text-foreground">IBM Plex Serif</p>
                      <p className="text-muted-foreground text-xs">Sử dụng cho Hero, Display title tạo cảm giác thẩm mỹ đẳng cấp.</p>
                    </div>
                    <div className="p-4 border border-border rounded-lg bg-card space-y-1">
                      <span className="text-muted-foreground uppercase text-[10px]">Body &amp; UI Controls</span>
                      <p className="font-sans text-lg font-semibold text-foreground">Inter</p>
                      <p className="text-muted-foreground text-xs">Sử dụng cho Button, Label, Input với độ nét cao ở kích thước nhỏ.</p>
                    </div>
                    <div className="p-4 border border-border rounded-lg bg-card space-y-1">
                      <span className="text-muted-foreground uppercase text-[10px]">Code &amp; Technical Metrics</span>
                      <p className="font-mono text-lg font-medium text-foreground">JetBrains Mono</p>
                      <p className="text-muted-foreground text-xs">Sử dụng cho Commit hashes, Endpoints, Terminal commands, vCPU/RAM.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 text-center text-xs text-muted-foreground">
        <p>Belp UI Kit — Railway Design Language: Dark-first, Electric Violet accent, IBM Plex Serif &amp; JetBrains Mono.</p>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground/80">
          Built with React 18, Tailwind CSS, Radix UI Primitives and Strict TypeScript.
        </p>
      </footer>
    </div>
  );
}
