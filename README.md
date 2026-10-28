# Belp UI Kit

<div align="center">

![Belp UI Kit Banner](https://img.shields.io/badge/Belp%20UI%20Kit-v0.1.0-853bce?style=for-the-badge&logo=react&logoColor=white)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4-38bdf8?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix%20UI-Headless-161618?style=flat-square&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Thư viện UI hiện đại, độc lập, tối ưu hóa cho các ứng dụng nhiều dữ liệu (Data-Dense Applications, Dashboards, Admin Portals & Cloud Panels).**

[Trải nghiệm Preview](http://localhost:4173/) • [Tài liệu Kiến trúc](docs/ARCHITECTURE.md) • [Lịch sử Phiên bản](docs/VERSIONING.md) • [Tiến độ Tasks](docs/TASKS.md)

</div>

---

## 💡 Triết lý Thiết kế (Design Philosophy)

**Belp UI Kit** được sinh ra để giải quyết bài toán: *Xây dựng một phong cách giao diện độc bản, nhất quán tuyệt đối xuyên suốt các bảng dữ liệu lớn, bảng điều khiển phức tạp và các luồng nghiệp vụ dày đặc.*

1. **Dark-First Technical Aesthetic**:
   - Lấy cảm hứng từ phong cách kỹ thuật cao cấp của Railway: Màu nền đen thẫm (`#0b0b0f`), bề mặt thẻ tím than (`#13111c`), viền hairline sắc nét `1px`, và điểm nhấn sắc tím điện tử **Electric Violet (`#853bce`)**.
   - Hỗ trợ chuyển đổi **Light Mode** sạch sẽ, tinh giản và thanh lịch chỉ với một thuộc tính class `dark`/`light`.
2. **Typography chuẩn xác**:
   - Sử dụng phông **Inter** cho toàn bộ tiêu đề, nhãn và văn bản giao diện — đem lại độ rõ nét tối đa ở mọi kích cỡ màn hình.
   - Sử dụng phông **JetBrains Mono** cho mã lệnh, commit hash, endpoints, cổng mạng và tài nguyên kỹ thuật.
3. **Chuyên trị Dữ liệu lớn (Data-Dense Focus)**:
   - Thành phần `DataTable` linh hoạt hỗ trợ 3 chế độ mật độ hiển thị (`compact` 36px cho bảng tài chính nhiều dòng, `default` 44px, `relaxed` 56px).
   - Chọn dòng (Single/Multi-row Selection) có nhận diện trạng thái bán phần (*indeterminate*).
   - Ghim tiêu đề bảng (`stickyHeader`) và phân trang mượt mà.
4. **WAI-ARIA & Headless Foundation**:
   - Xây dựng trên nền tảng **Radix UI**, đảm bảo 100% tuân thủ tiêu chuẩn tiếp cận WAI-ARIA, quản lý bẫy tiêu điểm (focus trap), hỗ trợ phím tắt bàn phím hoàn hảo.

---

## 📦 Cài đặt (Installation)

Cài đặt package cùng các peer dependencies:

```bash
npm install belp-ui-kit
# hoặc
pnpm add belp-ui-kit
# hoặc
yarn add belp-ui-kit
```

### Peer Dependencies cần thiết:
```bash
npm install react react-dom lucide-react class-variance-authority clsx tailwind-merge
```

---

## ⚙️ Cấu hình Dự án (Setup)

### 1. Import Stylesheet
Import file CSS chứa toàn bộ Design Tokens và biến CSS Variables vào file entry của ứng dụng (`main.tsx` hoặc `App.tsx`):

```tsx
import 'belp-ui-kit/style.css';
```

### 2. Cấu hình Tailwind CSS
Trong file `tailwind.config.js` của dự án, mở rộng đường dẫn quét component:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/belp-ui-kit/dist/**/*.{js,css}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 3. Bọc Toast Provider
Để sử dụng hệ thống thông báo Toast nổi, hãy bọc `ToastProvider` ở root component:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from 'belp-ui-kit';
import App from './App';
import 'belp-ui-kit/style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);
```

---

## 🚀 Hướng dẫn Sử dụng Chi tiết (Usage Examples)

### 1. Nút bấm (Button)
Đầy đủ các biến thể và trạng thái loading, icon:

```tsx
import { Button } from 'belp-ui-kit';
import { Plus, Download } from 'lucide-react';

export function ActionButtons() {
  return (
    <div className="flex gap-3">
      {/* Nút chính tím Electric Violet */}
      <Button variant="solid" leftIcon={<Plus className="h-4 w-4" />}>
        Tạo mới
      </Button>

      {/* Nút thứ cấp viền hairline */}
      <Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>
        Xuất dữ liệu
      </Button>

      {/* Trạng thái Loading */}
      <Button variant="solid" isLoading>
        Đang xử lý...
      </Button>

      {/* Nút hành động nguy hiểm */}
      <Button variant="destructive">
        Xóa bản ghi
      </Button>
    </div>
  );
}
```

---

### 2. Form Field & Tự động Bắt lỗi (FormField)
Tự động đồng bộ `id`, nhãn bắt buộc `required`, thông điệp trợ giúp và cảnh báo lỗi chuẩn WAI-ARIA:

```tsx
import { FormField, Input, Textarea } from 'belp-ui-kit';
import { useState } from 'react';

export function UserForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="space-y-4 max-w-md">
      <FormField
        label="Email công việc"
        required
        hint="Hệ thống sẽ gửi mã kích hoạt đến email này"
        error={error}
      >
        <Input
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isClearable
          onClear={() => setEmail('')}
        />
      </FormField>

      <FormField label="Ghi chú cấu hình">
        <Textarea placeholder="Nhập thêm chi tiết..." showCount maxLength={200} />
      </FormField>
    </div>
  );
}
```

---

### 3. Bảng Dữ liệu Lớn (DataTable) & Phân trang (Pagination)
Hỗ trợ Generic type `<T>`, sắp xếp cột, chọn dòng, và điều chỉnh mật độ hiển thị (`compact`/`default`/`relaxed`):

```tsx
import { DataTable, ColumnDef, Pagination, Badge } from 'belp-ui-kit';
import { useState } from 'react';

interface Deployment {
  id: string;
  name: string;
  status: 'active' | 'building' | 'failed';
  cpu: string;
}

const columns: ColumnDef<Deployment>[] = [
  {
    key: 'name',
    header: 'Tên Dịch vụ',
    sortable: true,
    accessor: (row) => <span className="font-semibold text-foreground">{row.name}</span>,
  },
  {
    key: 'status',
    header: 'Trạng thái',
    align: 'center',
    accessor: (row) => (
      <Badge
        variant={row.status === 'active' ? 'success' : row.status === 'building' ? 'default' : 'destructive'}
        withDot
        pulse={row.status === 'active' || row.status === 'building'}
      >
        {row.status.toUpperCase()}
      </Badge>
    ),
  },
  {
    key: 'cpu',
    header: 'Tài nguyên',
    accessor: (row) => <span className="font-mono text-xs">{row.cpu}</span>,
  },
];

export function ServiceTable() {
  const [data] = useState<Deployment[]>([
    { id: '1', name: 'api-gateway', status: 'active', cpu: '0.25 vCPU' },
    { id: '2', name: 'worker-queue', status: 'building', cpu: '0.50 vCPU' },
  ]);

  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-4">
      <DataTable<Deployment>
        data={data}
        columns={columns}
        rowKey={(row) => row.id}
        density="compact"
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      />

      <Pagination
        currentPage={page}
        totalPages={5}
        totalItems={50}
        pageSize={10}
        onPageChange={setPage}
      />
    </div>
  );
}
```

---

### 4. Thẻ Thống kê KPI (MetricCard)

```tsx
import { MetricCard } from 'belp-ui-kit';
import { Server } from 'lucide-react';

export function ClusterKPI() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Active Services"
        value="12 Cụm"
        icon={<Server className="h-5 w-5" />}
        change={8.4}
        changePeriod="so với tuần trước"
      />
    </div>
  );
}
```

---

### 5. Thông báo Toast (useToast)

```tsx
import { Button, useToast } from 'belp-ui-kit';

export function TriggerNotifications() {
  const toast = useToast();

  return (
    <div className="flex gap-2">
      <Button onClick={() => toast.success('Thành công', 'Bản ghi đã được lưu vào cơ sở dữ liệu.')}>
        Báo thành công
      </Button>

      <Button variant="destructive" onClick={() => toast.error('Lỗi kết nối', 'Không thể đồng bộ với server.')}>
        Báo lỗi
      </Button>
    </div>
  );
}
```

---

## 🛠️ Lệnh Phát triển & Kiểm thử (CLI Scripts)

Dự án cung cấp sẵn môi trường Showcase tương tác để bạn phát triển và kiểm tra component trực tiếp:

```bash
# Cài đặt toàn bộ dependencies
npm install

# Khởi chạy Interactive Showcase Playground tại http://localhost:5173/
npm run dev

# Đóng gói bản phân phối thư viện vào thư mục dist/ (ESM + UMD + CSS + .d.ts)
npm run build

# Build phiên bản production của trang Showcase
npm run build:showcase

# Khởi chạy preview server kiểm tra bản build tại http://localhost:4173/
npm run preview
```

---

## 📂 Cấu trúc Thư mục Nguồn

```text
belp-ui-kit/
├── docs/                     # Tài liệu thiết kế & lộ trình
│   ├── REQUIREMENTS.md       # Đặc tả yêu cầu kỹ thuật
│   ├── ARCHITECTURE.md       # Sơ đồ kiến trúc & nguyên tắc SOLID
│   ├── TASKS.md              # Quản lý tiến độ triển khai
│   └── VERSIONING.md         # Lịch sử phiên bản & SemVer
├── src/
│   ├── tokens/               # Tầng 0: Bảng mã màu, Spacing & Typography CSS
│   │   ├── colors.css        # Biến màu Light & Dark Mode
│   │   ├── typography.css    # Font scales Inter & JetBrains Mono
│   │   ├── spacing.css       # Hệ thống lưới 4px/8px & elevation shadows
│   │   └── index.css         # Điểm hợp nhất CSS Tokens
│   ├── components/
│   │   ├── primitives/       # Đợt 1: Button, Input, Checkbox, Switch, Typography...
│   │   ├── composite/        # Đợt 2: FormField, Dialog, Tooltip, Toast, Alert...
│   │   └── data/             # Đợt 3: DataTable, Pagination, FilterBar, MetricCard...
│   ├── showcase/             # Ứng dụng Showcase Playground tương tác
│   ├── utils/                # Helper cn() merge Tailwind an toàn
│   └── index.ts              # Entrypoint xuất khẩu toàn bộ thư viện
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 📄 Bản quyền (License)

Được phát triển và phát hành dưới giấy phép [MIT License](LICENSE).
Mọi đóng góp, đề xuất và phản hồi đều được chào đón!
