import { useMemo, useState } from 'react';

import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { useEmployees } from '@/queries/employee.query';
import { GetAllEmployeeParams } from '@/types/employee/employee';

export default function EmployeeListPage() {
  const [keyword] = useState('');
  const params: GetAllEmployeeParams = useMemo(
    () => ({
      page: 1,
      pageSize: 20,
      keyword: keyword || undefined,
    }),
    [keyword],
  );
  const employeesQuery = useEmployees(params);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Employees</h1>
        <p className="text-sm text-slate-500">
          Employee records are independent from login accounts and will hold profile, job, salary,
          documents, and employment history.
        </p>
      </div>
      {employeesQuery.error ? <ErrorState error={employeesQuery.error} /> : null}
      <EmptyState
        title="Employee table foundation is ready"
        description="The service and query flow is implemented. Detailed employee profile sections are routed for future backend contract integration."
      />
    </div>
  );
}
