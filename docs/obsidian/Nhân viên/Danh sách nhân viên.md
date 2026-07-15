---
title: Danh sách nhân viên
tags: [employee, table]
contentType: Reference
route: /employees
---
# Tra cứu nhân viên

| Column | Width | Fixed | Action |
|---|---:|---|---|
| `employeeCode` | 120 | Left | Detail |
| `fullName` | 220 | Left | Profile |
| `department` | 170 | Không | Filter |
| `jobTitle` | 170 | Không | Filter |
| `branch` | 150 | Không | Filter |
| `employeeType` | 130 | Không | Filter |
| `hireDate` | 120 | Không | Sort |
| `employmentStatus` | 130 | Không | Filter |
| `hasUserAccount` | 120 | Không | Create/open user |
| `actions` | 60 | Right | View, edit, create account |

`fixedLeft=['employeeCode','fullName']`, `fixedRight=['actions']`.

API: `GET /employees`; actions liên kết [[Nhân viên/Hồ sơ nhân viên]], [[Tài khoản người dùng/Tạo tài khoản]] và [[Thời gian/Thời gian - Index]].

[[Nhân viên/Nhân viên - Index]]
