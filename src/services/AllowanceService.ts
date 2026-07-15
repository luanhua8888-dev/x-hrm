import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import {
  AllowanceRule,
  WorkforceQueryParams,
} from '@/types/workforce-attendance/workforce-attendance';
export default class AllowanceService {
  static GetAll = (params?: WorkforceQueryParams) =>
    api.get<PagingResponse<AllowanceRule>>(API_ENDPOINTS.WORKFORCE.ALLOWANCES, params);
  static GetById = (id: string) =>
    api.get<AllowanceRule>(API_ENDPOINTS.WORKFORCE.ALLOWANCE_DETAIL(id));
  static Create = (payload: Omit<AllowanceRule, 'id'>) =>
    api.post<AllowanceRule>(API_ENDPOINTS.WORKFORCE.ALLOWANCES, payload);
  static Update = (id: string, payload: Partial<AllowanceRule>) =>
    api.put<AllowanceRule>(API_ENDPOINTS.WORKFORCE.ALLOWANCE_DETAIL(id), payload);
}
