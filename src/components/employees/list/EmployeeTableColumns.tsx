import { type ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  employeeText,
  getEmployeeMetaText,
  getEmployeeStatusText,
} from '@/components/employees/list/EmployeeText';
import type { Employee } from '@/types/employee/employee';

type Translate = (key: keyof typeof employeeText.columns) => string;

type SelectOption = { labelKey: keyof typeof employeeText; value: string };

const filterOptionMap = {
  gender: [
    { labelKey: 'male', value: 'MALE' },
    { labelKey: 'female', value: 'FEMALE' },
    { labelKey: 'otherGender', value: 'OTHER' },
  ],
  maritalStatus: [
    { labelKey: 'single', value: 'SINGLE' },
    { labelKey: 'married', value: 'MARRIED' },
    { labelKey: 'divorced', value: 'DIVORCED' },
    { labelKey: 'widowed', value: 'WIDOWED' },
  ],
  workType: [
    { labelKey: 'fullTime', value: 'FULL_TIME' },
    { labelKey: 'partTime', value: 'PART_TIME' },
    { labelKey: 'contract', value: 'CONTRACT' },
    { labelKey: 'intern', value: 'INTERN' },
  ],
  employmentType: [
    { labelKey: 'permanent', value: 'PERMANENT' },
    { labelKey: 'fixedTerm', value: 'FIXED_TERM' },
    { labelKey: 'temporary', value: 'TEMPORARY' },
    { labelKey: 'intern', value: 'INTERN' },
  ],
} as const satisfies Record<string, readonly SelectOption[]>;

function formatDate(locale: string, value?: string) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function statusClass(status?: string) {
  if (status === 'ACTIVE') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (status === 'ON_LEAVE') return 'border-sky-200 bg-sky-50 text-sky-700';
  if (status === 'PROBATION') return 'border-amber-200 bg-amber-50 text-amber-700';
  return 'border-slate-200 bg-slate-50 text-slate-600';
}

function toneClass(value?: string) {
  if (!value) return 'border-slate-200 bg-slate-50 text-slate-600';
  return 'border-slate-200 bg-white text-slate-700';
}

function selectFilter(key: keyof typeof filterOptionMap, locale: string) {
  return {
    filterVariant: 'select' as const,
    filterOptions: filterOptionMap[key].map((item) => ({
      label: employeeText[item.labelKey][locale === 'en' ? 1 : 0],
      value: item.value,
    })),
  };
}

export function createEmployeeTableColumns(
  locale: string,
  onDeleteEmployee?: (id: string) => void,
): ColumnDef<Employee>[] {
  const t: Translate = (key) => employeeText.columns[key][locale === 'en' ? 1 : 0];
  const dash = employeeText.emptyValue[locale === 'en' ? 1 : 0];

  return [
    {
      accessorKey: 'employeeNumber',
      header: t('employeeNumber'),
      size: 120,
      meta: { align: 'center' },
      cell: ({ row }) => (
        <span className="font-mono text-[11px] font-semibold text-primary">
          {row.original.employeeNumber || dash}
        </span>
      ),
    },
    {
      accessorKey: 'firstName',
      header: t('firstName'),
      size: 120,
      cell: ({ row }) => row.original.firstName || dash,
    },
    {
      accessorKey: 'middleName',
      header: t('middleName'),
      size: 120,
      cell: ({ row }) => row.original.middleName || dash,
    },
    {
      accessorKey: 'lastName',
      header: t('lastName'),
      size: 120,
      cell: ({ row }) => row.original.lastName || dash,
    },
    {
      accessorKey: 'preferredName',
      header: t('preferredName'),
      size: 140,
      cell: ({ row }) => row.original.preferredName || dash,
    },
    {
      accessorKey: 'email',
      header: t('email'),
      size: 220,
      cell: ({ row }) => row.original.email || dash,
    },
    {
      accessorKey: 'phone',
      header: t('phone'),
      size: 140,
      cell: ({ row }) => row.original.phone || dash,
    },
    {
      accessorKey: 'gender',
      header: t('gender'),
      size: 110,
      meta: {
        align: 'center',
        ...selectFilter('gender', locale),
      },
      filterFn: (row, columnId, value) => !value || row.getValue(columnId) === value,
      cell: ({ row }) => {
        const value = row.original.gender;
        const label = getEmployeeMetaText(locale, value);
        return <Badge className={toneClass(value)}>{label}</Badge>;
      },
    },
    {
      accessorKey: 'dateOfBirth',
      header: t('dateOfBirth'),
      size: 130,
      meta: { align: 'center' },
      cell: ({ row }) => formatDate(locale, row.original.dateOfBirth),
    },
    {
      accessorKey: 'nationalId',
      header: t('nationalId'),
      size: 150,
      meta: { align: 'center' },
      cell: ({ row }) => row.original.nationalId || dash,
    },
    {
      accessorKey: 'workType',
      header: t('workType'),
      size: 130,
      meta: {
        align: 'center',
        ...selectFilter('workType', locale),
      },
      filterFn: (row, columnId, value) => !value || row.getValue(columnId) === value,
      cell: ({ row }) => {
        const value = row.original.workType;
        const label = getEmployeeMetaText(locale, value);
        return <Badge className={toneClass(value)}>{label}</Badge>;
      },
    },
    {
      accessorKey: 'employmentType',
      header: t('employmentType'),
      size: 150,
      meta: {
        align: 'center',
        ...selectFilter('employmentType', locale),
      },
      filterFn: (row, columnId, value) => !value || row.getValue(columnId) === value,
      cell: ({ row }) => {
        const value = row.original.employmentType;
        const label = getEmployeeMetaText(locale, value);
        return <Badge className={toneClass(value)}>{label}</Badge>;
      },
    },
    {
      accessorKey: 'contractEndDate',
      header: t('contractEndDate'),
      size: 140,
      meta: { align: 'center' },
      cell: ({ row }) => formatDate(locale, row.original.contractEndDate),
    },
    {
      accessorKey: 'maritalStatus',
      header: t('maritalStatus'),
      size: 140,
      meta: {
        align: 'center',
        ...selectFilter('maritalStatus', locale),
      },
      filterFn: (row, columnId, value) => !value || row.getValue(columnId) === value,
      cell: ({ row }) => {
        const value = row.original.maritalStatus;
        const label = getEmployeeMetaText(locale, value);
        return <Badge className={toneClass(value)}>{label}</Badge>;
      },
    },
    {
      accessorKey: 'address',
      header: t('address'),
      size: 220,
      cell: ({ row }) => row.original.address || dash,
    },
    {
      accessorKey: 'status',
      header: t('status'),
      size: 120,
      meta: {
        align: 'center',
        filterVariant: 'select',
        filterOptions: ['ACTIVE', 'PROBATION', 'ON_LEAVE', 'TERMINATED'].map((value) => ({
          label: getEmployeeStatusText(locale, value),
          value,
        })),
      },
      filterFn: (row, columnId, value) => !value || row.getValue(columnId) === value,
      cell: ({ row }) => {
        const status = row.original.status;
        const label = getEmployeeStatusText(locale, status);

        return <Badge className={statusClass(status)}>{label}</Badge>;
      },
    },
    {
      accessorKey: 'jobTitle',
      header: t('jobTitle'),
      size: 160,
      cell: ({ row }) => row.original.jobTitle || dash,
    },
    {
      accessorKey: 'department',
      header: t('department'),
      size: 160,
      cell: ({ row }) => row.original.department || dash,
    },
    {
      accessorKey: 'location',
      header: t('location'),
      size: 160,
      cell: ({ row }) => row.original.location || dash,
    },
    {
      accessorKey: 'supervisorName',
      header: t('supervisor'),
      size: 160,
      cell: ({ row }) => row.original.supervisorName || dash,
    },
    {
      accessorKey: 'joinedDate',
      header: t('joinedDate'),
      size: 130,
      meta: { align: 'center' },
      cell: ({ row }) => formatDate(locale, row.original.joinedDate),
    },
    {
      id: 'actions',
      header: employeeText.actions[locale === 'en' ? 1 : 0],
      size: 120,
      enableSorting: false,
      enableColumnFilter: false,
      meta: { align: 'center', pinned: 'right' },
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1.5">
          <Link
            to={`/employees/${row.original.id}`}
            title={employeeText.viewDetail[locale === 'en' ? 1 : 0]}
            aria-label={employeeText.viewDetail[locale === 'en' ? 1 : 0]}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="compact-icon"
            title={employeeText.delete[locale === 'en' ? 1 : 0]}
            aria-label={employeeText.delete[locale === 'en' ? 1 : 0]}
            onClick={() => onDeleteEmployee?.(row.original.id)}
            className="h-8 w-8 rounded-md border border-slate-200 text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
}
