---
title: Login
tags: [authentication, screen]
contentType: Reference
---
# Đăng nhập vào Hospital HRM

Màn hình `/login` xác thực tài khoản, tạo session và trả người dùng về route đã yêu cầu.

## Business rules

- Form hiển thị ngay khi mở trang
- Username và password bắt buộc
- Password không chứa khoảng trắng
- Người đã xác thực chuyển tới `/dashboard`
- Request đang chạy khóa nút Submit
- Lỗi không hiển thị chi tiết kỹ thuật

## Screen flow

```mermaid
flowchart TD
  A[Open /login] --> B{Authenticated?}
  B -- Yes --> C[/dashboard]
  B -- No --> D[Show form]
  D --> E[Validate]
  E -- Invalid --> D
  E -- Valid --> F[Submit]
  F -- Failed --> G[Show error]
  F -- Success --> H[Save session]
  H --> I[Original route or dashboard]
```

## API flow

```mermaid
sequenceDiagram
  participant UI as LoginForm
  participant Q as useLogin
  participant S as AuthService
  participant API as Backend
  UI->>Q: mutate(credentials)
  Q->>S: Login(payload)
  S->>API: POST /auth/login
  API-->>S: AuthSession
  S-->>Q: session
  Q-->>UI: save session and navigate
```

## Data model

```mermaid
erDiagram
  USER_ACCOUNT }o--|| EMPLOYEE : may_belong_to
  USER_ACCOUNT ||--o{ USER_PERMISSION : has
  PERMISSION ||--o{ USER_PERMISSION : grants
  USER_ACCOUNT { string id string username string status }
  EMPLOYEE { string id string employeeCode string fullName }
  PERMISSION { string code string name }
```

## Source map

- `src/components/login/LoginPage.tsx`
- `src/components/login/LoginForm.tsx`
- `src/queries/auth.query.ts`
- `src/services/AuthService.ts`

## Luồng liên quan

[[Tài khoản người dùng/Tài khoản người dùng - Index]] → [[Quản trị hệ thống/Quản trị hệ thống - Index]] → [[Bảng điều khiển]]

[[Hospital HRM - Index]]
