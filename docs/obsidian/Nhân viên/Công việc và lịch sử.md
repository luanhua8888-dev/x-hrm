---
title: Công việc và lịch sử
tags: [employee, employment-history]
contentType: Reference
route: /employees/:employeeId/job
---
# Quản lý công việc và lịch sử

Assignment gồm Branch, Department, Job Title, Manager, Employee Type, effectiveFrom và effectiveTo. Update tạo history record mới, không overwrite assignment cũ.

API cần: `GET/PUT /employees/:id/job`, `GET /employees/:id/employment-history`. Assignment mới ảnh hưởng Leave approver, Schedule grouping, Permission scope và Reports theo ngày hiệu lực.

[[Nhân viên/Nhân viên - Index]]

