import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import EmployeeService from '@/services/EmployeeService';
import {
  CreateEmployeeRequest,
  GetAllEmployeeParams,
  UpdateEmployeeRequest,
} from '@/types/employee/employee';

export const employeeKeys = {
  all: ['employees'] as const,
  lists: () => [...employeeKeys.all, 'list'] as const,
  list: (params?: GetAllEmployeeParams) => [...employeeKeys.lists(), params] as const,
  details: () => [...employeeKeys.all, 'detail'] as const,
  detail: (id: string) => [...employeeKeys.details(), id] as const,
};

export function useEmployees(params?: GetAllEmployeeParams) {
  return useQuery({
    queryKey: employeeKeys.list(params),
    queryFn: () => EmployeeService.GetAllEmployee(params),
  });
}

export function useEmployee(id: string) {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: () => EmployeeService.GetEmployeeById(id),
    enabled: Boolean(id),
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEmployeeRequest) => EmployeeService.CreateEmployee(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateEmployeeRequest }) =>
      EmployeeService.UpdateEmployee(id, payload),
    onSuccess: (employee) => {
      void queryClient.invalidateQueries({ queryKey: employeeKeys.detail(employee.id) });
      void queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
}
