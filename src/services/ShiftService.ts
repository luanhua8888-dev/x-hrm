import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import {
  CreateShiftPayload,
  ShiftTemplate,
  UpdateShiftPayload,
  WorkforceQueryParams,
} from '@/types/workforce-attendance/workforce-attendance';
export default class ShiftService {
  static GetAll = (params?: WorkforceQueryParams) =>
    api.get<PagingResponse<ShiftTemplate>>(API_ENDPOINTS.WORKFORCE.SHIFTS, params);
  static GetById = (id: string) => api.get<ShiftTemplate>(API_ENDPOINTS.WORKFORCE.SHIFT_DETAIL(id));
  static Create = (payload: CreateShiftPayload) =>
    api.post<ShiftTemplate>(API_ENDPOINTS.WORKFORCE.SHIFTS, payload);
  static Update = (id: string, payload: UpdateShiftPayload) =>
    api.put<ShiftTemplate>(API_ENDPOINTS.WORKFORCE.SHIFT_DETAIL(id), payload);
}
