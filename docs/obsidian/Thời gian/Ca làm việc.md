---
title: Ca làm việc
tags: [shift, table, form]
contentType: Reference
route: /workforce-attendance/shifts
---
# Quản lý mẫu ca làm việc

| Column | Width | Fixed | Action |
|---|---:|---|---|
| `code` | 100 | Left | Detail |
| `name` | 200 | Left | Edit |
| `type` | 120 | Không | Filter |
| `startTime` | 100 | Không | Sort |
| `endTime` | 110 | Không | Sort |
| `breakMinutes` | 110 | Không | Sort |
| `workingMinutes` | 130 | Không | Sort |
| `nightShift` | 100 | Không | Filter |
| `overnight` | 100 | Không | Filter |
| `status` | 110 | Không | Activate/deactivate |
| `actions` | 60 | Right | View, edit, duplicate |

`fixedLeft=['code','name']`, `fixedRight=['actions']`. API: ShiftService `GetAll`, `GetById`, `Create`, `Update`. Không sửa ca đã dùng trong lịch; tạo version mới.

[[Thời gian/Thời gian - Index]]

