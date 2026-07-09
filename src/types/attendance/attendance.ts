import { PagingParams } from '@/types/api/paging';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  punchInAt: string;
  punchOutAt?: string;
  note?: string;
}

export interface GetAttendanceParams extends PagingParams {
  employeeId?: string;
  fromDate?: string;
  toDate?: string;
}

export interface PunchRequest {
  occurredAt: string;
  note?: string;
}
