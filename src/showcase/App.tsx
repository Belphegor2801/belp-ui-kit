import React, { useState, useMemo } from 'react';
import {
  Moon,
  Sun,
  LayoutGrid,
  Layers,
  Component,
  Plus,
  MoreHorizontal,
  Activity,
  Trash2,
  ExternalLink,
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
  Layers as LayersIcon,
  Database,
  Search,
  Sliders,
  Command,
  Clock,
  Tag,
  AlertTriangle,
  Calendar as CalendarIcon,
  UploadCloud,
  FolderTree,
  GitFork,
  Globe,
  Settings,
  FileCode,
  FileText,
  Workflow,
} from 'lucide-react';

import {
  Button,
  IconButton,
  Link,
  Input,
  Checkbox,
  Switch,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  Slider,
  SegmentedControl,
  TypographyHeading,
  TypographyText,
  Code,
  Kbd,
  Badge,
  Divider,
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DatePicker,
  DateRangePicker,
  type DateRange,
  Combobox,
  type ComboboxOption,
  FileUpload,
  type UploadedFile,
  Sidebar,
  SidebarGroup,
  SidebarItem,
  CommandMenu,
  type CommandAction,
  Timeline,
  type TimelineItem,
  TagInput,
  CodeSnippet,
  NumberInput,
  ConfirmDialog,
  ProgressBar,
  Tooltip,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Alert,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@/components/composite';

import {
  DataTable,
  ColumnDef,
  TableDensity,
  Pagination,
  FilterBar,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  MetricCard,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Stepper,
  type StepItem,
  TreeView,
  type TreeNode,
} from '@/components/data';

// Service Deployment Interface
interface ServiceDeployment {
  id: string;
  name: string;
  type: 'web' | 'database' | 'worker' | 'cache';
  branch: string;
  commitHash: string;
  status: 'active' | 'building' | 'crashed' | 'sleeping';
  cpuPercent: number;
  ramPercent: number;
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
    cpuPercent: 24,
    ramPercent: 42,
    environment: 'production',
    updatedAt: '28/10/2026',
    url: 'dashboard.belp.internal',
  },
  {
    id: 'srv-db-02',
    name: 'primary-postgres-db',
    type: 'database',
    branch: 'release/v2',
    commitHash: 'e499d32',
    status: 'active',
    cpuPercent: 58,
    ramPercent: 78,
    environment: 'production',
    updatedAt: '28/10/2026',
    url: 'postgres.belp.internal:5432',
  },
  {
    id: 'srv-worker-03',
    name: 'event-worker-celery',
    type: 'worker',
    branch: 'feature/async-jobs',
    commitHash: '3a18e90',
    status: 'building',
    cpuPercent: 82,
    ramPercent: 55,
    environment: 'staging',
    updatedAt: '27/10/2026',
    url: 'worker-queue.belp.internal',
  },
  {
    id: 'srv-cache-04',
    name: 'session-cache-redis',
    type: 'cache',
    branch: 'main',
    commitHash: '91bc740',
    status: 'active',
    cpuPercent: 12,
    ramPercent: 22,
    environment: 'production',
    updatedAt: '26/10/2026',
    url: 'redis.belp.internal:6379',
  },
  {
    id: 'srv-web-05',
    name: 'docs-static-site',
    type: 'web',
    branch: 'docs-revamp',
    commitHash: 'c1208fe',
    status: 'sleeping',
    cpuPercent: 0,
    ramPercent: 0,
    environment: 'preview',
    updatedAt: '25/10/2026',
    url: 'docs-pr-42.belp.internal',
  },
  {
    id: 'srv-worker-06',
    name: 'billing-cron-sync',
    type: 'worker',
    branch: 'main',
    commitHash: 'b4501a2',
    status: 'crashed',
    cpuPercent: 0,
    ramPercent: 10,
    environment: 'production',
    updatedAt: '24/10/2026',
    url: 'cron.belp.internal',
  },
  {
    id: 'srv-web-07',
    name: 'auth-gateway-oauth',
    type: 'web',
    branch: 'main',
    commitHash: 'd887a11',
    status: 'active',
    cpuPercent: 35,
    ramPercent: 48,
    environment: 'production',
    updatedAt: '23/10/2026',
    url: 'auth.belp.internal',
  },
  {
    id: 'srv-db-08',
    name: 'search-vector-milvus',
    type: 'database',
    branch: 'vector-v1',
    commitHash: '61a029c',
    status: 'active',
    cpuPercent: 64,
    ramPercent: 86,
    environment: 'staging',
    updatedAt: '22/10/2026',
    url: 'vector.belp.internal',
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
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [sortColumn, setSortColumn] = useState<string>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(new Set());
  const [tableDensity, setTableDensity] = useState<TableDensity>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isTableLoading, setIsTableLoading] = useState(false);

  // Selected Service for Drawer Inspection
  const [inspectingService, setInspectingService] = useState<ServiceDeployment | null>(null);

  // Confirm Dialog State
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceDeployment | null>(null);

  // Modal State
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceType, setNewServiceType] = useState('web');
  const [newServiceRepo, setNewServiceRepo] = useState('');
  const [newServiceReplicas, setNewServiceReplicas] = useState(2);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // New Components Interactive State
  const [commandOpen, setCommandOpen] = useState(false);
  const [cpuSliderValue, setCpuSliderValue] = useState<number[]>([75]);
  const [latencyRangeValue, setLatencyRangeValue] = useState<number[]>([40, 240]);
  const [activeSegment, setActiveSegment] = useState('services');
  const [activeTimeframe, setActiveTimeframe] = useState('24h');
  const [demoSingleDate, setDemoSingleDate] = useState<Date | null>(new Date());
  const [demoDateRange, setDemoDateRange] = useState<DateRange>({});
  const [demoTags, setDemoTags] = useState<string[]>([
    'production',
    'ap-southeast-1',
    'canary-v2',
    'high-cpu',
    'auto-scaling',
  ]);

  // Advanced Components State
  const [selectedClusterNode, setSelectedClusterNode] = useState('sg-node-01');
  const [demoUploadedFiles, setDemoUploadedFiles] = useState<UploadedFile[]>([
    {
      id: 'file-1',
      name: 'docker-compose.production.yml',
      size: 14336,
      status: 'completed',
    },
    {
      id: 'file-2',
      name: 'cluster-cert-fullchain.pem',
      size: 4096,
      status: 'completed',
    },
  ]);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(1);
  const [sidebarDemoCollapsed, setSidebarDemoCollapsed] = useState(false);
  const [sidebarActiveId, setSidebarActiveId] = useState('services');
  const [selectedTreeId, setSelectedTreeId] = useState('button');

  const clusterNodeOptions: ComboboxOption[] = [
    {
      value: 'sg-node-01',
      label: 'Singapore Cluster (ap-southeast-1a)',
      description: 'Cụm chính độ trễ thấp 18ms, 32 Cores, 128GB RAM',
      icon: <Globe className="h-4 w-4 text-primary" />,
    },
    {
      value: 'sg-node-02',
      label: 'Singapore Backup (ap-southeast-1b)',
      description: 'Dự phòng nóng tự động chuyển mạch Failover',
      icon: <Globe className="h-4 w-4 text-sky-400" />,
    },
    {
      value: 'tokyo-node-01',
      label: 'Tokyo Edge (ap-northeast-1)',
      description: 'Cụm CDN & Cache khu vực Đông Á',
      icon: <Globe className="h-4 w-4 text-emerald-400" />,
    },
    {
      value: 'virginia-node-01',
      label: 'US East Virginia (us-east-1)',
      description: 'Cụm máy chủ lưu trữ dữ liệu trung tâm Bắc Mỹ',
      icon: <Globe className="h-4 w-4 text-purple-400" />,
    },
    {
      value: 'frankfurt-node-01',
      label: 'Frankfurt Central (eu-central-1)',
      description: 'Tuân thủ tiêu chuẩn bảo mật dữ liệu GDPR',
      icon: <Globe className="h-4 w-4 text-amber-400" />,
    },
  ];

  const workflowSteps: StepItem[] = [
    {
      id: 'step-repo',
      title: 'Chọn Nguồn Mã',
      description: 'GitHub Repo hoặc Container Registry',
    },
    {
      id: 'step-env',
      title: 'Biến Môi Trường',
      description: 'Khóa bí mật .env & Cổng mạng',
    },
    {
      id: 'step-resources',
      title: 'Tài Nguyên vCPU/RAM',
      description: 'Định mức giới hạn & Tự động scale',
    },
    {
      id: 'step-deploy',
      title: 'Kiểm Tra & Deploy',
      description: 'Xác nhận và kích hoạt pipeline',
    },
  ];

  const repositoryTreeData: TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      children: [
        {
          id: 'components',
          label: 'components',
          children: [
            {
              id: 'primitives',
              label: 'primitives',
              children: [
                { id: 'button', label: 'button.tsx', icon: <FileCode className="h-4 w-4 text-primary" /> },
                { id: 'select', label: 'select.tsx', icon: <FileCode className="h-4 w-4 text-primary" /> },
                { id: 'slider', label: 'slider.tsx', icon: <FileCode className="h-4 w-4 text-primary" /> },
              ],
            },
            {
              id: 'composite',
              label: 'composite',
              children: [
                { id: 'combobox', label: 'combobox.tsx', icon: <FileCode className="h-4 w-4 text-sky-400" /> },
                { id: 'file-upload', label: 'file-upload.tsx', icon: <FileCode className="h-4 w-4 text-sky-400" /> },
                { id: 'date-picker', label: 'date-picker.tsx', icon: <FileCode className="h-4 w-4 text-sky-400" /> },
              ],
            },
            {
              id: 'data',
              label: 'data',
              children: [
                { id: 'data-table', label: 'data-table.tsx', icon: <FileCode className="h-4 w-4 text-emerald-400" /> },
                { id: 'stepper', label: 'stepper.tsx', icon: <FileCode className="h-4 w-4 text-emerald-400" /> },
                { id: 'tree-view', label: 'tree-view.tsx', icon: <FileCode className="h-4 w-4 text-emerald-400" /> },
              ],
            },
          ],
        },
        {
          id: 'tokens',
          label: 'tokens',
          children: [
            { id: 'colors', label: 'colors.css', icon: <FileCode className="h-4 w-4 text-amber-400" /> },
            { id: 'spacing', label: 'spacing.css', icon: <FileCode className="h-4 w-4 text-amber-400" /> },
          ],
        },
      ],
    },
    {
      id: 'docs',
      label: 'docs',
      children: [
        { id: 'req', label: 'REQUIREMENTS.md', icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
        { id: 'arch', label: 'ARCHITECTURE.md', icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
        { id: 'tasks', label: 'TASKS.md', icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
      ],
    },
    { id: 'pkg', label: 'package.json', icon: <FileCode className="h-4 w-4 text-yellow-400" /> },
    { id: 'readme', label: 'README.md', icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
  ];

  // Global Cmd+K / Ctrl+K keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commandActions: CommandAction[] = useMemo(
    () => [
      {
        id: 'new-service',
        title: 'Deploy New Service',
        subtitle: 'Khởi tạo container mới từ GitHub repo hoặc Docker',
        icon: <Plus className="h-4 w-4" />,
        shortcut: ['N'],
        group: 'Triển khai',
        onSelect: () => toast.info('Khởi tạo service', 'Mở form deploy service.'),
      },
      {
        id: 'sync-cluster',
        title: 'Sync Cluster Nodes',
        subtitle: 'Đồng bộ lại thông tin metrics và trạng thái pods',
        icon: <RefreshCw className="h-4 w-4" />,
        shortcut: ['R'],
        group: 'Triển khai',
        onSelect: () => handleRefresh(),
      },
      {
        id: 'theme-toggle',
        title: 'Chuyển đổi Giao diện Sáng / Tối',
        subtitle: isDark ? 'Chuyển sang Light Theme' : 'Chuyển sang Dark Theme',
        icon: isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />,
        shortcut: ['T'],
        group: 'Cài đặt',
        onSelect: () => toggleTheme(),
      },
      {
        id: 'cluster-logs',
        title: 'Xem Cluster Audit Logs',
        subtitle: 'Dòng thời gian các sự kiện triển khai và bảo mật',
        icon: <Clock className="h-4 w-4" />,
        group: 'Quan sát',
        onSelect: () => toast.info('Audit Logs', 'Đang chuyển tới màn hình nhật ký.'),
      },
      {
        id: 'docs',
        title: 'Mở Tài liệu Kiến trúc Belp UI Kit',
        subtitle: 'Xem đặc tả Design Tokens và Nguyên tắc SOLID',
        icon: <ExternalLink className="h-4 w-4" />,
        group: 'Tài liệu',
        onSelect: () => window.open('https://github.com', '_blank'),
      },
    ],
    [isDark]
  );

  const sampleTimelineItems: TimelineItem[] = [
    {
      id: 'evt-1',
      title: 'Phát hành production-v2.4.1 thành công',
      description: 'Hệ thống đã tự động rollout phiên bản mới trên cụm Singapore không gián đoạn dịch vụ.',
      timestamp: '2 phút trước',
      status: 'success',
      icon: <Check className="h-3 w-3" />,
      author: { name: 'Thanh Tùng', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces' },
    },
    {
      id: 'evt-2',
      title: 'Tự động mở rộng +4 Pods (Auto-scaling Triggered)',
      description: 'Lưu lượng truy cập vượt ngưỡng 12,000 req/s, cụm HPA đã kích hoạt thêm 4 worker pods.',
      timestamp: '18 phút trước',
      status: 'info',
      icon: <Activity className="h-3 w-3" />,
      author: { name: 'K8s Controller' },
    },
    {
      id: 'evt-3',
      title: 'Cảnh báo: CPU cụm đạt 84.5% công suất',
      description: 'Dịch vụ event-worker-celery đang xử lý hàng đợi nén ảnh kích thước lớn.',
      timestamp: '42 phút trước',
      status: 'warning',
      icon: <AlertTriangle className="h-3 w-3" />,
      author: { name: 'Prometheus Alert' },
    },
    {
      id: 'evt-4',
      title: 'Container redis-cache restart do Out of Memory',
      description: 'Container chạm ngưỡng 512MB RAM tối đa và được cgroup tự động tái khởi động.',
      timestamp: '1 giờ trước',
      status: 'destructive',
      icon: <Trash2 className="h-3 w-3" />,
      author: { name: 'Kubelet' },
    },
  ];

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

    if (filterDate) {
      const d = String(filterDate.getDate()).padStart(2, '0');
      const m = String(filterDate.getMonth() + 1).padStart(2, '0');
      const y = filterDate.getFullYear();
      const dateStr = `${d}/${m}/${y}`;
      result = result.filter((item) => item.updatedAt === dateStr);
    }

    // Sort
    result.sort((a, b) => {
      const valA = (a as unknown as Record<string, string | number>)[sortColumn] ?? '';
      const valB = (b as unknown as Record<string, string | number>)[sortColumn] ?? '';
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [services, searchQuery, statusFilter, envFilter, filterDate, sortColumn, sortDirection]);

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
    }, 600);
  };

  const copyCliCommand = () => {
    navigator.clipboard?.writeText('npm i belp-ui-kit');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
    toast.info('Đã sao chép lệnh', 'Dán vào terminal để cài đặt belp-ui-kit.');
  };

  const handleDeleteService = () => {
    if (!serviceToDelete) return;
    setConfirmDeleteOpen(false);
    toast.error('Đã xóa dịch vụ', `Dịch vụ ${serviceToDelete.name} đã được gỡ bỏ khỏi hạ tầng.`);
    setServiceToDelete(null);
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
            <span
              onClick={() => setInspectingService(row)}
              className="font-semibold text-foreground tracking-tight hover:text-primary transition-colors cursor-pointer"
            >
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
      width: '130px',
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
      width: '110px',
      accessor: (row) => (
        <Badge variant="outline" mono size="sm">
          {row.environment}
        </Badge>
      ),
    },
    {
      key: 'resources',
      header: 'Tải CPU / RAM',
      width: '180px',
      accessor: (row) => (
        <div className="space-y-1 w-full max-w-[150px]">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span>CPU {row.cpuPercent}%</span>
            <span>RAM {row.ramPercent}%</span>
          </div>
          <ProgressBar
            value={row.cpuPercent}
            size="sm"
            variant={row.cpuPercent > 75 ? 'destructive' : row.cpuPercent > 50 ? 'warning' : 'primary'}
          />
        </div>
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
      width: '110px',
      accessor: (row) => (
        <span className="text-xs text-muted-foreground font-mono">{row.updatedAt}</span>
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
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setInspectingService(row)}>
              <LayersIcon className="mr-2 h-3.5 w-3.5" />
              Chi tiết Service (Drawer)
            </DropdownMenuItem>
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
              onClick={() => {
                setServiceToDelete(row);
                setConfirmDeleteOpen(true);
              }}
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
      {/* Top Navigation Bar — Belp UI Kit */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Belp UI Kit Brand Icon in #1aa7ec */}
            <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_12px_hsl(var(--primary)/0.35)]">
              <Radio className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-foreground font-sans">
                Belp UI Kit
              </span>
              <span className="text-muted-foreground/60">/</span>
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">data-dense system</span>
              <Badge variant="default" mono size="sm">
                v0.1.0
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCommandOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 h-8 text-xs text-muted-foreground hover:text-foreground border-border bg-secondary/50 font-normal"
            >
              <Search className="h-3.5 w-3.5 text-primary opacity-80" />
              <span>Tìm lệnh...</span>
              <Kbd>⌘K</Kbd>
            </Button>

            <button
              onClick={copyCliCommand}
              className="hidden md:inline-flex items-center gap-2 h-8 px-3 rounded-md border border-border bg-muted/60 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
            >
              <Terminal className="h-3.5 w-3.5 text-primary" />
              <span>npm i belp-ui-kit</span>
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
                    Triển khai dịch vụ từ GitHub Repo hoặc Docker Image lên hạ tầng đám mây.
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

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Loại dịch vụ">
                      <Select value={newServiceType} onValueChange={setNewServiceType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web Server</SelectItem>
                          <SelectItem value="worker">Worker Queue</SelectItem>
                          <SelectItem value="database">Database</SelectItem>
                          <SelectItem value="cache">Redis Cache</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField label="Số lượng Replicas (Instance)">
                      <NumberInput
                        min={1}
                        max={10}
                        value={newServiceReplicas}
                        onChange={setNewServiceReplicas}
                        suffix="pods"
                      />
                    </FormField>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => toast.info('Trang chủ', 'Đi tới Dashboard')}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => toast.info('Cụm máy chủ', 'Hạ tầng Singapore')}>Clusters</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>production-cluster</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero Section — Belp UI Kit Inter Sans */}
        <section className="space-y-2 max-w-3xl">
          <TypographyHeading level="h1" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans">
            Belp UI Kit
          </TypographyHeading>
          <TypographyText variant="lead" className="text-muted-foreground text-sm sm:text-base">
            Thư viện giao diện người dùng chuyên biệt cho ứng dụng nhiều dữ liệu. Bảng màu chủ đạo trích xuất từ D3 Design
            với sắc xanh Electric Cyan (<Code>#1aa7ec</Code>), nền Midnight Navy (<Code>#1e2f97</Code>), cùng phông chữ Inter &amp; JetBrains Mono sắc nét.
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
            title="Total CPU Load"
            value="34.2%"
            icon={<Cpu className="h-5 w-5 text-emerald-400" />}
            change={-4.5}
            changePeriod="giảm tải hệ thống"
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
          <TabsList variant="pill" className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-5 max-w-2xl">
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
            <TabsTrigger value="workflows" className="flex items-center gap-1.5">
              <Workflow className="h-3.5 w-3.5" />
              <span>Workflows &amp; Shell</span>
            </TabsTrigger>
            <TabsTrigger value="tokens" className="flex items-center gap-1.5">
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>D3 Color Tokens</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: DATA TABLE & FILTER BAR */}
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
                    Quản lý toàn bộ danh sách microservices, tiến trình build, tài nguyên tải CPU/RAM và bộ lọc ngày giờ.
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
                {/* Custom FilterBar featuring styled Radix Select & DatePicker */}
                <FilterBar
                  searchValue={searchQuery}
                  onSearchChange={setSearchQuery}
                  searchPlaceholder="Tìm service, branch, commit hash..."
                  activeFilterCount={
                    (searchQuery ? 1 : 0) +
                    (statusFilter !== 'all' ? 1 : 0) +
                    (envFilter !== 'all' ? 1 : 0) +
                    (filterDate ? 1 : 0)
                  }
                  onResetFilters={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setEnvFilter('all');
                    setFilterDate(null);
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
                  {/* Styled Radix Select for Status */}
                  <div className="w-36">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger size="sm">
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Mọi trạng thái</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="building">Building</SelectItem>
                        <SelectItem value="crashed">Crashed</SelectItem>
                        <SelectItem value="sleeping">Sleeping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Styled Radix Select for Environment */}
                  <div className="w-36">
                    <Select value={envFilter} onValueChange={setEnvFilter}>
                      <SelectTrigger size="sm">
                        <SelectValue placeholder="Môi trường" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Mọi môi trường</SelectItem>
                        <SelectItem value="production">production</SelectItem>
                        <SelectItem value="staging">staging</SelectItem>
                        <SelectItem value="preview">preview</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* DatePicker Component in FilterBar */}
                  <div className="w-40">
                    <DatePicker
                      size="sm"
                      value={filterDate}
                      onChange={setFilterDate}
                      placeholder="Lọc theo ngày..."
                    />
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
                  onRowClick={(row) => setInspectingService(row)}
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
            <Card>
              <CardHeader>
                <CardTitle>Buttons, IconButtons &amp; Links</CardTitle>
                <CardDescription>
                  Thiết kế nút với ánh xanh Electric Cyan (#1aa7ec), viền hairline và hiệu ứng active tinh tế.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="solid">Primary Solid (#1aa7ec)</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Border</Button>
                  <Button variant="ghost">Ghost Action</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link Style</Button>
                  <Button variant="solid" isLoading>Deploying...</Button>
                  <Button variant="solid" disabled>Disabled State</Button>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <IconButton
                    icon={<Play className="h-4 w-4" />}
                    aria-label="Khởi chạy container"
                    tooltip="Chạy container ngay"
                    variant="solid"
                  />
                  <IconButton
                    icon={<RefreshCw className="h-4 w-4" />}
                    aria-label="Tải lại"
                    tooltip="Làm mới trạng thái"
                    variant="outline"
                  />
                  <IconButton
                    icon={<Trash2 className="h-4 w-4" />}
                    aria-label="Xóa"
                    tooltip="Xóa service"
                    variant="destructive"
                  />

                  <div className="flex items-center gap-3 pl-4 border-l border-border/80">
                    <Link href="#docs" isExternal>Tài liệu API</Link>
                    <Link href="#support" variant="muted">Hỗ trợ kỹ thuật</Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inputs, Custom Select & Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Styled Custom Select, Inputs &amp; DatePicker</CardTitle>
                <CardDescription>
                  Bộ nhập liệu chuẩn WAI-ARIA hoàn chỉnh thay thế các điều khiển HTML native cũ.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <FormField label="Custom Radix Select">
                    <Select defaultValue="sea">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn khu vực máy chủ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Châu Á - Thái Bình Dương</SelectLabel>
                          <SelectItem value="sea">Singapore (ap-southeast-1)</SelectItem>
                          <SelectItem value="tokyo">Tokyo (ap-northeast-1)</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Hoa Kỳ</SelectLabel>
                          <SelectItem value="us-east">Virginia (us-east-1)</SelectItem>
                          <SelectItem value="us-west">Oregon (us-west-2)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormField>

                  <FormField label="DatePicker Component">
                    <DatePicker placeholder="Chọn ngày hết hạn chứng chỉ..." />
                  </FormField>

                  <FormField label="NumberInput Stepper">
                    <NumberInput min={1} max={32} defaultValue={4} suffix="vCPU" />
                  </FormField>
                </div>

                <div className="space-y-4 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-border/80 pt-4 md:pt-0">
                  <Switch
                    label="Tự động Deploy khi git push"
                    description="Xây dựng và phát hành phiên bản mới mỗi khi có commit lên nhánh main."
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
                      label="Bảo mật 2 lớp (2FA)"
                      description="Yêu cầu mã TOTP khi thay đổi biến môi trường Production."
                      defaultChecked
                    />
                  </VStack>
                </div>
              </CardContent>
            </Card>

            {/* Sliders & SegmentedControl */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-primary" />
                  <span>Sliders &amp; SegmentedControl</span>
                </CardTitle>
                <CardDescription>
                  Thanh trượt dải giá trị đơn/kép (Radix Slider) và thanh chuyển đổi chế độ siêu đậm đặc (High-density).
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>Ngưỡng giới hạn CPU Throttling:</span>
                      <Badge variant="default" mono size="sm">{cpuSliderValue[0]}%</Badge>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      value={cpuSliderValue}
                      onValueChange={setCpuSliderValue}
                      marks={[
                        { value: 0, label: '0%' },
                        { value: 25, label: '25%' },
                        { value: 50, label: '50%' },
                        { value: 75, label: '75%' },
                        { value: 100, label: '100%' },
                      ]}
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>Dải trễ phản hồi (Latency Range Filter):</span>
                      <span className="font-mono text-xs text-muted-foreground">{latencyRangeValue[0]}ms – {latencyRangeValue[1]}ms</span>
                    </div>
                    <Slider
                      min={0}
                      max={500}
                      step={10}
                      value={latencyRangeValue}
                      onValueChange={setLatencyRangeValue}
                      showValue
                      formatValue={(v) => `${v}ms`}
                    />
                  </div>
                </div>

                <div className="space-y-6 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-border/80 pt-4 md:pt-0">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase font-mono">
                      Chế độ xem bảng điều khiển (SegmentedControl MD)
                    </label>
                    <SegmentedControl
                      size="md"
                      fullWidth
                      value={activeSegment}
                      onChange={setActiveSegment}
                      options={[
                        { value: 'services', label: 'Services', icon: <Server className="h-3.5 w-3.5" /> },
                        { value: 'database', label: 'Databases', icon: <Database className="h-3.5 w-3.5" /> },
                        { value: 'cache', label: 'Cache', icon: <HardDrive className="h-3.5 w-3.5" /> },
                      ]}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase font-mono">
                      Khoảng thời gian phân tích (SegmentedControl SM)
                    </label>
                    <SegmentedControl
                      size="sm"
                      value={activeTimeframe}
                      onChange={setActiveTimeframe}
                      options={['15m', '1h', '6h', '24h', '7d', '30d']}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: COMPOSITE COMPONENTS */}
          <TabsContent value="composite" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Drawer, Overlays &amp; Progress Bar</CardTitle>
                <CardDescription>
                  Ngăn kéo trượt Drawer/Sheet, thanh tải ProgressBar, và hộp thoại xác nhận ConfirmDialog.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="solid"
                    onClick={() => setInspectingService(services[0])}
                    leftIcon={<LayersIcon className="h-4 w-4" />}
                  >
                    Mở Drawer Chi tiết Service
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => {
                      setServiceToDelete(services[0]);
                      setConfirmDeleteOpen(true);
                    }}
                  >
                    Mở ConfirmDialog Xóa
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => toast.success('Đồng bộ thành công', 'Cơ sở dữ liệu đã được backup an toàn.')}
                  >
                    Trigger Success Toast
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => toast.error('Out of Memory', 'Container chạm ngưỡng 100% RAM.')}
                  >
                    Trigger Error Toast
                  </Button>
                </div>

                <div className="space-y-3 max-w-md">
                  <ProgressBar
                    label="Dung lượng đĩa SSD NVMe"
                    value={72}
                    showValue
                    variant="primary"
                  />
                  <ProgressBar
                    label="Băng thông mạng trong tháng"
                    value={94}
                    showValue
                    variant="warning"
                  />
                  <ProgressBar
                    label="Hạn mức Pods"
                    value={40}
                    showValue
                    variant="success"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Alert variant="info">
                    <AlertTitle>Bảo trì hệ thống định kỳ</AlertTitle>
                    <AlertDescription>
                      Cụm máy chủ Singapore sẽ nâng cấp hạ tầng vào lúc 02:00 UTC Chủ nhật tới.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="success">
                    <AlertTitle>Cập nhật phiên bản v0.1.0</AlertTitle>
                    <AlertDescription>
                      Đã bổ sung đầy đủ Custom Select, DatePicker, Drawer/Sheet và ProgressBar.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Temporal Controls: DatePicker & DateRangePicker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <span>Bộ chọn Ngày &amp; Khoảng Ngày (DatePicker &amp; DateRangePicker)</span>
                </CardTitle>
                <CardDescription>
                  Thành phần chọn ngày đơn lẻ (DatePicker) và chọn dải ngày dữ liệu (DateRangePicker) với popup lịch và preset nhanh.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Single DatePicker */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground flex items-center justify-between">
                      <span>1. DatePicker (Chọn Ngày Đơn Lẻ)</span>
                      {demoSingleDate && (
                        <Badge variant="outline" mono size="sm">
                          {demoSingleDate.toLocaleDateString('vi-VN')}
                        </Badge>
                      )}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Hỗ trợ chọn ngày cụ thể, chuyển tháng nhanh, xóa ngày và cột Preset chọn nhanh (Hôm nay, Ngày mai, 7 ngày tới, 1 tháng tới).
                    </p>
                  </div>

                  <div className="space-y-3">
                    <FormField label="DatePicker với Preset chọn nhanh">
                      <DatePicker
                        showPresets
                        value={demoSingleDate}
                        onChange={setDemoSingleDate}
                        placeholder="Chọn ngày kiểm tra sự cố..."
                      />
                    </FormField>

                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-xs text-muted-foreground">Biến thể kích cỡ nhỏ (size="sm"):</span>
                      <div className="w-48">
                        <DatePicker
                          size="sm"
                          placeholder="Chọn ngày nhanh (SM)..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* DateRangePicker */}
                <div className="space-y-4 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-border/80 pt-4 md:pt-0">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground flex items-center justify-between">
                      <span>2. DateRangePicker (Chọn Dải Khoảng Ngày)</span>
                      {demoDateRange.from && (
                        <Badge variant="default" mono size="sm">
                          Dải lọc hoạt động
                        </Badge>
                      )}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Chọn ngày bắt đầu và kết thúc với dải màu highlight trực quan cùng các Preset 7 ngày/30 ngày.
                    </p>
                  </div>

                  <FormField label="Khoảng ngày báo cáo cụm máy chủ">
                    <DateRangePicker
                      value={demoDateRange}
                      onChange={setDemoDateRange}
                      placeholder="Chọn khoảng ngày phát hành..."
                    />
                  </FormField>
                </div>
              </CardContent>
            </Card>

            {/* Command Palette, TagInput & CodeSnippet */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Command className="h-5 w-5 text-primary" />
                  <span>Command Menu, TagInput &amp; CodeSnippet</span>
                </CardTitle>
                <CardDescription>
                  Công cụ tìm kiếm lệnh nhanh toàn hệ thống, quản lý thẻ gắn tags và khối hiển thị mã.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Command Palette (Hộp thoại lệnh nhanh)
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Bấm phím <Kbd>⌘K</Kbd> hoặc <Kbd>Ctrl+K</Kbd> ở bất cứ đâu để mở thanh điều hướng.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setCommandOpen(true)}
                      leftIcon={<Search className="h-4 w-4 text-primary" />}
                    >
                      Mở Command Palette
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-border/80 pt-4 md:pt-0">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <Tag className="h-4 w-4 text-primary" />
                      <span>TagInput (Quản lý nhãn gắn microservices)</span>
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Gõ tên tag rồi nhấn Enter hoặc dấu phẩy để gắn nhãn, Backspace để xóa thẻ cuối.
                    </p>
                    <TagInput
                      value={demoTags}
                      onChange={setDemoTags}
                      suggestions={['production', 'staging', 'qa', 'us-east-1', 'eu-west-1', 'canary', 'redis', 'postgres', 'docker']}
                    />
                  </div>

                  <div className="pt-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase font-mono">
                      Inline CodeSnippet với Copy 1 chạm
                    </label>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <CodeSnippet code="docker pull belp/cluster-node:latest" variant="inline" />
                      <CodeSnippet code="git checkout -b release/v0.2.0" variant="inline" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline & CodeSnippet */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Timeline &amp; CodeSnippet Terminal</span>
                </CardTitle>
                <CardDescription>
                  Dòng thời gian sự kiện triển khai hạ tầng và khối hiển thị lệnh lập trình với phông JetBrains Mono.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold mb-3">Sự kiện Cụm Gần đây (Cluster ActivityLog)</h4>
                  <Timeline items={sampleTimelineItems} />
                </div>

                <div className="space-y-4 pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-border/80 pt-4 lg:pt-0">
                  <h4 className="text-sm font-semibold mb-2">Block CodeSnippet với Terminal Copy</h4>
                  <CodeSnippet
                    language="bash"
                    code={`# Cài đặt Belp UI Kit và dependencies\nnpm install belp-ui-kit lucide-react\n\n# Khởi tạo theme provider trong root\nimport 'belp-ui-kit/style.css';`}
                  />

                  <div className="pt-2">
                    <h4 className="text-sm font-semibold mb-2">Đoạn mã Dockerfile mẫu</h4>
                    <CodeSnippet
                      language="dockerfile"
                      prefix=""
                      showLineNumbers
                      code={`FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\nCMD ["npm", "start"]`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: WORKFLOWS, ADVANCED DATA & SHELL */}
          <TabsContent value="workflows" className="space-y-6 pt-4">
            {/* Card 1: Interactive Stepper */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Workflow className="h-4 w-4 text-primary" />
                      <span>Stepper — Multi-Step Deployment Pipeline</span>
                    </CardTitle>
                    <CardDescription>
                      Thành phần điều hướng luồng quy trình nhiều bước, hỗ trợ trạng thái active, completed, clickable steps và cả 2 chế độ ngang / dọc.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={activeWorkflowStep === 0}
                      onClick={() => setActiveWorkflowStep((prev) => Math.max(0, prev - 1))}
                    >
                      Bước trước
                    </Button>
                    <Button
                      variant="solid"
                      size="sm"
                      disabled={activeWorkflowStep === workflowSteps.length - 1}
                      onClick={() => setActiveWorkflowStep((prev) => Math.min(workflowSteps.length - 1, prev + 1))}
                    >
                      Bước tiếp theo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Stepper
                  steps={workflowSteps}
                  activeStep={activeWorkflowStep}
                  onStepClick={(index) => setActiveWorkflowStep(index)}
                />

                <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Nội dung cấu hình bước {activeWorkflowStep + 1}:
                      </div>
                      <h4 className="text-base font-bold text-foreground">
                        {workflowSteps[activeWorkflowStep]?.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {workflowSteps[activeWorkflowStep]?.description}
                      </p>
                    </div>
                    <Badge variant={activeWorkflowStep === 3 ? 'success' : 'default'} mono size="sm">
                      Step {activeWorkflowStep + 1} of {workflowSteps.length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Combobox & File Upload */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Combobox */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-primary" />
                    <span>Combobox (Autocomplete &amp; Search)</span>
                  </CardTitle>
                  <CardDescription>
                    Hộp chọn tìm kiếm thời gian thực với icon, mô tả chi tiết, hỗ trợ tạo tùy chọn mới và phím tắt bàn phím.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    label="Chọn Cụm Máy Chủ Mục Tiêu (Cluster Node)"
                    hint="Nhập tên khu vực hoặc mã node để lọc nhanh"
                  >
                    <Combobox
                      options={clusterNodeOptions}
                      value={selectedClusterNode}
                      onChange={(val) => {
                        setSelectedClusterNode(val);
                        toast.info('Đã chọn node', `Node kết nối: ${val}`);
                      }}
                      placeholder="Tìm kiếm khu vực hoặc node..."
                      searchPlaceholder="Gõ để tìm kiếm..."
                    />
                  </FormField>

                  <div className="text-xs rounded-md bg-muted/30 p-3 border border-border flex items-center justify-between font-mono">
                    <span className="text-muted-foreground">Selected Value:</span>
                    <Code className="text-primary font-bold">{selectedClusterNode || 'Chưa chọn node'}</Code>
                  </div>
                </CardContent>
              </Card>

              {/* File Upload Dropzone */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UploadCloud className="h-4 w-4 text-primary" />
                    <span>FileUpload / Dropzone</span>
                  </CardTitle>
                  <CardDescription>
                    Kéo thả tệp tin hoặc duyệt thư mục, hỗ trợ định dạng giới hạn, dung lượng tối đa và xem danh sách tệp đính kèm.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FileUpload
                    value={demoUploadedFiles}
                    onChange={(files) => {
                      setDemoUploadedFiles(files);
                      if (files.length > 0) {
                        toast.success('Tải tệp thành công', `Đã đính kèm ${files.length} tệp.`);
                      }
                    }}
                    accept=".json,.yaml,.yml,.env,.zip,.tar.gz"
                    maxSize={15 * 1024 * 1024}
                    description="Hỗ trợ .json, .yaml, .env, .zip tối đa 15MB"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Card 3: Sidebar Shell & TreeView Navigation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Live Mini App Sidebar */}
              <Card className="lg:col-span-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-primary" />
                        <span>Sidebar Navigation Shell</span>
                      </CardTitle>
                      <CardDescription>
                        Thanh điều hướng bên ứng dụng với khả năng thu gọn / mở rộng mượt mà, phân nhóm mục và badge số liệu.
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSidebarDemoCollapsed((prev) => !prev)}
                    >
                      {sidebarDemoCollapsed ? 'Mở rộng' : 'Thu gọn'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border border-border rounded-lg overflow-hidden bg-card/50 flex min-h-[380px]">
                    <Sidebar
                      collapsed={sidebarDemoCollapsed}
                      onCollapsedChange={setSidebarDemoCollapsed}
                      className="border-r border-border"
                      header={
                        <div className="flex items-center gap-2 px-1">
                          <div className="h-6 w-6 rounded bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                            B
                          </div>
                          {!sidebarDemoCollapsed && (
                            <span className="font-semibold text-xs text-foreground tracking-tight">
                              Belp Console
                            </span>
                          )}
                        </div>
                      }
                      footer={
                        <SidebarItem
                          id="settings"
                          icon={<Settings className="h-4 w-4" />}
                          label="Cài đặt hệ thống"
                          collapsed={sidebarDemoCollapsed}
                          active={sidebarActiveId === 'settings'}
                          onClick={() => setSidebarActiveId('settings')}
                        />
                      }
                    >
                      <SidebarGroup title="Tổng Quan">
                        <SidebarItem
                          id="dashboard"
                          icon={<LayoutGrid className="h-4 w-4" />}
                          label="Bảng điều khiển"
                          collapsed={sidebarDemoCollapsed}
                          active={sidebarActiveId === 'dashboard'}
                          badge={<Badge variant="success" size="sm">Live</Badge>}
                          onClick={() => setSidebarActiveId('dashboard')}
                        />
                        <SidebarItem
                          id="services"
                          icon={<Server className="h-4 w-4" />}
                          label="Dịch vụ Đang chạy"
                          collapsed={sidebarDemoCollapsed}
                          active={sidebarActiveId === 'services'}
                          badge={<Badge variant="default" mono size="sm">8</Badge>}
                          onClick={() => setSidebarActiveId('services')}
                        />
                        <SidebarItem
                          id="clusters"
                          icon={<Globe className="h-4 w-4" />}
                          label="Cụm Máy Chủ"
                          collapsed={sidebarDemoCollapsed}
                          active={sidebarActiveId === 'clusters'}
                          onClick={() => setSidebarActiveId('clusters')}
                        />
                      </SidebarGroup>

                      <SidebarGroup title="Bảo Mật &amp; CI/CD">
                        <SidebarItem
                          id="pipelines"
                          icon={<GitFork className="h-4 w-4" />}
                          label="Git Pipelines"
                          collapsed={sidebarDemoCollapsed}
                          active={sidebarActiveId === 'pipelines'}
                          onClick={() => setSidebarActiveId('pipelines')}
                        />
                        <SidebarItem
                          id="audit"
                          icon={<Terminal className="h-4 w-4" />}
                          label="Audit Logs"
                          collapsed={sidebarDemoCollapsed}
                          active={sidebarActiveId === 'audit'}
                          onClick={() => setSidebarActiveId('audit')}
                        />
                      </SidebarGroup>
                    </Sidebar>

                    <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-muted/10">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <Activity className="h-5 w-5" />
                      </div>
                      <h4 className="font-semibold text-sm text-foreground">
                        Nội dung màn hình: <span className="text-primary font-mono">{sidebarActiveId}</span>
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                        Nhấn vào các mục menu bên trái để chuyển tab và kiểm tra hiệu ứng chuyển trạng thái linh hoạt.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* TreeView File Browser */}
              <Card className="lg:col-span-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderTree className="h-4 w-4 text-primary" />
                    <span>TreeView — Hierarchical File Explorer</span>
                  </CardTitle>
                  <CardDescription>
                    Cấu trúc cây thư mục phân cấp nhiều cấp, có thể mở/thu gọn đệ quy, chọn node và hỗ trợ icon tùy chỉnh từng mục.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-border rounded-lg p-3 bg-muted/20 min-h-[380px] overflow-y-auto">
                    <TreeView
                      data={repositoryTreeData}
                      selectedId={selectedTreeId}
                      onSelectNode={(node: TreeNode) => {
                        setSelectedTreeId(node.id);
                        toast.info('Chọn tệp tin', `Đang mở file: ${node.label}`);
                      }}
                      defaultExpandedIds={['src', 'components', 'composite', 'data']}
                    />
                  </div>

                  <div className="text-xs rounded-md bg-muted/30 p-2.5 border border-border flex items-center justify-between font-mono">
                    <span className="text-muted-foreground">Active File / Folder:</span>
                    <Code className="text-emerald-400 font-semibold">{selectedTreeId || 'chưa chọn'}</Code>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 5: D3 DESIGN COLOR TOKENS */}
          <TabsContent value="tokens" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Bảng mã màu Design Tokens (D3 Design Inspiration)</CardTitle>
                <CardDescription>
                  Bảng màu trích xuất từ `https://d3design.vn/uploads/03.jpg` tạo nên phong cách độc bản cho Belp UI Kit.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3">5 Gam màu cốt lõi</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                    <div className="rounded-lg p-3 border border-primary/40 bg-primary text-primary-foreground font-mono space-y-1">
                      <div className="font-semibold text-sm">Primary</div>
                      <div className="text-[11px] opacity-90">#1aa7ec</div>
                      <div className="text-[10px] opacity-75">Cyan Blue</div>
                    </div>

                    <div className="rounded-lg p-3 border border-border bg-[#1e2f97] text-white font-mono space-y-1">
                      <div className="font-semibold text-sm">Deep Navy</div>
                      <div className="text-[11px] opacity-90">#1e2f97</div>
                      <div className="text-[10px] opacity-75">Dark Surface</div>
                    </div>

                    <div className="rounded-lg p-3 border border-emerald-500/30 bg-[#4adede] text-slate-900 font-mono space-y-1">
                      <div className="font-semibold text-sm">Aqua Mint</div>
                      <div className="text-[11px] opacity-90">#4adede</div>
                      <div className="text-[10px] opacity-75">Live Indicator</div>
                    </div>

                    <div className="rounded-lg p-3 border border-border bg-[#797ef6] text-white font-mono space-y-1">
                      <div className="font-semibold text-sm">Periwinkle</div>
                      <div className="text-[11px] opacity-90">#797ef6</div>
                      <div className="text-[10px] opacity-75">Iris Highlight</div>
                    </div>

                    <div className="rounded-lg p-3 border border-border bg-[#7dd6f6] text-slate-900 font-mono space-y-1">
                      <div className="font-semibold text-sm">Ice Sky</div>
                      <div className="text-[11px] opacity-90">#7dd6f6</div>
                      <div className="text-[10px] opacity-75">Info Accent</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Typography Pairing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 border border-border rounded-lg bg-card space-y-1">
                      <span className="text-muted-foreground uppercase text-[10px]">Headings &amp; UI Body</span>
                      <p className="font-sans text-lg font-bold text-foreground">Inter (400 - 800)</p>
                      <p className="text-muted-foreground text-xs">Sử dụng cho toàn bộ Heading, Button, Label, Input với độ sắc nét tuyệt đối ở mọi kích cỡ.</p>
                    </div>
                    <div className="p-4 border border-border rounded-lg bg-card space-y-1">
                      <span className="text-muted-foreground uppercase text-[10px]">Code &amp; Technical Metrics</span>
                      <p className="font-mono text-lg font-medium text-foreground">JetBrains Mono (400 - 600)</p>
                      <p className="text-muted-foreground text-xs">Sử dụng cho Commit hashes, Endpoints, Terminal commands, vCPU/RAM.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Service Detail Drawer / Sheet */}
      <Drawer
        open={Boolean(inspectingService)}
        onOpenChange={(open) => !open && setInspectingService(null)}
      >
        <DrawerContent side="right" className="sm:max-w-lg">
          {inspectingService && (
            <div className="flex flex-col h-full">
              <DrawerHeader>
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-primary">
                    <Server className="h-4 w-4" />
                  </div>
                  <DrawerTitle>{inspectingService.name}</DrawerTitle>
                </div>
                <DrawerDescription>
                  Thông tin cấu hình chi tiết, biến môi trường và tài nguyên container.
                </DrawerDescription>
              </DrawerHeader>

              <div className="py-6 space-y-6 flex-1 overflow-y-auto pr-1">
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    Chỉ số Tài nguyên Hiện tại
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border border-border rounded-lg bg-muted/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Tải CPU</span>
                        <span className="font-mono font-semibold">{inspectingService.cpuPercent}%</span>
                      </div>
                      <ProgressBar value={inspectingService.cpuPercent} size="sm" />
                    </div>

                    <div className="p-3 border border-border rounded-lg bg-muted/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Tải RAM</span>
                        <span className="font-mono font-semibold">{inspectingService.ramPercent}%</span>
                      </div>
                      <ProgressBar value={inspectingService.ramPercent} size="sm" variant="success" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                    Thông tin Triển khai
                  </h4>
                  <div className="divide-y divide-border/60 text-xs">
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-muted-foreground">Service ID:</span>
                      <Code>{inspectingService.id}</Code>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-muted-foreground">Git Branch:</span>
                      <span className="font-mono">{inspectingService.branch}</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-muted-foreground">Commit Hash:</span>
                      <Code>{inspectingService.commitHash}</Code>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-muted-foreground">Endpoint:</span>
                      <a
                        href={`https://${inspectingService.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline font-mono"
                      >
                        {inspectingService.url}
                      </a>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-muted-foreground">Ngày cập nhật:</span>
                      <span className="font-mono">{inspectingService.updatedAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Đóng</Button>
                </DrawerClose>
                <Button
                  variant="solid"
                  onClick={() => {
                    toast.success('Khởi động lại', `Đang restart ${inspectingService.name}`);
                    setInspectingService(null);
                  }}
                >
                  Restart Service
                </Button>
              </DrawerFooter>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Xác nhận dừng và xóa dịch vụ?"
        description={`Hành động này sẽ hủy container ${serviceToDelete?.name || ''} và giải phóng toàn bộ endpoint liên kết. Thao tác không thể hoàn tác.`}
        confirmLabel="Xác nhận Xóa"
        variant="destructive"
        onConfirm={handleDeleteService}
      />

      {/* Global Command Menu */}
      <CommandMenu
        open={commandOpen}
        onOpenChange={setCommandOpen}
        actions={commandActions}
      />

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 text-center text-xs text-muted-foreground">
        <p>Belp UI Kit — Thư viện UI hiện đại, tối ưu cho ứng dụng nhiều dữ liệu.</p>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground/80">
          v0.1.0 • Built with React 18, Tailwind CSS, Radix UI Primitives and TypeScript.
        </p>
      </footer>
    </div>
  );
}
