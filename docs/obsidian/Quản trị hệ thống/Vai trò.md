# Vai trò

**Route:** `/admin/roles`

## Chức năng

- Tìm kiếm, lọc trạng thái và phạm vi dữ liệu.
- Tạo, sửa, sao chép, kích hoạt hoặc ngừng vai trò.
- Gán permission theo module và hành động.
- Xem tài khoản đang sử dụng vai trò.

## Bảng danh sách

| Cột | Fixed | Ghi chú |
|---|---|---|
| Mã vai trò | Left | Khóa nghiệp vụ |
| Tên vai trò | Left | Tên hiển thị |
| Phạm vi | No | Self, Team, Branch hoặc All |
| Số quyền | No | Tổng permission được gán |
| Số tài khoản | No | Tài khoản đang sử dụng |
| Trạng thái | No | Active/Inactive |
| Cập nhật lúc | No | Thời điểm gần nhất |
| Thao tác | Right | Xem, sửa, sao chép, trạng thái |

## API

- `RoleService.GetAll(params)`
- `RoleService.GetById(id)`
- `RoleService.Create(payload)`
- `RoleService.Update(id, payload)`
- `RoleService.UpdatePermissions(id, permissionCodes)`
- `RoleService.UpdateStatus(id, status)`

## Liên kết

- [[Quản trị hệ thống/Quyền hạn]]
- [[Tài khoản người dùng/Danh sách tài khoản]]
- [[Quản trị hệ thống/Nhật ký kiểm toán]]
