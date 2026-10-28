# Yêu cầu Dự án: Belp UI Kit (Custom Component Library)

## 1. Mục tiêu dự án (Project Vision)
Xây dựng một thư viện giao diện người dùng (UI Component Library) độc lập, có phong cách thẩm mỹ riêng biệt, tính nhất quán cao, tối ưu hóa cho các ứng dụng hiển thị và thao tác nhiều dữ liệu (data-dense dashboards, tables, admin portals, SaaS).

Dự án tuân thủ triệt để lộ trình từ file `building-component-library.md` và sử dụng bảng màu chủ đạo trích xuất từ D3 Design (`https://d3design.vn/uploads/03.jpg`):
- **Tầng 0: Foundations** (Design Tokens với màu chủ đạo `#1aa7ec`, nền `#1e2f97`, accent `#4adede`, phông Inter & JetBrains Mono).
- **Đợt 1: Primitives** (Button, IconButton, Link, Input, Textarea, Checkbox, Radio, Switch, Select, Typography, Badge, Avatar, Card, Stack...).
- **Đợt 2: Composite** (FormField, DatePicker, NumberInput, Modal/Dialog, Drawer/Sheet, Tooltip, DropdownMenu, Toast, Alert, ProgressBar, Skeleton, EmptyState, ConfirmDialog).
- **Đợt 3: Nâng cao** (Data Table/DataGrid, Pagination, Breadcrumb, Tabs, FilterBar, MetricCard, Accordion).

---

## 2. Yêu cầu Chức năng (Functional Requirements)

### 2.1. Hệ thống Design Tokens & Theming (Tầng 0)
- Quản lý toàn bộ giá trị thẩm mỹ thông qua **CSS Variables**:
  - **Color Palette cốt lõi**:
    - Primary: Electric Cyan Blue `#1aa7ec` (`hsl(200 85% 51%)`).
    - Midnight Navy: `#1e2f97` (`hsl(232 67% 35%)`) làm nền Dark Canvas & Card.
    - Aqua Mint: `#4adede` (`hsl(180 69% 58%)`) cho trạng thái Active / Live / Glowing Dots.
    - Periwinkle: `#797ef6` (`hsl(238 87% 72%)`) cho trạng thái thứ cấp & Highlights.
    - Soft Sky: `#7dd6f6` (`hsl(196 87% 73%)`) cho Info badges & accents.
  - **Typography Scale**: Phông **Inter** (Heading & UI) và **JetBrains Mono** (Code & Metrics).
  - **Spacing Scale**: Hệ lưới 4px/8px chuẩn mực.
  - **Borders & Radii**: none, sm, md, lg, full với viền hairline sắc nét.
  - **Z-Index Layering**: Base, dropdown, sticky, overlay, modal, popover, tooltip, toast.
- Hỗ trợ **Dark Mode** tự động và mượt mà, khai báo `color-scheme` chuẩn cấp trình duyệt.

### 2.2. Nhóm Primitives (Đợt 1)
- **Hành động**:
  - `Button`: Biến thể `solid`, `secondary`, `outline`, `ghost`, `destructive`, `link`; kích thước `sm`, `md`, `lg`; hỗ trợ `isLoading`, `leftIcon`, `rightIcon`.
  - `IconButton`: Nút icon chuyên dụng với kích thước vuông chuẩn, hỗ trợ `aria-label`.
  - `Link`: Liên kết điều hướng styled đẹp mắt.
- **Nhập liệu cơ bản**:
  - `Input`: Text input có icon prefix/suffix, clear button, password visibility toggle, error state.
  - `Textarea`: Tự đếm ký tự, maxLength, error state.
  - `Checkbox`, `RadioGroup`, `Switch`: Điều khiển nhị phân và danh sách chọn lọc.
  - `Select` (Custom Radix Select): Dropdown lựa chọn tùy chỉnh thay thế thẻ `<select>` native, hỗ trợ SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator.
- **Hiển thị & Thông tin**:
  - `Typography`: Heading, Text, Label, Kbd, Code.
  - `Badge` / `Tag`: Hiển thị trạng thái dữ liệu (success, pending, failed, neutral, v.v.), hỗ trợ chấm phát sáng `pulse`.
  - `Avatar`: Ảnh, fallback chữ cái, status badge online/busy/offline.
  - `Divider`: Phân cách ngang/dọc kèm nhãn.
  - `Spinner` / `LoadingIndicator`.
- **Bố cục (Layout)**:
  - `Stack` (`HStack`, `VStack`), `Card` (CardHeader, CardTitle, CardDescription, CardContent, CardFooter).

### 2.3. Nhóm Composite Components (Đợt 2)
- **Form System**:
  - `FormField`: Wrapper toàn diện liên kết tự động `id`, `label`, `required`, `hint`, `error`, `aria-describedby` và `aria-invalid`.
  - `DatePicker`: Bộ chọn ngày tương tác dạng Calendar Popover với chọn tháng/năm, điều hướng trước/sau, format ngày `DD/MM/YYYY`, clear button.
  - `NumberInput` / `CurrencyInput`: Ô nhập số định dạng tiền tệ hoặc số lượng kèm nút tăng giảm (stepper).
- **Overlay Layer (Dựa trên Headless Primitive đồng nhất)**:
  - `Dialog` / `Modal`: Hộp thoại trung tâm với backdrop mờ, focus trap, phím Esc đóng, scale animation.
  - `Drawer` / `Sheet`: Ngăn kéo trượt từ các cạnh (phải, trái, dưới, trên) chuyên dụng cho chi tiết bản ghi.
  - `Tooltip`: Chú giải nhanh khi hover/focus.
  - `Popover`: Cửa sổ nổi hiển thị nội dung phức tạp.
  - `DropdownMenu`: Menu ngữ cảnh, tùy chọn dòng dữ liệu, submenu, separators.
- **Phản hồi người dùng (Feedback)**:
  - `Toast` / `Notification`: Thông báo nổi stackable, tự động biến mất, đa trạng thái.
  - `Alert` / `Banner`: Cảnh báo trong trang (info, success, warning, destructive).
  - `ProgressBar`: Thanh tiến trình thanh mảnh hiển thị tỷ lệ % hoàn thành với các biến thể màu.
  - `Skeleton`: Hiệu ứng shimmer giả lập dữ liệu đang tải.
  - `EmptyState`: Trạng thái trống có hình minh họa, tiêu đề, mô tả và nút CTA.
  - `ConfirmDialog`: Hộp thoại xác nhận nhanh các hành vi quan trọng (xóa, khởi động lại).

### 2.4. Nhóm Nâng cao cho Dữ liệu lớn (Đợt 3)
- `DataTable` / `DataGrid`: Generic type-safe `<T>`, sắp xếp cột đa chiều, chọn dòng đơn/đa dòng với checkbox indeterminate, ghim tiêu đề (`stickyHeader`), 3 chế độ mật độ dòng (`compact`, `default`, `relaxed`), tích hợp Skeleton loading và EmptyState.
- `Pagination`: Điều hướng trang, phân trang có dấu `...`, chọn pageSize (10, 25, 50, 100).
- `FilterBar`: Thanh lọc dữ liệu hợp nhất (Search tức thời, Filter dropdowns, đếm bộ lọc đang kích hoạt, nút Reset).
- `Breadcrumb`: Thanh điều hướng phân cấp (Home / Cluster / Service / Logs).
- `MetricCard` / `StatCard`: Thẻ thống kê KPI với tỷ lệ tăng/giảm % và màu xu hướng ngữ nghĩa.
- `Tabs`: Chuyển đổi tab linh hoạt dạng `pill` hoặc `underline`.
- `Accordion`: Thu gọn / mở rộng nhóm dữ liệu mượt mà.

---

## 3. Yêu cầu Phi Chức năng (Non-Functional Requirements)
1. **Khả năng tiếp cận (Accessibility - a11y)**: Tuân thủ tiêu chuẩn WAI-ARIA WCAG 2.1 AA.
2. **Tính nhất quán & Khả năng tùy biến (Theming & Consistency)**: 100% token tham chiếu qua biến CSS, dễ dàng ghi đè.
3. **Hiệu năng & Độ ổn định**: Tree-shaking hoàn chỉnh, zero-CLS.
4. **Trải nghiệm Lập trình viên (DX)**: 100% TypeScript nghiêm ngặt, autocomplete đầy đủ.
