import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import TimesheetService from '@/services/TimesheetService';
import { GetTimesheetParams } from '@/types/timesheet/timesheet';

export const timesheetKeys = {
  all: ['timesheets'] as const,
  lists: () => [...timesheetKeys.all, 'list'] as const,
  list: (params?: GetTimesheetParams) => [...timesheetKeys.lists(), params] as const,
  details: () => [...timesheetKeys.all, 'detail'] as const,
  detail: (id: string) => [...timesheetKeys.details(), id] as const,
};

export function useTimesheets(params?: GetTimesheetParams) {
  return useQuery({
    queryKey: timesheetKeys.list(params),
    queryFn: () => TimesheetService.GetAllTimesheet(params),
  });
}

export function useSubmitTimesheet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => TimesheetService.SubmitTimesheet(id),
    onSuccess: (timesheet) => {
      void queryClient.invalidateQueries({ queryKey: timesheetKeys.detail(timesheet.id) });
      void queryClient.invalidateQueries({ queryKey: timesheetKeys.lists() });
    },
  });
}
