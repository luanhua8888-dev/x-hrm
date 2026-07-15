import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import { AttendanceRecord, GetAttendanceParams, PunchRequest } from '@/types/attendance/attendance';
import {
  AttendanceDailySummary,
  AttendanceLog,
  CreateAttendanceAdjustmentPayload,
  WorkforceQueryParams,
} from '@/types/workforce-attendance/workforce-attendance';

class AttendanceService {
  static GetAll = (params?: WorkforceQueryParams) =>
    api.get<PagingResponse<AttendanceDailySummary>>(API_ENDPOINTS.ATTENDANCE.ROOT, params);
  static GetById = (id: string) =>
    api.get<AttendanceDailySummary>(API_ENDPOINTS.ATTENDANCE.DETAIL(id));
  static Create = (payload: CreateAttendanceAdjustmentPayload) =>
    api.post<AttendanceDailySummary>(API_ENDPOINTS.ATTENDANCE.ADJUSTMENTS, payload);
  static Update = (id: string, payload: Partial<CreateAttendanceAdjustmentPayload>) =>
    api.put<AttendanceDailySummary>(API_ENDPOINTS.ATTENDANCE.DETAIL(id), payload);
  static GetDaily = (params?: WorkforceQueryParams) =>
    api.get<PagingResponse<AttendanceDailySummary>>(API_ENDPOINTS.ATTENDANCE.DAILY, params);
  static GetLogs = (params?: WorkforceQueryParams) =>
    api.get<PagingResponse<AttendanceLog>>(API_ENDPOINTS.ATTENDANCE.LOGS, params);
  static Recalculate = (id: string) =>
    api.post<AttendanceDailySummary>(API_ENDPOINTS.ATTENDANCE.RECALCULATE(id));
  static CreateAdjustment = (payload: CreateAttendanceAdjustmentPayload) =>
    api.post(API_ENDPOINTS.ATTENDANCE.ADJUSTMENTS, payload);
  static GetAttendance = (params?: GetAttendanceParams) =>
    api.get<PagingResponse<AttendanceRecord>>(API_ENDPOINTS.ATTENDANCE.ROOT, params);

  static PunchIn = (payload: PunchRequest) =>
    api.post<AttendanceRecord>(API_ENDPOINTS.ATTENDANCE.PUNCH_IN, payload);

  static PunchOut = (payload: PunchRequest) =>
    api.post<AttendanceRecord>(API_ENDPOINTS.ATTENDANCE.PUNCH_OUT, payload);
}

export default AttendanceService;
