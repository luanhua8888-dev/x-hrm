---
title: Tổ chức - Index
tags: [organization, index]
contentType: Reference
---
# Quản lý tổ chức

| Menu | Route | Tài liệu | Permission |
|---|---|---|---|
| Công ty | `/organization/company` | [[Tổ chức/Công ty]] | `ORGANIZATION_VIEW` |
| Khoa phòng | `/organization/departments` | [[Tổ chức/Khoa phòng]] | `ORGANIZATION_VIEW` |
| Địa điểm | `/organization/locations` | [[Tổ chức/Địa điểm]] | `ORGANIZATION_VIEW` |
| Chức danh | `/organization/job-titles` | [[Tổ chức/Chức danh]] | `ORGANIZATION_VIEW` |

```mermaid
flowchart LR
  A[Công ty] --> B[Chi nhánh và địa điểm]
  A --> C[Khoa phòng]
  C --> D[Chức danh]
  B --> E[Nhân viên]
  C --> E
  D --> E
```

[[Hospital HRM - Index]]

