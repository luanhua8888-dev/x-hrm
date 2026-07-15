import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import {
  OvertimeRequest,
  WorkforceQueryParams,
} from '@/types/workforce-attendance/workforce-attendance';
export default class OvertimeService {
  static GetAll = (params?: WorkforceQueryParams) =>
    api.get<PagingResponse<OvertimeRequest>>(API_ENDPOINTS.WORKFORCE.OVERTIME, params);
  static GetById = (id: string) =>
    api.get<OvertimeRequest>(API_ENDPOINTS.WORKFORCE.OVERTIME_DETAIL(id));
  static Create = (payload: Omit<OvertimeRequest, 'id'>) =>
    api.post<OvertimeRequest>(API_ENDPOINTS.WORKFORCE.OVERTIME, payload);
  static Update = (id: string, payload: Partial<OvertimeRequest>) =>
    api.put<OvertimeRequest>(API_ENDPOINTS.WORKFORCE.OVERTIME_DETAIL(id), payload);
}
