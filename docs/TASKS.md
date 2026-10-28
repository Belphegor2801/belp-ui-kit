# Kế hoạch Thực hiện: Belp UI Kit (TASKS.md)

## Tiến độ Tổng quan

- [x] **Giai đoạn 0: Phân tích & Tài liệu hóa (Analysis & Documentation)**
  - [x] Đọc và đối chiếu `building-component-library.md`.
  - [x] Khởi tạo tài liệu `docs/REQUIREMENTS.md`.
  - [x] Khởi tạo tài liệu `docs/ARCHITECTURE.md`.
  - [x] Khởi tạo `docs/TASKS.md` và `README.md`.
  - [x] Khởi tạo Git repository (`git init`), cấu hình `.gitignore`, `.env.example`.

- [x] **Giai đoạn 1: Khởi tạo Project & Tầng 0 (Foundations & Design Tokens)**
  - [x] Khởi tạo dự án Vite + React + TypeScript.
  - [x] Cài đặt các thư viện lõi: `tailwindcss`, `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, `@radix-ui/react-*`.
  - [x] Thiết lập bảng màu Tokens và CSS Variables (`colors.css`, `typography.css`, `spacing.css`, `index.css`).
  - [x] Xây dựng theme switcher (Light / Dark mode toggle) có lưu trữ `localStorage`.
  - [x] Xây dựng tiện ích `cn()` (`clsx` + `twMerge`).

- [x] **Giai đoạn 2: Đợt 1 — Primitives**
  - [x] `Button` (variants: solid, secondary, outline, ghost, destructive, link; sizes: sm, md, lg, icon; loading spinner, disabled, active scale).
  - [x] `Input` (prefix/suffix icon, isClearable, showPasswordToggle, hasError, disabled).
  - [x] `Textarea` (showCount, maxLength, error state).
  - [x] `Checkbox` (Radix primitive, label + description, indeterminate support).
  - [x] `RadioGroup` & `RadioGroupItem` (Radix primitive, label + description).
  - [x] `Switch` (Radix primitive, smooth sliding thumb).
  - [x] `Typography` (`Heading` h1-h6, `Text`, `Code`, `Kbd`).
  - [x] `Badge` (status colors: default, success, warning, destructive, info, outline; dot indicator; removable tag).
  - [x] `Avatar` (image src, fallback initials, status badge online/busy/away/offline).
  - [x] `Divider` (horizontal/vertical, center label).
  - [x] `Spinner` (size và color variants).
  - [x] `Card` (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter).
  - [x] `Stack` (`HStack`, `VStack`, `Stack` flex layout).

- [x] **Giai đoạn 3: Đợt 2 — Composite Components**
  - [x] `FormField` (tự động liên kết id, label, required mark, hint, error message, WAI-ARIA `aria-describedby` và `aria-invalid`).
  - [x] `Modal / Dialog` (Radix Dialog: Portal, focus trap, escape key, overlay backdrop blur, animated scale-in).
  - [x] `Tooltip` (Radix Tooltip: Hover & focus triggered).
  - [x] `DropdownMenu` (Radix Dropdown: Items, Labels, Separators, Destructive actions).
  - [x] `Popover` (Radix Popover: Rich interactive floating panel).
  - [x] `Alert` (Info, Success, Warning, Destructive with dismiss button).
  - [x] `Skeleton` (Shimmer animated loading placeholder).
  - [x] `EmptyState` (Icon minh họa, Tiêu đề, Mô tả, CTA action).
  - [x] `Toast` (ToastProvider, `useToast` hook: `toast.success`, `toast.error`, `toast.warning`, `toast.info`, auto-dismiss & stacked layout).

- [x] **Giai đoạn 4: Đợt 3 — Nâng cao cho Dữ liệu lớn (Data-Dense Components)**
  - [x] `DataTable` (Generic `<T>` type-safe table, sorting header, row selection checkbox with select-all/indeterminate, sticky header, 3 chế độ density: compact/default/relaxed, integrated loading skeleton & empty state).
  - [x] `Pagination` (Page size selector: 10/25/50/100, page numbers with ellipsis, next/prev/first/last, item counter).
  - [x] `FilterBar` (Search input with instant clear, filter slots, active filter badge & reset filters button).
  - [x] `MetricCard / StatCard` (KPI value, delta percentage with positive/negative trend colors, comparison period, leading icon).
  - [x] `Tabs` (Radix Tabs với biến thể Pill và Underline).
  - [x] `Accordion` (Radix Accordion với smooth chevron animation).

- [x] **Giai đoạn 5: Interactive Showcase & Build Configuration**
  - [x] Xây dựng ứng dụng Playground tương tác trực tiếp (`src/showcase/App.tsx`) với đầy đủ các tab Tokens, Primitives, Composite, và Live Data Management Dashboard.
  - [x] Cấu hình đóng gói thư viện (Library mode): ESM (`dist/belp-ui-kit.es.js`), UMD (`dist/belp-ui-kit.umd.js`), Stylesheet (`dist/belp-ui-kit.css`), TypeScript Declarations (`dist/index.d.ts`).
  - [x] Kiểm thử kiểm tra lỗi: TypeScript `tsc --noEmit` đạt 0 lỗi, Showcase build đạt 100%, Library build đạt 100%.
  - [x] Commit Git & báo cáo hoàn thành.
