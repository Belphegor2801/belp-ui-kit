# Belp UI Kit

> Thư viện giao diện người dùng hiện đại, độc lập, tối ưu hóa cho các ứng dụng nhiều dữ liệu (Data-dense applications, Dashboards, Admin Panels) với hệ thống Design Tokens và CSS Variables nhất quán.

Dự án được xây dựng bám sát lộ trình chuẩn mực tại [`building-component-library.md`](file:///Z:/belp-ui-kit/building-component-library.md) và các nguyên tắc SOLID & Clean Code.

---

## 🚀 Tính năng nổi bật

1. **Hệ thống Design Tokens & Theming hoàn chỉnh**:
   - Quản lý tập trung qua CSS Variables: Bảng màu (Neutral, Primary, Semantic), Typography scale, Spacing (hệ 4px/8px), Shadows, Border Radius.
   - Hỗ trợ Dark Mode tức thì chỉ với một class hoặc thuộc tính `data-theme`.
2. **Bộ Primitives đầy đủ (Đợt 1)**:
   - Button, Input, Textarea, Checkbox, Radio, Switch, Typography, Badge, Avatar, Divider, Card, Stack.
   - 100% component định nghĩa đủ state: `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, `error`.
3. **Bộ Composite Components thông minh (Đợt 2)**:
   - `FormField` đồng bộ hóa label, error message và accessibility `aria-*`.
   - Lớp Overlay đồng nhất: Modal/Dialog, Drawer/Sheet, Tooltip, DropdownMenu xây dựng trên Radix UI primitives.
   - Hệ thống phản hồi: Toast, Alert, Skeleton shimmer, EmptyState, ConfirmDialog.
4. **Bộ Nâng cao chuyên trị Dữ liệu lớn (Đợt 3)**:
   - `DataTable` hỗ trợ sắp xếp cột (Sorting), chọn dòng (Row selection), điều chỉnh mật độ (Compact/Default density), phân trang mượt mà.
   - `FilterBar`, `MetricCard`, `Tabs`, `Accordion`.
5. **Interactive Component Showcase**:
   - Ứng dụng Playground trực quan đi kèm giúp test trực tiếp mọi component, preview các bộ dữ liệu mẫu trong môi trường thực tế.

---

## 🛠️ Cài đặt & Khởi chạy

### Yêu cầu hệ thống
- Node.js >= 18.x (khuyến nghị Node 20+)
- npm hoặc pnpm / yarn

### Khởi chạy môi trường phát triển (Playground Showcase)
```bash
# Cài đặt dependencies
npm install

# Khởi chạy showcase app
npm run dev
```

### Build thư viện để đóng gói / phân phối
```bash
# Kiểm tra kiểu dữ liệu TypeScript và build thư viện
npm run build
```

---

## 📚 Tài liệu kỹ thuật chi tiết

- [Yêu cầu chi tiết (REQUIREMENTS.md)](file:///Z:/belp-ui-kit/docs/REQUIREMENTS.md)
- [Kiến trúc kỹ thuật (ARCHITECTURE.md)](file:///Z:/belp-ui-kit/docs/ARCHITECTURE.md)
- [Theo dõi tiến độ & Nhiệm vụ (TASKS.md)](file:///Z:/belp-ui-kit/docs/TASKS.md)
- [Bản tham chiếu checklist thư viện (building-component-library.md)](file:///Z:/belp-ui-kit/building-component-library.md)
