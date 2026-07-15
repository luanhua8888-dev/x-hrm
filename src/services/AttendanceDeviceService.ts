import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import {
  AttendanceDevice,
  WorkforceQueryParams,
} from '@/types/workforce-attendance/workforce-attendance';
export default class AttendanceDeviceService {
  static GetAll = (params?: WorkforceQueryParams) =>
    api.get<PagingResponse<AttendanceDevice>>(API_ENDPOINTS.WORKFORCE.DEVICES, params);
  static GetById = (id: string) =>
    api.get<AttendanceDevice>(API_ENDPOINTS.WORKFORCE.DEVICE_DETAIL(id));
  static Create = (payload: Omit<AttendanceDevice, 'id'>) =>
    api.post<AttendanceDevice>(API_ENDPOINTS.WORKFORCE.DEVICES, payload);
  static Update = (id: string, payload: Partial<AttendanceDevice>) =>
    api.put<AttendanceDevice>(API_ENDPOINTS.WORKFORCE.DEVICE_DETAIL(id), payload);
}
