---
title: Chức danh
tags: [organization, job-title, table]
contentType: Reference
route: /organization/job-titles
---
# Quản lý chức danh

| Column | Width | Fixed | Action |
|---|---:|---|---|
| `code` | 110 | Left | Detail |
| `name` | 220 | Left | Edit |
| `jobFamily` | 160 | Không | Filter |
| `grade` | 100 | Không | Sort/filter |
| `clinicalQualification` | 200 | Không | View requirements |
| `employeeCount` | 110 | Không | Open employees |
| `status` | 110 | Không | Deactivate |
| `actions` | 60 | Right | View, edit, duplicate |

`fixedLeft=['code','name']`, `fixedRight=['actions']`. API hiện có `GET /organizations/job-titles`; backend cần CRUD và version hiệu lực.

[[Tổ chức/Tổ chức - Index]]

