import { PagingParams } from '@/types/api/paging';

export interface ReportDefinition {
  id: string;
  name: string;
  description?: string;
  domain: string;
  updatedAt: string;
}

export interface GetReportParams extends PagingParams {
  domain?: string;
}
