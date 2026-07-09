import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { MOCK_AUTH_ENABLED, MOCK_CREDENTIALS, MOCK_SESSION } from '@/config/mock-auth';
import { AuthSession, AuthUser, LoginRequest, RefreshTokenRequest } from '@/types/auth/auth';

class AuthService {
  static Login = (payload: LoginRequest): Promise<AuthSession> => {
    if (MOCK_AUTH_ENABLED) {
      const valid =
        payload.username === MOCK_CREDENTIALS.username &&
        payload.password === MOCK_CREDENTIALS.password;
      if (valid) return Promise.resolve(MOCK_SESSION);
      return Promise.reject(new Error('Invalid username or password'));
    }
    return api.post<AuthSession>(API_ENDPOINTS.AUTH.LOGIN, payload);
  };

  static RefreshToken = (payload: RefreshTokenRequest) =>
    api.post<AuthSession>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, payload);

  static Logout = () =>
    MOCK_AUTH_ENABLED ? Promise.resolve() : api.del(API_ENDPOINTS.AUTH.LOGOUT);

  static GetCurrentUser = (): Promise<AuthUser> => {
    if (MOCK_AUTH_ENABLED) return Promise.resolve(MOCK_SESSION.user!);
    return api.get<AuthUser>(API_ENDPOINTS.AUTH.ME);
  };
}

export default AuthService;
