---
title: Ngoại lệ chấm công
tags: [attendance, exception, table]
contentType: Reference
route: /workforce-attendance/exceptions
---
# Xử lý ngoại lệ chấm công

Table fixed left `employee,date`; fixed right `severity,status,actions`. Columns: Employee, Date, Shift, Exception Type, Severity, Status, Assigned To, Created At, Actions. Actions: view, assign, resolve, ignore with reason, create adjustment, recalculate.

API cần: `GET /attendance/exceptions`, detail, assign, resolve, ignore. Severity `CRITICAL` chặn Closing.

[[Thời gian/Thời gian - Index]]

