---
title: Khoa phòng
tags: [organization, department, table]
contentType: Reference
route: /organization/departments
---
# Quản lý khoa phòng

## Table columns

| Column | Width | Fixed | Filter/Action |
|---|---:|---|---|
| `code` | 110 | Left | Keyword, open detail |
| `name` | 220 | Left | Keyword, sort |
| `parentDepartment` | 180 | Không | Department filter |
| `branch` | 160 | Không | Branch filter |
| `manager` | 180 | Không | Open employee |
| `employeeCount` | 110 | Không | Open filtered employees |
| `effectiveFrom` | 120 | Không | Sort |
| `status` | 110 | Không | Status filter |
| `actions` | 60 | Right | View, edit, deactivate |

`fixedLeft=['code','name']`, `fixedRight=['actions']`.

API: `GET /organizations/departments`; backend cần `POST`, `PUT /:id`, `POST /:id/deactivate`.

[[Tổ chức/Tổ chức - Index]]

