import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import UserService from '@/services/UserService';
import { CreateUserRequest, GetAllUserParams, UpdateUserRequest } from '@/types/user/user';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params?: GetAllUserParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export function useUsers(params?: GetAllUserParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => UserService.GetAllUser(params),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => UserService.GetUserById(id),
    enabled: Boolean(id),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserRequest) => UserService.CreateUser(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserRequest }) =>
      UserService.UpdateUser(id, payload),
    onSuccess: (user) => {
      void queryClient.invalidateQueries({ queryKey: userKeys.detail(user.id) });
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}
