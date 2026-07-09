import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import { CreateUserRequest, GetAllUserParams, UpdateUserRequest, User } from '@/types/user/user';

class UserService {
  static GetAllUser = (params?: GetAllUserParams) =>
    api.get<PagingResponse<User>>(API_ENDPOINTS.USER.ROOT, params);

  static GetUserById = (id: string) =>
    api.get<User>(API_ENDPOINTS.USER.DETAIL(id));

  static CreateUser = (payload: CreateUserRequest) =>
    api.post<User>(API_ENDPOINTS.USER.ROOT, payload);

  static UpdateUser = (id: string, payload: UpdateUserRequest) =>
    api.put<User>(API_ENDPOINTS.USER.DETAIL(id), payload);

  static DeleteUser = (id: string) =>
    api.del(API_ENDPOINTS.USER.DETAIL(id));
}

export default UserService;
