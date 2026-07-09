import { PagingParams } from '@/types/api/paging';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'LOCKED';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  employeeId?: string;
  status: UserStatus;
  createdAt: string;
}

export interface GetAllUserParams extends PagingParams {
  status?: UserStatus;
  roleId?: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  fullName: string;
  employeeId?: string;
  roleIds: string[];
  password: string;
}

export interface UpdateUserRequest {
  email?: string;
  fullName?: string;
  status?: UserStatus;
  roleIds?: string[];
}
