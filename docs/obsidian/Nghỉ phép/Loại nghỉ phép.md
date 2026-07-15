---
title: Loại nghỉ phép
tags: [leave, configuration, table]
contentType: Reference
route: /leave/types
---
# Cấu hình loại nghỉ phép

Leave Type định nghĩa loại ngày nghỉ, trạng thái hưởng lương và quy tắc sử dụng.

## Table columns

| Column | Nhãn | Width | Fixed | Actions |
|---|---|---:|---|---|
| `code` | Mã | 110 | Left | Open edit |
| `name` | Loại phép | 250 | Left | Open detail |
| `isPaid` | Hưởng lương | 120 | Không | Filter |
| `accrual` | Định mức/Cộng dồn | 200 | Không | View rule |
| `status` | Trạng thái | 120 | Không | Activate/Deactivate |
| `actions` | Thao tác | 50 | Right | Edit, duplicate, deactivate |

`fixedLeft=['code','name']`, `fixedRight=['actions']`.

## Chức năng và API

| Chức năng | API | Quy tắc |
|---|---|---|
| List | `GET /leave-types` | Paging và status filter |
| Create | `POST /leave-types` cần bổ sung | Code duy nhất |
| Update | `PUT /leave-types/:id` cần bổ sung | Giữ version hiệu lực |
| Deactivate | `POST /leave-types/:id/deactivate` cần bổ sung | Không xóa lịch sử |
| View entitlements | `GET /leave-entitlements?leaveTypeId=:id` | Mở [[Nghỉ phép/Quyền lợi phép]] |

```mermaid
flowchart LR
  A[Leave Type] --> B[Entitlement Rule]
  B --> C[Leave Balance]
  C --> D[Leave Request]
```

[[Nghỉ phép/Nghỉ phép - Index]]

