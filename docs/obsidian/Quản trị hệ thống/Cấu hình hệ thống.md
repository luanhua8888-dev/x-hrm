# Cấu hình hệ thống

**Route:** `/admin/settings`

## Chức năng

- Cấu hình locale, timezone, định dạng ngày giờ và kỳ công mặc định.
- Cấu hình thông báo, tệp đính kèm và tham số tích hợp.
- Quản lý cấu hình theo nhóm, môi trường và phạm vi chi nhánh.
- Xem lịch sử phiên bản, kiểm tra hợp lệ và khôi phục phiên bản được duyệt.

## Bảng nhóm cấu hình

| Cột | Fixed | Ghi chú |
|---|---|---|
| Nhóm cấu hình | Left | General, Attendance, Leave... |
| Phạm vi | Left | Global hoặc Branch |
| Phiên bản | No | Version hiện hành |
| Ngày hiệu lực | No | Thời điểm áp dụng |
| Cập nhật bởi | No | Người thay đổi cuối |
| Trạng thái | No | Draft/Active/Archived |
| Thao tác | Right | Xem, sửa, lịch sử |

## API

- `SystemSettingService.GetAll(params)`
- `SystemSettingService.GetByKey(key, scope)`
- `SystemSettingService.Update(key, payload)`
- `SystemSettingService.GetHistory(key, scope)`
- `SystemSettingService.ActivateVersion(id)`

## Quy tắc

- Không hiển thị hoặc trả secret về frontend sau khi đã lưu.
- Cấu hình ảnh hưởng tính công phải có hiệu lực theo thời gian và audit log.

## Liên kết

- [[Kiến trúc frontend và API]]
- [[Thời gian/Chính sách chấm công]]
- [[Nghỉ phép/Nghỉ phép - Index]]
