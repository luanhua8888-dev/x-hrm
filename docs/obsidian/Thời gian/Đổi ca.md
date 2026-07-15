---
title: Đổi ca
tags: [shift-swap, approval, table]
contentType: Reference
route: /workforce-attendance/shift-swaps
---
# Quản lý đổi ca

Columns: Requester, Current Shift, Swap Employee, Target Shift, Date, Reason, Employee Acceptance, Manager Approval, Status, Actions. Fixed left `requester,date`; fixed right `status,actions`.

Flow: Employee A request → Employee B accept → qualification/conflict validation → Manager approve → schedule version mới. API: ShiftSwapService CRUD; backend cần accept, approve, reject.

[[Thời gian/Thời gian - Index]]

