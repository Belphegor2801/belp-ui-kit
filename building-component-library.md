# Checklist: xây bộ thư viện component mới từ đầu

> Note tham khảo (không phải rule always-on) — dùng khi bắt đầu một design system / UI library riêng.

## Tầng 0 — Foundations (làm TRƯỚC khi viết component)

Một thư viện component không bắt đầu bằng component mà bằng **design tokens** — nhảy thẳng vào button/input sẽ hardcode màu/spacing rải rác và không đổi theme được về sau.

- **Tokens**: bảng màu (primary/neutral + màu ngữ nghĩa success/warning/danger/info), typography scale (font, size, weight, line-height), spacing scale (4/8px), border-radius, shadow/elevation, z-index scale, breakpoints, duration/easing cho animation.
- **Icon set**: chọn bộ có sẵn hoặc tự vẽ, nhưng thống nhất MỘT nguồn.
- **Theming**: CSS variables ngay từ đầu (để sau làm dark mode / white-label).

## Đợt 1 — Primitives (không có là không làm được gì)

| Nhóm | Component |
|---|---|
| Hành động | Button (variant/size/loading/disabled), Icon Button, Link |
| Nhập liệu | Input text, Textarea, Checkbox, Radio, Switch/Toggle, Select cơ bản |
| Hiển thị | Typography (heading/text), Icon, Badge/Tag, Avatar, Divider, Spinner/Loading |
| Layout | Container/Stack/Grid, Card |

## Đợt 2 — Composite (ghép từ primitives)

- **Form**: Form Field wrapper (label + hint + error message — component quan trọng nhất của cả bộ form), Select nâng cao (search/multi), Datepicker, Number/Currency input, File upload.
- **Overlay**: Modal/Dialog, Drawer, Tooltip, Popover, Dropdown menu — xây chung trên MỘT "overlay primitive" (portal + positioning + focus trap), không viết lặp 5 lần.
- **Feedback**: Toast/Notification, Alert/Banner, Progress bar, Skeleton, Empty state, Confirm dialog.

## Đợt 3 — Nâng cao (làm khi có nhu cầu thật)

Table/DataGrid (sort, phân trang, chọn dòng — tốn công nhất, đừng làm sớm), Pagination, Tabs, Breadcrumb, Accordion/Collapse, Stepper/Wizard, Menu/Sidebar navigation, Search/Autocomplete, Tree, Calendar.

## Ba nguyên tắc rút từ các design system lớn

1. **Mỗi component định nghĩa đủ state ngay từ đầu**: default, hover, focus (bắt buộc cho accessibility), active, disabled, error, loading — thiếu state là nguồn "sáng tác thêm" về sau.
2. **Đừng làm hết list rồi mới dùng**: Đợt 1 + Form Field + Modal + Toast là đủ dựng màn hình thật; dùng thật sẽ lộ ra API component nên như thế nào trước khi đầu tư vào Table.
3. **Cân nhắc xây trên headless library** (Radix, Headless UI, Ark UI... tuỳ framework): họ lo behavior + accessibility (focus trap, keyboard, ARIA), mình chỉ lo style riêng — tiết kiệm ~70% công mà vẫn giữ style của riêng mình. (Thêm dependency mới → cần user quyết, theo rule chung.)
