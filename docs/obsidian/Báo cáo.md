---
title: Báo cáo
tags: [reports, analytics]
contentType: Reference
---
# Khai thác báo cáo HRM

Reports tổng hợp dữ liệu theo permission, branch, department và kỳ báo cáo.

```mermaid
flowchart LR
  A[Select report] --> B[Choose filters]
  B --> C[Validate permission]
  C --> D[Run report API]
  D --> E[View result]
  E --> F[Export]
```

## Business rules

- Export dùng cùng phạm vi quyền với màn hình
- Báo cáo chấm công dùng timesheet đã công nhận
- Dữ liệu nhạy cảm cần permission riêng
- Request export lớn chạy bất đồng bộ và lưu audit

## API flow

```mermaid
sequenceDiagram
  participant UI as ReportsPage
  participant S as ReportService
  participant API as API
  UI->>S: GetAll(filters)
  S->>API: GET /reports
  API-->>UI: report data
```

## Luồng liên quan

Reports tiêu thụ dữ liệu từ [[Tổ chức/Tổ chức - Index]], [[Nhân viên/Nhân viên - Index]], [[Nghỉ phép/Nghỉ phép - Index]], [[Thời gian/Thời gian - Index]], [[Tuyển dụng/Tuyển dụng - Index]] và [[Hiệu suất/Hiệu suất - Index]]. Permission scope lấy từ [[Quản trị hệ thống/Quản trị hệ thống - Index]].

[[Hospital HRM - Index]]
