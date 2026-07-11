export interface Company {
  id: string;
  code: string;
  name: string;
  employees: number;
  departments: number;
  location: string;
  taxCode: string;
  active: boolean;
}

export interface Department {
  id: string;
  companyId: string;
  code: string;
  name: string;
  owner: string;
  employees: number;
  active: boolean;
}

export type PopupState =
  | { type: 'company-create' }
  | { type: 'company-edit'; company: Company }
  | { type: 'department-create' }
  | { type: 'department-edit'; department: Department }
  | { type: 'company-delete'; company: Company }
  | { type: 'department-delete'; department: Department }
  | null;
