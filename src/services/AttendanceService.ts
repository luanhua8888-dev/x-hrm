import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import { AttendanceRecord, GetAttendanceParams, PunchRequest } from '@/types/attendance/attendance';

class AttendanceService {
  static GetAttendance = (params?: GetAttendanceParams) =>
    api.get<PagingResponse<AttendanceRecord>>(API_ENDPOINTS.ATTENDANCE.ROOT, params);

  static PunchIn = (payload: PunchRequest) =>
    api.post<AttendanceRecord>(API_ENDPOINTS.ATTENDANCE.PUNCH_IN, payload);

  static PunchOut = (payload: PunchRequest) =>
    api.post<AttendanceRecord>(API_ENDPOINTS.ATTENDANCE.PUNCH_OUT, payload);
}

export default AttendanceService;
