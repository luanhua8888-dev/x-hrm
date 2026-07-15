import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import {
  AttendancePolicy,
  WorkforceQueryParams,
} from '@/types/workforce-attendance/workforce-attendance';
export default class AttendancePolicyService {
  static GetAll = (params?: WorkforceQueryParams) =>
    api.get<PagingResponse<AttendancePolicy>>(API_ENDPOINTS.WORKFORCE.POLICIES, params);
  static GetById = (id: string) =>
    api.get<AttendancePolicy>(API_ENDPOINTS.WORKFORCE.POLICY_DETAIL(id));
  static Create = (payload: Omit<AttendancePolicy, 'id'>) =>
    api.post<AttendancePolicy>(API_ENDPOINTS.WORKFORCE.POLICIES, payload);
  static Update = (id: string, payload: Partial<AttendancePolicy>) =>
    api.put<AttendancePolicy>(API_ENDPOINTS.WORKFORCE.POLICY_DETAIL(id), payload);
}
