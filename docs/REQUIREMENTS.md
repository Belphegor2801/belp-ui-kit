# Yêu cầu Dự án: Belp UI Kit (Custom Component Library)

## 1. Mục tiêu dự án (Project Vision)
Xây dựng một thư viện giao diện người dùng (UI Component Library) độc lập, có phong cách thẩm mỹ riêng biệt, tính nhất quán cao, tối ưu hóa cho các ứng dụng hiển thị và thao tác nhiều dữ liệu (data-dense dashboards, tables, admin portals, SaaS).

Dự án tuân thủ triệt để lộ trình từ file `building-component-library.md`:
1. **Tầng 0: Foundations** (Design Tokens & CSS Variables, Theming, Icons).
2. **Đợt 1: Primitives** (Button, Input, Typography, Badge, Card, Stack...).
3. **Đợt 2: Composite** (FormField, Modal/Dialog, Drawer, Tooltip, Dropdown, Toast, Alert, Skeleton...).
4. **Đợt 3: Nâng cao** (Data Table/DataGrid, Pagination, Tabs, FilterBar, MetricCard...).

---

## 2. Yêu cầu Chức năng (Functional Requirements)

### 2.1. Hệ thống Design Tokens & Theming (Tầng 0)
- Quản lý toàn bộ giá trị thẩm mỹ thông qua **CSS Variables**:
  - **Color Palette**: Neutral (Gray/Slate), Brand (Primary/Accent), Semantic (Success, Warning, Danger, Info).
  - **Typography Scale**: Font family, font sizes (xs -> 4xl), weights (regular, medium, semibold, bold), line-heights.
  - **Spacing Scale**: Hệ lưới 4px/8px chuẩn mực.
  - **Elevation & Shadows**: Đổ bóng đa cấp độ (sm, md, lg, xl, inner).
  - **Borders & Radii**: none, sm, md, lg, full.
  - **Z-Index Layering**: Base, dropdown, sticky, overlay, modal, popover, tooltip.
  - **Motion & Transitions**: Duration, easing chuẩn.
- Hỗ trợ **Dark Mode** và chuyển đổi theme mượt mà không gây giật lag (FOUC).

### 2.2. Nhóm Primitives (Đợt 1)
- **Hành động**:
  - `Button`: Hỗ trợ đầy đủ biến thể (`solid`, `outline`, `ghost`, `secondary`, `danger`), các kích thước (`sm`, `md`, `lg`), trạng thái (`hover`, `focus-visible`, `active`, `disabled`, `loading` với spinner).
  - `IconButton`: Nút bấm dạng icon tối ưu diện tích.
  - `Link`: Điều hướng dạng inline hoặc standalone.
- **Nhập liệu cơ bản**:
  - `Input`: Text input hỗ trợ prefix/suffix icon, clear button, error state.
  - `Textarea`: Tự co giãn (auto-resize tùy chọn), đếm ký tự.
  - `Checkbox`, `Radio`, `Switch`: Điều khiển nhị phân và lựa chọn dạng nhóm.
  - `Select (Native)`: Lựa chọn cơ bản cho mobile hoặc form đơn giản.
- **Hiển thị & Thông tin**:
  - `Typography`: Heading, Text, Label, Kbd, Code.
  - `Badge` / `Tag`: Hiển thị trạng thái dữ liệu (success, pending, failed, neutral, v.v.).
  - `Avatar`: Hỗ trợ ảnh, fallback chữ cái, huy hiệu trạng thái online/offline.
  - `Divider`: Phân cách ngang/dọc kèm nhãn.
  - `Spinner` / `LoadingIndicator`.
- **Bố cục (Layout)**:
  - `Stack` (`HStack`, `VStack`): Căn chỉnh khoảng cách theo flexbox chuẩn.
  - `Grid`: Lưới responsive.
  - `Card`: Khối nội dung cơ bản gồm `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

### 2.3. Nhóm Composite Components (Đợt 2)
- **Form System**:
  - `FormField`: Wrapper toàn diện cho Form Control gồm Label, Required mark, Hint text, Error message, liên kết `aria-describedby` và `id` tự động.
  - `SearchableSelect` / `Combobox`: Lựa chọn có tìm kiếm, hỗ trợ virtualized nếu danh sách lớn.
  - `DatePicker`: Chọn ngày đơn / khoảng ngày (Date Range).
  - `NumberInput` / `CurrencyInput`: Định dạng số tiền và phân tách hàng nghìn tự động.
- **Overlay Layer (Dựa trên Headless Primitive đồng nhất)**:
  - `Dialog` / `Modal`: Hộp thoại với backdrop làm mờ, focus trap, phím Esc đóng, animation vào/ra.
  - `Drawer` / `Sheet`: Ngăn kéo trượt từ các cạnh (phải, trái, dưới).
  - `Tooltip`: Chú giải nhanh khi hover/focus.
  - `Popover`: Cửa sổ nổi hiển thị nội dung phức tạp.
  - `DropdownMenu`: Menu ngữ cảnh hoặc thao tác dòng dữ liệu.
- **Phản hồi người dùng (Feedback)**:
  - `Toast` / `Notification`: Thông báo nổi stackable, tự biến mất sau timeout.
  - `Alert` / `Banner`: Cảnh báo trong trang với các mức độ nghiêm trọng.
  - `ProgressBar`: Thanh tiến trình thanh mảnh, hiển thị phần trăm.
  - `Skeleton`: Hiệu ứng shimmer giả lập dữ liệu đang tải cho Card, Text, Avatar, Table.
  - `EmptyState`: Trạng thái trống có hình minh họa, tiêu đề, mô tả và nút CTA.
  - `ConfirmDialog`: Hộp thoại xác nhận nhanh hành vi nguy hiểm.

### 2.4. Nhóm Nâng cao cho Dữ liệu lớn (Đợt 3)
- `DataTable` / `DataGrid`:
  - Sắp xếp cột (Sorting đa chiều).
  - Chọn dòng (Single/Multi-row selection với checkbox).
  - Sticky header, ghim cột (pinned columns).
  - Chế độ mật độ dòng: Compact (nhiều dữ liệu), Default, Relaxed.
  - Hàng tổng kết (Summary footer), empty state và loading skeleton tích hợp.
- `Pagination`: Điều hướng trang (trang đầu/cuối, nhảy trang, chỉnh pageSize).
- `FilterBar`: Thanh lọc dữ liệu hợp nhất (Search, DateRange picker, Dropdown bộ lọc, Nút xóa lọc).
- `MetricCard` / `StatCard`: Thẻ thống kê KPI (Giá trị chính, tỷ lệ tăng giảm %, nhãn phụ, sparkline).
- `Tabs`: Chuyển đổi tab dạng line hoặc pills.
- `Accordion`: Thu gọn / mở rộng nhóm dữ liệu.

---

## 3. Yêu cầu Phi Chức năng (Non-Functional Requirements)

1. **Khả năng tiếp cận (Accessibility - a11y)**:
   - Tuân thủ tiêu chuẩn WAI-ARIA.
   - Quản lý tiêu điểm (Focus management), bẫy tiêu điểm (Focus trap) trong modal/popover.
   - Đầy đủ phím tắt bàn phím (Tab, Enter, Space, Escape, Arrow keys).
   - Tỷ lệ tương phản màu sắc đáp ứng WCAG 2.1 AA.
2. **Tính nhất quán & Khả năng tùy biến (Theming & Consistency)**:
   - 100% token được tham chiếu qua biến CSS, cho phép người dùng ghi đè hoặc thay đổi phong cách nhanh chóng.
   - Thống nhất stroke width, border radius và tỷ lệ spacing xuyên suốt mọi component.
3. **Hiệu năng (Performance)**:
   - Tree-shaking hoàn chỉnh (chỉ bundle những component thực sự import).
   - Kích thước bundle nhẹ, không runtime overhead dư thừa.
4. **Trải nghiệm Lập trình viên (Developer Experience - DX)**:
   - 100% TypeScript nghiêm ngặt (Strict Type Safety), autocomplete props chi tiết.
   - Tài liệu minh họa trực quan (Interactive Playground / Catalog / Storybook).
   - API trực quan, dễ mở rộng, tuân thủ SOLID principles.
