import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import { GetReportParams, ReportDefinition } from '@/types/report/report';

class ReportService {
  static GetAllReport = (params?: GetReportParams) =>
    api.get<PagingResponse<ReportDefinition>>(API_ENDPOINTS.REPORT.ROOT, params);
}

export default ReportService;
