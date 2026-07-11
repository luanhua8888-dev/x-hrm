import { PERMISSIONS } from '@/config/permissions';
import { AuthSession } from '@/types/auth/auth';

/**
 * Toggle mock authentication via .env.local:
 *   VITE_ENABLE_MOCKS=true   → use mock account below
 *   VITE_ENABLE_MOCKS=false  → use real API
 */
export const MOCK_AUTH_ENABLED = import.meta.env.VITE_ENABLE_MOCKS === 'true';

/** Mock credentials accepted in mock mode */
export const MOCK_CREDENTIALS = {
  username: 'Admin',
  password: 'Admin',
} as const;

/** Mock session returned on successful mock login */
export const MOCK_SESSION: AuthSession = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  user: {
    id: 'mock-user-001',
    username: 'Admin',
    email: 'admin@hrm.local',
    fullName: 'Administrator',
    employeeId: undefined,
    permissions: Object.values(PERMISSIONS),
  },
};
