# Kế hoạch Thực hiện: Belp UI Kit (TASKS.md)

## Tiến độ Tổng quan

- [x] **Giai đoạn 0: Phân tích & Tài liệu hóa (Analysis & Documentation)**
  - [x] Đọc và đối chiếu `building-component-library.md`.
  - [x] Trích xuất bảng màu chuẩn từ `https://d3design.vn/uploads/03.jpg`.
  - [x] Cập nhật tài liệu `docs/REQUIREMENTS.md`.
  - [x] Cập nhật tài liệu `docs/ARCHITECTURE.md`.
  - [x] Cập nhật `docs/TASKS.md`, `docs/VERSIONING.md`, và `README.md`.
  - [x] Khởi tạo Git repository (`git init`), cấu hình `.gitignore`, `.env.example`.

- [x] **Giai đoạn 1: Khởi tạo Project & Tầng 0 (Foundations & Design Tokens)**
  - [x] Khởi tạo dự án Vite + React + TypeScript.
  - [x] Cài đặt các thư viện lõi: `tailwindcss`, `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, `@radix-ui/react-*`.
  - [x] Thiết lập bảng màu Tokens chủ đạo D3 Design: Electric Cyan `#1aa7ec`, Midnight Navy `#1e2f97`, Aqua Mint `#4adede`, Periwinkle `#797ef6`, Soft Sky `#7dd6f6`.
  - [x] Cấu hình phông chuẩn: **Inter** (Heading, Body, Controls) và **JetBrains Mono** (Code, Hashes, Metrics).
  - [x] Xây dựng theme switcher (Light / Dark mode toggle) có lưu trữ `localStorage`, chống FOUC và cấu hình `color-scheme` cấp trình duyệt.
  - [x] Xây dựng tiện ích `cn()` (`clsx` + `twMerge`).

- [x] **Giai đoạn 2: Đợt 1 — Primitives**
  - [x] `Button` (variants: solid, secondary, outline, ghost, destructive, link; sizes: sm, md, lg, icon; loading spinner, disabled, active scale).
  - [x] `IconButton` & `Link`.
  - [x] `Input` (prefix/suffix icon, isClearable, showPasswordToggle, hasError, disabled).
  - [x] `Textarea` (showCount, maxLength, error state).
  - [x] `Checkbox` (Radix primitive, label + description, indeterminate support).
  - [x] `RadioGroup` & `RadioGroupItem` (Radix primitive, label + description).
  - [x] `Switch` (Radix primitive, smooth sliding thumb).
  - [x] `Select` (Radix Select tùy chỉnh với Trigger, Content, Item, Group, Label, Separator, hoàn toàn thay thế native select).
  - [x] `Slider` (Radix Slider thanh trượt đơn và dải khoảng cách dual-thumb với step, marks, tooltip).
  - [x] `SegmentedControl` (Chuyển đổi chế độ siêu đậm đặc cho chế độ xem và bộ lọc dữ liệu).
  - [x] `Typography` (`Heading` h1-h6 bằng phông Inter, `Text`, `Code`, `Kbd`).
  - [x] `Badge` (status colors: default, success, warning, destructive, info, outline; dot indicator; glowing pulse effect; monospace variant).
  - [x] `Avatar` (image src, fallback initials, status badge online/busy/away/offline).
  - [x] `Divider` (horizontal/vertical, center label).
  - [x] `Spinner` (size và color variants).
  - [x] `Card` (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter).
  - [x] `Stack` (`HStack`, `VStack`, `Stack` flex layout).

- [x] **Giai đoạn 3: Đợt 2 — Composite Components**
  - [x] `FormField` (tự động liên kết id, label, required mark, hint, error message, WAI-ARIA `aria-describedby` và `aria-invalid`).
  - [x] `DatePicker` (bộ chọn ngày Calendar Popover tương tác, format ngày, điều hướng tháng/năm, clear button, presets).
  - [x] `DateRangePicker` (bộ chọn khoảng ngày start/end với các preset nhanh).
  - [x] `NumberInput` / `CurrencyInput` (ô nhập số kèm nút tăng/giảm stepper và định dạng).
  - [x] `TagInput` / `MultiSelect` (ô chọn và nhập đa thẻ kèm xóa nhanh và tìm kiếm).
  - [x] `Modal / Dialog` (Radix Dialog: Portal, focus trap, escape key, overlay backdrop blur, animated scale-in).
  - [x] `Drawer / Sheet` (Radix Dialog: Panel trượt từ cạnh phải/trái/dưới/trên).
  - [x] `CommandMenu` (Command Palette `Cmd+K` / `Ctrl+K` tìm kiếm điều hướng toàn hệ thống).
  - [x] `Tooltip` (Radix Tooltip: Hover & focus triggered).
  - [x] `DropdownMenu` (Radix Dropdown: Items, Labels, Separators, Destructive actions).
  - [x] `Popover` (Radix Popover: Rich interactive floating panel).
  - [x] `Alert` (Info, Success, Warning, Destructive with dismiss button).
  - [x] `ProgressBar` (Thanh tiến trình với kích thước và màu sắc chủ đạo).
  - [x] `Timeline` / `ActivityLog` (Chuỗi sự kiện theo trục thời gian kèm trạng thái và avatar).
  - [x] `CodeSnippet` / `CopyButton` (Hiển thị lệnh/mã kèm nút copy 1 chạm).
  - [x] `Skeleton` (Shimmer animated loading placeholder).
  - [x] `EmptyState` (Icon minh họa, Tiêu đề, Mô tả, CTA action).
  - [x] `ConfirmDialog` (Hộp thoại xác nhận nhanh các hành động quan trọng).
  - [x] `Toast` (ToastProvider, `useToast` hook: `toast.success`, `toast.error`, `toast.warning`, `toast.info`, auto-dismiss & stacked layout).

- [x] **Giai đoạn 6: Tối ưu Mượt mà hóa Animation & Hoàn thiện DatePicker**
  - [x] Cài đặt `tailwindcss-animate`, cấu hình cubic-bezier transitions (`spring`, `smooth`) trong `tailwind.config.js`.
  - [x] Đồng bộ hóa các hiệu ứng mở/đóng mượt mà cho: Popover, Tooltip, Dialog, Drawer, DropdownMenu, Select, CommandMenu, DatePicker.
  - [x] Nâng cấp `DatePicker` độc lập: hỗ trợ preset nhanh, calendar navigation tinh tế, nút xóa, hiển thị ngày rõ nét.
  - [x] Bổ sung card trình diễn chuyên biệt cho `DatePicker` và `DateRangePicker` song song trong Tab Composite và FilterBar của Showcase.

- [x] **Giai đoạn 4: Đợt 3 — Nâng cao cho Dữ liệu lớn (Data-Dense Components)**
  - [x] `DataTable` (Generic `<T>` type-safe table, sorting header, row selection checkbox with select-all/indeterminate, sticky header, 3 chế độ density: compact/default/relaxed, integrated loading skeleton & empty state).
  - [x] `Pagination` (Page size selector: 10/25/50/100, page numbers with ellipsis, next/prev/first/last, item counter).
  - [x] `FilterBar` (Search input with instant clear, tích hợp custom Select & DatePicker, đếm bộ lọc, nút Reset).
  - [x] `Breadcrumb` (Điều hướng phân cấp dạng cây).
  - [x] `MetricCard / StatCard` (KPI value, delta percentage with positive/negative trend colors, comparison period, leading icon).
  - [x] `Tabs` (Radix Tabs với biến thể Pill và Underline).
  - [x] `Accordion` (Radix Accordion với smooth chevron animation).

- [x] **Giai đoạn 5: Interactive Showcase & Build Configuration**
  - [x] Áp dụng màu chủ đạo `#1aa7ec` và bảng màu D3 Design xuyên suốt toàn bộ showcase.
  - [x] Thêm demo cho `Select` tùy chỉnh, `DatePicker`, `Drawer/Sheet`, `ProgressBar`, `Breadcrumb`, `ConfirmDialog`.
  - [x] Kiểm thử TypeScript `tsc --noEmit` đạt 0 lỗi, Showcase build đạt 100%, Library build đạt 100%.
  - [x] Commit Git & tài liệu hoàn tất.
