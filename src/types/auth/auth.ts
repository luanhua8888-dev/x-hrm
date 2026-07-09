import { Permission } from '@/config/permissions';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  employeeId?: string;
  permissions: Permission[];
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  user?: AuthUser;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
