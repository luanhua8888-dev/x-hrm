import { PagingParams } from '@/types/api/paging';

export type EmployeeStatus = 'ACTIVE' | 'TERMINATED' | 'ON_LEAVE' | 'PROBATION';

export interface Employee {
  id: string;
  employeeNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredName?: string;
  email?: string;
  phone?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth?: string;
  nationalId?: string;
  workType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
  employmentType?: 'PERMANENT' | 'FIXED_TERM' | 'TEMPORARY' | 'INTERN';
  contractEndDate?: string;
  maritalStatus?: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED';
  address?: string;
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
  preferredName?: string;
  email?: string;
  phone?: string;
  gender?: Employee['gender'];
  dateOfBirth?: string;
  nationalId?: string;
  workType?: Employee['workType'];
  employmentType?: Employee['employmentType'];
  contractEndDate?: string;
  maritalStatus?: Employee['maritalStatus'];
  address?: string;
  jobTitle?: string;
  department?: string;
  location?: string;
  supervisorName?: string;
  joinedDate?: string;
}

export interface UpdateEmployeeRequest {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  preferredName?: string;
  status?: EmployeeStatus;
}
