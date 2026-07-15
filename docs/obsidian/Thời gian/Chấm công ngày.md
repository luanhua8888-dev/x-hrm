---
title: Chấm công ngày
tags: [attendance, table]
contentType: Reference
route: /workforce-attendance/daily
---
# Theo dõi chấm công ngày

| Column | Width | Fixed | Action |
|---|---:|---|---|
| `employee` | 220 | Left | Detail |
| `department` | 160 | Left | Filter |
| `shift` | 150 | Không | Schedule detail |
| `checkIn` | 100 | Không | Log timeline |
| `checkOut` | 100 | Không | Log timeline |
| `worked` | 100 | Không | Calculation |
| `late` | 90 | Không | Exception |
| `earlyLeave` | 100 | Không | Exception |
| `overtime` | 90 | Không | OT detail |
| `status` | 130 | Right | Filter |
| `actions` | 60 | Right | View, recalculate, adjustment |

`fixedLeft=['employee','department']`, `fixedRight=['status','actions']`. API: `GetDaily`, `GetById`, `Recalculate`, `CreateAdjustment`.

[[Thời gian/Thời gian - Index]]

