---
title: Danh sách tài khoản
tags: [users, table]
contentType: Reference
route: /users
---
# Tra cứu tài khoản người dùng

| Column | Width | Fixed | Filter/Action |
|---|---:|---|---|
| `username` | 160 | Left | Keyword, detail |
| `fullName` | 220 | Left | Employee profile |
| `employeeCode` | 120 | Không | Employee filter |
| `email` | 220 | Không | Keyword |
| `roles` | 180 | Không | Role filter |
| `branchScope` | 160 | Không | Branch filter |
| `lastLoginAt` | 150 | Không | Sort |
| `status` | 110 | Không | Status filter |
| `actions` | 60 | Right | View, edit, lock, reset password |

`fixedLeft=['username','fullName']`, `fixedRight=['actions']`. API: `GET /users`.

[[Tài khoản người dùng/Tài khoản người dùng - Index]]

