import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import AuthService from '@/services/AuthService';
import { useAuthStore } from '@/stores/auth.store';
import { LoginRequest } from '@/types/auth/auth';

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => AuthService.GetCurrentUser(),
    enabled: useAuthStore((state) => state.isAuthenticated),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.SetSession);

  return useMutation({
    mutationFn: (payload: LoginRequest) => AuthService.Login(payload),
    onSuccess: (session) => {
      setSession(session);
      void queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((state) => state.ClearSession);

  return useMutation({
    mutationFn: () => AuthService.Logout(),
    onSettled: () => {
      clearSession();
      queryClient.clear();
    },
  });
}
