---
title: Chốt công
tags: [attendance-closing, payroll]
contentType: Reference
route: /workforce-attendance/closing
---
# Chốt kỳ công

Metrics: total employees, completed timesheets, pending exceptions, adjustments, OT và approvals. Actions: validate, recalculate all, manager review, HR review, lock, unlock request, send payroll.

Không lock khi còn Critical Exception, Pending Adjustment hoặc unresolved attendance. LOCKED chỉ sửa qua Unlock Request.

```mermaid
flowchart LR
  A[Open] --> B[Validate]
  B --> C[Manager Review]
  C --> D[HR Review]
  D --> E[Locked]
  E --> F[Payroll Input]
```

[[Thời gian/Thời gian - Index]]

