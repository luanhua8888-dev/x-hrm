---
title: Trực và On-call
tags: [duty, on-call, table]
contentType: Reference
route: /workforce-attendance/duty
---
# Quản lý trực và On-call

| Column | Fixed | Action |
|---|---|---|
| `employee` | Left | Employee detail |
| `department` | Left | Filter |
| `type` | Không | ON_SITE_DUTY, ON_CALL, CALL_BACK |
| `startDateTime` | Không | Sort |
| `endDateTime` | Không | Sort |
| `location` | Không | Filter |
| `parentOnCall` | Không | Open parent |
| `status` | Không | Approve/cancel |
| `actions` | Right | View, edit, create call-back |

API: DutyService CRUD. Call-back bắt buộc tham chiếu parent On-call. Duty, On-call và OT không được gộp.

[[Thời gian/Thời gian - Index]]

