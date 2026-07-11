import { useLingui } from '@lingui/react';
import { useMemo, useState } from 'react';

import { FilterCustom } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { employeeMockData } from '@/components/employees/list/EmployeeData';
import { createEmployeeTableColumns } from '@/components/employees/list/EmployeeTableColumns';
import {
  employeeText,
  getEmployeeColumnText,
  getEmployeeText,
  type EmployeeTextKey,
} from '@/components/employees/list/EmployeeText';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import type { EmployeeStatus } from '@/types/employee/employee';

const statusFilterOptions = [
  { label: employeeText.all, value: '' },
  { label: employeeText.active, value: 'ACTIVE' },
  { label: employeeText.probation, value: 'PROBATION' },
  { label: employeeText.onLeave, value: 'ON_LEAVE' },
  { label: employeeText.terminated, value: 'TERMINATED' },
] as const;

export default function EmployeeListPage() {
  const { i18n } = useLingui();
  const tr = (key: EmployeeTextKey) => getEmployeeText(i18n.locale, key);
  const [employees, setEmployees] = useState(() => employeeMockData);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<EmployeeStatus | ''>('');
  const debouncedKeyword = useDebouncedValue(keyword);

  const visibleEmployees = useMemo(() => {
    const query = debouncedKeyword.trim().toLowerCase();
    return employees.filter((employee) => {
      const statusMatch = status ? employee.status === status : true;
      if (!query) return statusMatch;

      const haystack = [
        employee.employeeNumber,
        employee.firstName,
        employee.middleName,
        employee.lastName,
        employee.preferredName,
        employee.jobTitle,
        employee.department,
        employee.location,
        employee.supervisorName,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return statusMatch && haystack.includes(query);
    });
  }, [debouncedKeyword, employees, status]);

  const columns = useMemo(
    () =>
      createEmployeeTableColumns(i18n.locale, (id) => {
        setEmployees((current) => current.filter((item) => item.id !== id));
      }),
    [i18n.locale],
  );

  const summary = useMemo(() => {
    return {
      total: visibleEmployees.length,
      currentPage: visibleEmployees.length,
      active: visibleEmployees.filter((item) => item.status === 'ACTIVE').length,
      probation: visibleEmployees.filter((item) => item.status === 'PROBATION').length,
      onLeave: visibleEmployees.filter((item) => item.status === 'ON_LEAVE').length,
    };
  }, [visibleEmployees]);

  return (
    <div className="space-y-4">
      <header className="space-y-3 border-b border-brand-border pb-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-base font-semibold tracking-tight text-brand-primary-text">
            {tr('pageTitle')}
          </h1>
          <p className="max-w-3xl text-xs text-brand-secondary-text">{tr('pageDescription')}</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label={tr('totalEmployees')} value={String(summary.total)} />
          <SummaryCard label={tr('currentPage')} value={String(summary.currentPage)} />
          <SummaryCard label={tr('activeEmployees')} value={String(summary.active)} />
          <SummaryCard label={tr('probationEmployees')} value={String(summary.probation)} />
        </div>
      </header>

      <FilterCustom
        keyword={keyword}
        onKeywordChange={(value) => {
          setKeyword(value);
        }}
        fields={[
          {
            key: 'status',
            label: getEmployeeColumnText(i18n.locale, 'status'),
            options: statusFilterOptions.map((option) => ({
              label: option.label[i18n.locale === 'en' ? 1 : 0],
              value: option.value,
            })),
          },
        ]}
        values={{ status }}
        onFilterChange={(_, value) => {
          setStatus(value as EmployeeStatus | '');
        }}
        onReset={() => {
          setKeyword('');
          setStatus('');
        }}
        placeholder={tr('searchPlaceholder')}
      />

      <TableCustom
        columns={columns}
        data={visibleEmployees}
        keyword=""
        fixedLeft={['employeeNumber', 'firstName']}
        fixedRight={['actions']}
        showColumnFilters
        emptyTitle={tr('emptyTitle')}
        emptyDescription={tr('emptyDescription')}
      />
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-brand-border bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tracking-tight text-slate-900">{value}</div>
    </div>
  );
}
