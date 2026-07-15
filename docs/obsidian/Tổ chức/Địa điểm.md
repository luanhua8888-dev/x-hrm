---
title: Địa điểm
tags: [organization, location, table]
contentType: Reference
route: /organization/locations
---
# Quản lý chi nhánh và địa điểm

| Column | Width | Fixed | Action |
|---|---:|---|---|
| `code` | 110 | Left | Detail |
| `name` | 220 | Left | Edit |
| `branchType` | 130 | Không | Filter |
| `address` | 260 | Không | Map/open detail |
| `timezone` | 130 | Không | Sort |
| `attendanceRadius` | 140 | Không | Device policy |
| `status` | 110 | Không | Activate/deactivate |
| `actions` | 60 | Right | View, edit, devices |

`fixedLeft=['code','name']`, `fixedRight=['actions']`.

API: `GET /organizations/locations`; backend cần CRUD và endpoint kiểm tra thiết bị liên quan. Địa điểm liên kết [[Thời gian/Thiết bị chấm công]] qua Branch, Device và geofence.

[[Tổ chức/Tổ chức - Index]]
