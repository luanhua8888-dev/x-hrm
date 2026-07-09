import { api } from '@/api/api-client';
import { API_ENDPOINTS } from '@/api/api-endpoints';
import { PagingResponse } from '@/types/api/paging';
import {
  CreateEmployeeRequest,
  Employee,
  GetAllEmployeeParams,
  UpdateEmployeeRequest,
} from '@/types/employee/employee';

class EmployeeService {
  static GetAllEmployee = (params?: GetAllEmployeeParams) =>
    api.get<PagingResponse<Employee>>(API_ENDPOINTS.EMPLOYEE.ROOT, params);

  static GetEmployeeById = (id: string) =>
    api.get<Employee>(API_ENDPOINTS.EMPLOYEE.DETAIL(id));

  static CreateEmployee = (payload: CreateEmployeeRequest) =>
    api.post<Employee>(API_ENDPOINTS.EMPLOYEE.ROOT, payload);

  static UpdateEmployee = (id: string, payload: UpdateEmployeeRequest) =>
    api.put<Employee>(API_ENDPOINTS.EMPLOYEE.DETAIL(id), payload);

  static DeleteEmployee = (id: string) =>
    api.del(API_ENDPOINTS.EMPLOYEE.DETAIL(id));
}

export default EmployeeService;
