import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import LeaveService from '@/services/LeaveService';
import { GetAllLeaveParams, LeaveDecisionRequest, RequestLeaveRequest } from '@/types/leave/leave';

export const leaveKeys = {
  all: ['leave'] as const,
  lists: () => [...leaveKeys.all, 'list'] as const,
  list: (params?: GetAllLeaveParams) => [...leaveKeys.lists(), params] as const,
  details: () => [...leaveKeys.all, 'detail'] as const,
  detail: (id: string) => [...leaveKeys.details(), id] as const,
};

export function useLeaves(params?: GetAllLeaveParams) {
  return useQuery({
    queryKey: leaveKeys.list(params),
    queryFn: () => LeaveService.GetAllLeave(params),
  });
}

export function useLeave(id: string) {
  return useQuery({
    queryKey: leaveKeys.detail(id),
    queryFn: () => LeaveService.GetLeaveById(id),
    enabled: Boolean(id),
  });
}

export function useRequestLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RequestLeaveRequest) => LeaveService.RequestLeave(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: leaveKeys.lists() });
    },
  });
}

export function useApproveLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: LeaveDecisionRequest }) =>
      LeaveService.ApproveLeave(id, payload),
    onSuccess: (leave) => {
      void queryClient.invalidateQueries({ queryKey: leaveKeys.detail(leave.id) });
      void queryClient.invalidateQueries({ queryKey: leaveKeys.lists() });
    },
  });
}
