# Kế hoạch Thực hiện: Belp UI Kit (TASKS.md)

## Tiến độ Tổng quan

- [x] **Giai đoạn 0: Phân tích & Tài liệu hóa (Analysis & Documentation)**
  - [x] Đọc và đối chiếu `building-component-library.md`.
  - [x] Khởi tạo tài liệu `docs/REQUIREMENTS.md`.
  - [x] Khởi tạo tài liệu `docs/ARCHITECTURE.md`.
  - [x] Khởi tạo `docs/TASKS.md` và `README.md`.
  - [x] Khởi tạo Git repository (`git init`), cấu hình `.gitignore`, `.env.example`.

- [ ] **Giai đoạn 1: Khởi tạo Project & Tầng 0 (Foundations & Design Tokens)**
  - [ ] Khởi tạo dự án Vite + React + TypeScript.
  - [ ] Cài đặt các thư viện lõi: `tailwindcss`, `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`.
  - [ ] Thiết lập bảng màu Tokens và CSS Variables (`colors.css`, `typography.css`, `spacing.css`, `index.css`).
  - [ ] Xây dựng theme switcher (Light / Dark mode toggle) & token test playground.
  - [ ] Xây dựng tiện ích `cn()` (`clsx` + `twMerge`).

- [ ] **Giai đoạn 2: Đợt 1 — Primitives**
  - [ ] `Button` (variants: solid, secondary, outline, ghost, danger; sizes: sm, md, lg; loading spinner, disabled).
  - [ ] `IconButton` & `Link`.
  - [ ] `Input` (prefix/suffix icon, clear button, error state, disabled).
  - [ ] `Textarea` (auto-resize, character count).
  - [ ] `Checkbox`, `RadioGroup`, `Switch/Toggle`.
  - [ ] `Select (Native)`.
  - [ ] `Typography` (Heading, Text, Code, Kbd).
  - [ ] `Badge / Tag` (status colors, removable tag).
  - [ ] `Avatar` (image, fallback initials, online status indicator).
  - [ ] `Divider` & `Spinner / LoadingIndicator`.
  - [ ] `Card` (CardHeader, CardTitle, CardDescription, CardContent, CardFooter).
  - [ ] `Stack` (HStack, VStack, Flex container).

- [ ] **Giai đoạn 3: Đợt 2 — Composite Components**
  - [ ] `FormField` (Label, Required star, Helper text, Error message, a11y auto-link).
  - [ ] Cài đặt các headless primitives từ `@radix-ui/react-*` (Dialog, Popover, Tooltip, DropdownMenu).
  - [ ] `Modal / Dialog` (Portal, focus trap, escape key, overlay blur).
  - [ ] `Drawer / Sheet` (Slide from right/left/bottom).
  - [ ] `Tooltip` (Hover & focus triggered).
  - [ ] `DropdownMenu` (Action menus, options, dividers).
  - [ ] `Toast / Notification` (Toast provider, trigger function, multi-toast stack).
  - [ ] `Alert / Banner` (Info, Success, Warning, Danger with dismiss).
  - [ ] `Skeleton` (Shimmer loading effect).
  - [ ] `EmptyState` (Illustration/Icon, Title, Description, Action button).
  - [ ] `ConfirmDialog` (Quick destructive confirmation modal).

- [ ] **Giai đoạn 4: Đợt 3 — Nâng cao cho Dữ liệu lớn (Data-Dense Components)**
  - [ ] `DataTable` (Generic `<T>` type-safe table, sorting header, row selection checkbox, sticky header, compact/dense view toggle).
  - [ ] `Pagination` (Page size selector, next/prev, jump to page).
  - [ ] `FilterBar` (Search input, filter dropdowns, clear all filters).
  - [ ] `MetricCard / StatCard` (KPI value, percentage delta, trend indicator).
  - [ ] `Tabs` (Line & Pill variants).
  - [ ] `Accordion / Collapse`.

- [ ] **Giai đoạn 5: Interactive Showcase & Build Configuration**
  - [ ] Xây dựng ứng dụng Playground tương tác trực tiếp (`src/showcase`) hiển thị toàn bộ components, mẫu data dashboard, bảng dữ liệu lớn.
  - [ ] Cấu hình xuất gói thư viện (Library Mode build: ESM/CJS + `.d.ts` declaration bundle).
  - [ ] Kiểm thử kiểm tra lỗi (TypeScript check, linting, build test).
  - [ ] Commit Git & đồng bộ.
