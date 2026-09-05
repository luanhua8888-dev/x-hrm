export type DashboardPeriod = 'week' | 'month' | 'quarter';
export type Department = 'all' | 'Kỹ thuật' | 'Nhân sự' | 'Thiết kế';
export type AttendanceStatus = 'working' | 'late' | 'absent';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';
export type LeaveRequest = {
  id: string;
  employee: string;
  type: string;
  duration: string;
  dates: string;
  status: LeaveStatus;
};

export const departments: readonly Department[] = ['all', 'Kỹ thuật', 'Nhân sự', 'Thiết kế'];

export const workforce = [
  {
    id: 'e-001',
    name: 'Nguyễn Văn A',
    department: 'Kỹ thuật',
    checkIn: '07:55',
    status: 'working',
  },
  { id: 'e-002', name: 'Trần Thị B', department: 'Nhân sự', checkIn: '08:17', status: 'late' },
  { id: 'e-003', name: 'Lê Văn C', department: 'Thiết kế', checkIn: '—', status: 'absent' },
  { id: 'e-004', name: 'Phạm Thị D', department: 'Kỹ thuật', checkIn: '08:02', status: 'working' },
] as const;

export const initialLeaveRequests = [
  {
    id: 'lr-001',
    employee: 'Nguyễn Văn A',
    type: 'Nghỉ phép năm',
    duration: '2 ngày',
    dates: '18–19/07',
    status: 'pending',
  },
  {
    id: 'lr-002',
    employee: 'Trần Thị B',
    type: 'Nghỉ bệnh',
    duration: '1 ngày',
    dates: '20/07',
    status: 'pending',
  },
  {
    id: 'lr-003',
    employee: 'Lê Văn C',
    type: 'Làm việc từ xa',
    duration: '1 ngày',
    dates: '22/07',
    status: 'pending',
  },
] satisfies readonly LeaveRequest[];

export const alerts = [
  {
    id: 'alert-contract',
    title: 'Hợp đồng sắp hết hạn',
    detail: '5 hợp đồng hết hạn trong 30 ngày',
    tone: 'warning',
  },
  {
    id: 'alert-attendance',
    title: 'Thiếu dữ liệu chấm công',
    detail: '8 nhân viên cần bổ sung giờ ra',
    tone: 'danger',
  },
  {
    id: 'alert-birthday',
    title: 'Sinh nhật trong tuần',
    detail: '3 nhân viên có sinh nhật sắp tới',
    tone: 'info',
  },
] as const;
