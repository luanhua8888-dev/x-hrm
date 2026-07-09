import { useQuery } from '@tanstack/react-query';

import ReportService from '@/services/ReportService';
import { GetReportParams } from '@/types/report/report';

export const reportKeys = {
  all: ['reports'] as const,
  lists: () => [...reportKeys.all, 'list'] as const,
  list: (params?: GetReportParams) => [...reportKeys.lists(), params] as const,
};

export function useReports(params?: GetReportParams) {
  return useQuery({
    queryKey: reportKeys.list(params),
    queryFn: () => ReportService.GetAllReport(params),
  });
}
