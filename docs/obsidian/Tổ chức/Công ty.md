---
title: Công ty
tags: [organization, company, screen]
contentType: Reference
route: /organization/company
---
# Quản lý thông tin công ty

## Chức năng và API

| Chức năng | API | Action |
|---|---|---|
| Xem thông tin | `GET /organizations` | View |
| Cập nhật | Backend cần `PUT /organizations/:id` | Save |
| Xem lịch sử | Backend cần `GET /organizations/:id/audit-logs` | Open audit drawer |

## Form fields

`code`, `legalName`, `displayName`, `taxCode`, `registrationNumber`, `phone`, `email`, `website`, `address`, `timezone`, `currency`, `status`.

Company code và tax code duy nhất. Thay đổi timezone không được làm đổi timestamp lịch sử.

[[Tổ chức/Tổ chức - Index]]

