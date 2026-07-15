import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import {
  ShiftSwapRequest,
  WorkforceQueryParams,
} from '@/types/workforce-attendance/workforce-attendance';
export default class ShiftSwapService {
  static GetAll = (params?: WorkforceQueryParams) =>
    api.get<PagingResponse<ShiftSwapRequest>>(API_ENDPOINTS.WORKFORCE.SHIFT_SWAPS, params);
  static GetById = (id: string) =>
    api.get<ShiftSwapRequest>(API_ENDPOINTS.WORKFORCE.SHIFT_SWAP_DETAIL(id));
  static Create = (payload: Omit<ShiftSwapRequest, 'id'>) =>
    api.post<ShiftSwapRequest>(API_ENDPOINTS.WORKFORCE.SHIFT_SWAPS, payload);
  static Update = (id: string, payload: Partial<ShiftSwapRequest>) =>
    api.put<ShiftSwapRequest>(API_ENDPOINTS.WORKFORCE.SHIFT_SWAP_DETAIL(id), payload);
}
