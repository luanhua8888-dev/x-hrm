---
title: Nghỉ phép - Index
tags: [leave, module, index]
contentType: Reference
---
# Quản lý nghỉ phép

Module Leave tách cấu hình, entitlement, balance, request và approval. Mỗi menu con có đặc tả màn hình riêng.

## Cây menu

| Menu | Route | Tài liệu | Permission |
|---|---|---|---|
| Nghỉ phép của tôi | `/leave/my-leave` | [[Nghỉ phép/Nghỉ phép của tôi]] | `LEAVE_REQUEST` |
| Yêu cầu nghỉ phép | `/leave/requests` | [[Nghỉ phép/Yêu cầu nghỉ phép]] | `LEAVE_APPROVE` |
| Lịch nghỉ | `/leave/calendar` | [[Nghỉ phép/Lịch nghỉ]] | `LEAVE_VIEW` |
| Số phép dư | `/leave/balances` | [[Nghỉ phép/Số phép dư]] | `LEAVE_VIEW` |
| Loại nghỉ phép | `/leave/types` | [[Nghỉ phép/Loại nghỉ phép]] | `LEAVE_CONFIGURE` |
| Quyền lợi phép | `/leave/entitlements` | [[Nghỉ phép/Quyền lợi phép]] | `LEAVE_CONFIGURE` |

## Luồng tổng thể

```mermaid
flowchart LR
  A[Loại nghỉ phép] --> B[Quyền lợi phép]
  B --> C[Số phép dư]
  C --> D[Nghỉ phép của tôi]
  D --> E[Yêu cầu nghỉ phép]
  E --> F{Phê duyệt}
  F -- Approved --> G[Lịch nghỉ]
  G --> H[Attendance và Timesheet]
  F -- Rejected --> D
```

## API hiện có

- `GET /leaves`
- `GET /leaves/:id`
- `POST /leaves`
- `POST /leaves/:id/approve`
- `POST /leaves/:id/reject`
- `POST /leaves/:id/cancel`
- `GET /leave-types`
- `GET /leave-entitlements`
- `GET /leave-balances`

[[Hospital HRM - Index]]

