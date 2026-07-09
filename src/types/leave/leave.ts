import { PagingParams } from '@/types/api/paging';

export type LeaveStatus =
  'DRAFT' | 'PENDING_APPROVAL' | 'SCHEDULED' | 'TAKEN' | 'REJECTED' | 'CANCELLED';

export type LeaveDurationType =
  'FULL_DAY' | 'HALF_DAY_MORNING' | 'HALF_DAY_AFTERNOON' | 'SPECIFIC_TIME';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveTypeId: string;
  leaveTypeName: string;
  fromDate: string;
  toDate: string;
  durationType: LeaveDurationType;
  status: LeaveStatus;
  comment?: string;
}

export interface GetAllLeaveParams extends PagingParams {
  employeeId?: string;
  status?: LeaveStatus;
  fromDate?: string;
  toDate?: string;
}

export interface RequestLeaveRequest {
  leaveTypeId: string;
  fromDate: string;
  toDate: string;
  durationType: LeaveDurationType;
  comment?: string;
}

export interface LeaveDecisionRequest {
  comment?: string;
}
