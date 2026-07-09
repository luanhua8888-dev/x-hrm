import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import AttendanceService from '@/services/AttendanceService';
import { GetAttendanceParams, PunchRequest } from '@/types/attendance/attendance';

export const attendanceKeys = {
  all: ['attendance'] as const,
  lists: () => [...attendanceKeys.all, 'list'] as const,
  list: (params?: GetAttendanceParams) => [...attendanceKeys.lists(), params] as const,
};

export function useAttendance(params?: GetAttendanceParams) {
  return useQuery({
    queryKey: attendanceKeys.list(params),
    queryFn: () => AttendanceService.GetAttendance(params),
  });
}

export function usePunchIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PunchRequest) => AttendanceService.PunchIn(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: attendanceKeys.lists() });
    },
  });
}

export function usePunchOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PunchRequest) => AttendanceService.PunchOut(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: attendanceKeys.lists() });
    },
  });
}
