import { PagingParams } from '@/types/api/paging';

export type TimesheetStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

export interface Timesheet {
  id: string;
  employeeId: string;
  employeeName: string;
  periodStart: string;
  periodEnd: string;
  status: TimesheetStatus;
  totalHours: number;
}

export interface GetTimesheetParams extends PagingParams {
  employeeId?: string;
  status?: TimesheetStatus;
}
