# Nhật ký Phiên bản & Lộ trình Phát triển (VERSIONING.md)

Tài liệu này ghi lại lịch sử các phiên bản phát hành, quy chuẩn quản lý phiên bản (Semantic Versioning) và lộ trình phát triển của **Belp UI Kit**.

---

## 📌 Quy chuẩn Đánh số Phiên bản (SemVer)

Belp UI Kit tuân thủ tiêu chuẩn [Semantic Versioning 2.0.0](https://semver.org/):
- **MAJOR (X.0.0)**: Thay đổi phá vỡ tương thích ngược (Breaking changes trong API props, xóa component hoặc cấu trúc token).
- **MINOR (0.X.0)**: Thêm mới component, props mới, tính năng mới có tính tương thích ngược hoàn toàn.
- **PATCH (0.0.X)**: Sửa lỗi (bug fixes), tối ưu hiệu năng hoặc tinh chỉnh CSS không ảnh hưởng API.

---

## 📜 Lịch sử Phiên bản (Changelog)

### `v0.1.0` — Initial Foundation & Data-Dense Core (Phiên bản Hiện tại)
*Ngày phát hành: 28/10/2026*

#### ✨ Tính năng nổi bật
- **Tầng 0 — Foundations & Tokens**:
  - Bảng màu lấy cảm hứng từ phong cách kỹ thuật dark-first (Railway-inspired) với màu chủ đạo **Electric Violet** (`#853bce` / `hsl(268 75% 58%)`).
  - Hệ thống 3 tầng bề mặt (Surface Hierarchy): Canvas (`#0b0b0f`), Card (`#13111c`), Popover (`#1b1828`).
  - Font chuẩn: **Inter** (Heading & UI Body) và **JetBrains Mono** (Code & Technical data).
  - Tích hợp biến CSS Variables hỗ trợ chuyển đổi Light / Dark theme tức thì.
  - Ngăn chặn triệt để hiện tượng nhấp nháy giao diện (Anti-FOUC).
  - Khai báo `color-scheme: dark/light` chuẩn cấp trình duyệt cho scrollbars và native controls.
- **Đợt 1 — Primitives**:
  - `Button`: 6 biến thể (`solid`, `secondary`, `outline`, `ghost`, `destructive`, `link`), 5 kích thước, hỗ trợ `isLoading`, `leftIcon`, `rightIcon`.
  - `Input` & `Textarea`: Icon prefix/suffix, clear button nhanh, password visibility toggle, đếm ký tự.
  - `Checkbox`, `RadioGroup`, `Switch`: Xây dựng trên Radix UI Headless primitives.
  - `Typography`: `Heading` (h1-h6), `Text`, `Code`, `Kbd`.
  - `Badge`: 7 biến thể trạng thái kèm tùy chọn chấm phát sáng (`pulse`).
  - `Avatar`: Fallback ký tự tự động kèm status dot.
  - `Card`, `Stack` (`HStack`, `VStack`), `Divider`, `Spinner`.
- **Đợt 2 — Composite & Overlays**:
  - `FormField`: Tự động liên kết `id`, `label`, `hint`, `error`, đồng bộ WAI-ARIA `aria-describedby` và `aria-invalid`.
  - `Dialog` (Modal): Backdrop blur, focus trap, phím Esc.
  - `Tooltip`, `Popover`, `DropdownMenu`: Cửa sổ nổi tương tác.
  - `Alert`: Banner cảnh báo 4 cấp độ.
  - `Skeleton`: Shimmer loading chống giật layout (CLS).
  - `EmptyState`: Trạng thái trống kèm CTA.
  - `Toast`: Hệ thống `useToast()` hook thông báo nổi stackable.
- **Đợt 3 — Data-Dense System**:
  - `DataTable`: Bảng generic `<T>` type-safe, sắp xếp cột đa chiều, chọn từng dòng hoặc tất cả, ghim header (`stickyHeader`), 3 chế độ mật độ dòng (`compact`, `default`, `relaxed`).
  - `Pagination`: Điều hướng trang, phân trang có dấu `...`, chọn pageSize.
  - `FilterBar`: Thanh lọc dữ liệu hợp nhất (Search tức thời + Filter dropdowns + Reset).
  - `MetricCard`: Thẻ chỉ số KPI với xu hướng tăng giảm % ngữ nghĩa.
  - `Tabs` (Pill & Underline) và `Accordion`.
- **Showcase & Build**:
  - Ứng dụng Interactive Catalog kiểm thử trực tiếp mọi component.
  - Hỗ trợ đóng gói thư viện kép: ESM, UMD, CSS, TypeScript Declaration `.d.ts`.

---

## 🗺️ Lộ trình Phát triển Tiếp theo (Roadmap)

### `v0.2.0` (Dự kiến)
- [ ] Thêm component `DateRangePicker` chọn khoảng ngày nhanh cho FilterBar.
- [ ] Bổ sung tính năng Ghim cột (Pinned Columns: Ghim cột checkbox và cột Thao tác) cho `DataTable`.
- [ ] Hỗ trợ xuất file CSV / JSON trực tiếp từ `DataTable`.
- [ ] Bổ sung `Combobox` / `MultiSelect` có tìm kiếm và ảo hóa dữ liệu (Virtual scrolling cho danh sách > 10.000 dòng).

### `v0.3.0` (Dự kiến)
- [ ] Thêm component `CommandMenu` (Kbd search shortcut `Cmd + K`).
- [ ] Bổ sung `Drawer / Sheet` trượt từ cạnh phải chuyên dụng cho form chi tiết bản ghi.
- [ ] Hỗ trợ bảng dữ liệu phân cấp cây (Tree Table / Row Expanding).

### `v1.0.0` (Bản Stable đầu tiên)
- [ ] Kiểm thử độ phủ mã (Unit test & Component test) đạt > 90% coverage.
- [ ] Kiểm tra kiểm toán khả năng tiếp cận đạt 100% WCAG 2.1 AA.
- [ ] Phát hành chính thức lên npm registry (`npm publish`).
