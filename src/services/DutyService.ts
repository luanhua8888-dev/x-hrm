import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import {
  DutyAssignment,
  WorkforceQueryParams,
} from '@/types/workforce-attendance/workforce-attendance';
export default class DutyService {
  static GetAll = (params?: WorkforceQueryParams) =>
    api.get<PagingResponse<DutyAssignment>>(API_ENDPOINTS.WORKFORCE.DUTY, params);
  static GetById = (id: string) => api.get<DutyAssignment>(API_ENDPOINTS.WORKFORCE.DUTY_DETAIL(id));
  static Create = (payload: Omit<DutyAssignment, 'id'>) =>
    api.post<DutyAssignment>(API_ENDPOINTS.WORKFORCE.DUTY, payload);
  static Update = (id: string, payload: Partial<DutyAssignment>) =>
    api.put<DutyAssignment>(API_ENDPOINTS.WORKFORCE.DUTY_DETAIL(id), payload);
}
