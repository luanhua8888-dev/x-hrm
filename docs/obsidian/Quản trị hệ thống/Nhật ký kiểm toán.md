# Nhật ký kiểm toán

**Route:** `/admin/audit-logs`

## Chức năng

- Lọc theo thời gian, người thao tác, module, hành động và đối tượng.
- Xem before/after ở mức trường dữ liệu.
- Tra cứu correlation ID để theo dõi một luồng xuyên dịch vụ.
- Xuất dữ liệu theo permission và chính sách lưu trữ.

## Bảng danh sách

| Cột | Fixed | Ghi chú |
|---|---|---|
| Thời gian | Left | Timestamp có timezone |
| Người thao tác | Left | User và employee nếu có |
| Hành động | No | Create, update, approve, lock... |
| Module | No | Phân hệ phát sinh |
| Đối tượng | No | Entity type và ID |
| Kết quả | No | Success/Failed |
| IP/Thiết bị | No | Ngữ cảnh truy cập |
| Correlation ID | No | Mã truy vết |
| Thao tác | Right | Xem chi tiết |

## API

- `AuditLogService.GetAll(params)`
- `AuditLogService.GetById(id)`
- `AuditLogService.Export(params)`

## Quy tắc

- Audit log là read-only trên giao diện.
- Dữ liệu nhạy cảm phải được mask; không ghi password, token hoặc secret.

## Liên kết

- [[Quản trị hệ thống/Vai trò]]
- [[Tài khoản người dùng/Chi tiết tài khoản]]
- [[Thời gian/Chốt công]]
