# Quyền hạn

**Route:** `/admin/permissions`

## Chức năng

- Tra cứu permission theo module, resource và action.
- Xem vai trò đang sử dụng permission.
- Quản lý mô tả và trạng thái permission do hệ thống hỗ trợ.
- Phát hiện permission không còn được route hoặc chức năng sử dụng.

## Bảng danh sách

| Cột | Fixed | Ghi chú |
|---|---|---|
| Permission code | Left | Ví dụ `attendance.view_all` |
| Tên quyền | Left | Nhãn hiển thị |
| Module | No | Attendance, Employee, Leave... |
| Resource | No | Đối tượng được bảo vệ |
| Action | No | View, create, update, approve... |
| Số vai trò | No | Vai trò đang gán quyền |
| Trạng thái | No | Active/Inactive |
| Thao tác | Right | Xem chi tiết, chỉnh mô tả |

## API

- `PermissionService.GetAll(params)`
- `PermissionService.GetById(id)`
- `PermissionService.GetRoleUsage(id)`
- `PermissionService.Update(id, payload)`

## Quy tắc

- Không xóa permission đã phát hành; chỉ ngừng sử dụng có kiểm soát.
- Frontend dùng `hasPermission(permissionCode)` hoặc `PermissionGuard`.

## Liên kết

- [[Quản trị hệ thống/Vai trò]]
- [[Kiến trúc frontend và API]]
