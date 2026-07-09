import { PagingParams } from '@/types/api/paging';

export type EmployeeStatus = 'ACTIVE' | 'TERMINATED' | 'ON_LEAVE' | 'PROBATION';

export interface Employee {
  id: string;
  employeeNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredName?: string;
  status: EmployeeStatus;
  jobTitle?: string;
  department?: string;
  location?: string;
  supervisorName?: string;
  joinedDate?: string;
}

export interface GetAllEmployeeParams extends PagingParams {
  status?: EmployeeStatus;
  departmentId?: string;
  jobTitleId?: string;
  locationId?: string;
  supervisorId?: string;
}

export interface CreateEmployeeRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeNumber?: string;
}

export interface UpdateEmployeeRequest {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  preferredName?: string;
  status?: EmployeeStatus;
}
