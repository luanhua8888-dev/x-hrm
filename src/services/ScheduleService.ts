import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import {
  ShiftAssignment,
  WorkforceQueryParams,
} from '@/types/workforce-attendance/workforce-attendance';
export default class ScheduleService {
  static GetAll = (params?: WorkforceQueryParams) =>
    api.get<PagingResponse<ShiftAssignment>>(API_ENDPOINTS.WORKFORCE.SCHEDULES, params);
  static GetById = (id: string) =>
    api.get<ShiftAssignment>(API_ENDPOINTS.WORKFORCE.SCHEDULE_DETAIL(id));
  static Create = (payload: Omit<ShiftAssignment, 'id'>) =>
    api.post<ShiftAssignment>(API_ENDPOINTS.WORKFORCE.SCHEDULES, payload);
  static Update = (id: string, payload: Partial<ShiftAssignment>) =>
    api.put<ShiftAssignment>(API_ENDPOINTS.WORKFORCE.SCHEDULE_DETAIL(id), payload);
  static Publish = (payload: { month: string; branchId: string }) =>
    api.post(API_ENDPOINTS.WORKFORCE.PUBLISH_SCHEDULE, payload);
}
