import { PagingParams } from '@/types/api/paging';

export type PerformanceReviewStatus =
  'DRAFT' | 'ACTIVATED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewerId: string;
  periodStart: string;
  periodEnd: string;
  dueDate: string;
  status: PerformanceReviewStatus;
}

export interface GetPerformanceReviewParams extends PagingParams {
  status?: PerformanceReviewStatus;
}
