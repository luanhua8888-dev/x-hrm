import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import {
  GetAllLeaveParams,
  LeaveDecisionRequest,
  LeaveRequest,
  RequestLeaveRequest,
} from '@/types/leave/leave';

class LeaveService {
  static GetAllLeave = (params?: GetAllLeaveParams) =>
    api.get<PagingResponse<LeaveRequest>>(API_ENDPOINTS.LEAVE.ROOT, params);

  static GetLeaveById = (id: string) =>
    api.get<LeaveRequest>(API_ENDPOINTS.LEAVE.DETAIL(id));

  static RequestLeave = (payload: RequestLeaveRequest) =>
    api.post<LeaveRequest>(API_ENDPOINTS.LEAVE.ROOT, payload);

  static ApproveLeave = (id: string, payload: LeaveDecisionRequest) =>
    api.post<LeaveRequest>(API_ENDPOINTS.LEAVE.APPROVE(id), payload);

  static RejectLeave = (id: string, payload: LeaveDecisionRequest) =>
    api.post<LeaveRequest>(API_ENDPOINTS.LEAVE.REJECT(id), payload);

  static CancelLeave = (id: string, payload: LeaveDecisionRequest) =>
    api.post<LeaveRequest>(API_ENDPOINTS.LEAVE.CANCEL(id), payload);
}

export default LeaveService;
