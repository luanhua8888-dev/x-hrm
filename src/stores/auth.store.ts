import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { AuthSession, AuthUser } from '@/types/auth/auth';

interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  user?: AuthUser;
  isAuthenticated: boolean;
  SetSession: (session: AuthSession) => void;
  ClearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      SetSession: (session) =>
        set({
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          user: session.user,
          isAuthenticated: true,
        }),
      ClearSession: () =>
        set({
          accessToken: undefined,
          refreshToken: undefined,
          user: undefined,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'hrm-auth-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
