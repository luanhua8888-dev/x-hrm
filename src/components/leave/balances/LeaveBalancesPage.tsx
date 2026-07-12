import { useLingui } from '@lingui/react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FilterCustom, type FilterField } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { Button } from '@/components/ui/button';

interface LeaveBalanceRow {
  id: string;
  employeeName: string;
  department: string;
  type: string;
  entitled: number;
  used: number;
  scheduled: number;
  balance: number;
}

const mockData: LeaveBalanceRow[] = [
  {
    id: 'NV-001',
    employeeName: 'Nguyễn Minh Quân',
    department: 'Ban Giám hiệu',
    type: 'Phép năm',
    entitled: 12,
    used: 4,
    scheduled: 2,
    balance: 6,
  },
  {
    id: 'NV-002',
    employeeName: 'Trần Thu Hà',
    department: 'Phòng Nhân sự',
    type: 'Phép năm',
    entitled: 15,
    used: 10,
    scheduled: 0,
    balance: 5,
  },
  {
    id: 'NV-003',
    employeeName: 'Lê Hoàng Nam',
    department: 'Phòng Tài chính',
    type: 'Phép năm',
    entitled: 12,
    used: 0,
    scheduled: 0,
    balance: 12,
  },
  {
    id: 'NV-004',
    employeeName: 'Võ Thành Công',
    department: 'CNTT',
    type: 'Phép năm',
    entitled: 14,
    used: 14,
    scheduled: 0,
    balance: 0,
  },
];

export default function LeaveBalancesPage() {
  const { i18n } = useLingui();
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({ type: '' });

  const filterFields: FilterField[] = [
    {
      key: 'type',
      label: i18n.locale === 'en' ? 'Leave Type' : 'Loại phép',
      options: [
        { label: i18n.locale === 'en' ? 'All types' : 'Tất cả loại', value: '' },
        { label: i18n.locale === 'en' ? 'Annual Leave' : 'Phép năm', value: 'annual' },
        { label: i18n.locale === 'en' ? 'Sick Leave' : 'Phép ốm', value: 'sick' },
      ],
    },
  ];

  const columns = useMemo<ColumnDef<LeaveBalanceRow>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Mã NV',
        size: 90,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-primary">{row.original.id}</span>
        ),
      },
      {
        accessorKey: 'employeeName',
        header: 'Nhân viên',
        size: 200,
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-slate-900">{row.original.employeeName}</div>
            <div className="text-[10px] text-slate-500">{row.original.department}</div>
          </div>
        ),
      },
      { accessorKey: 'type', header: 'Loại phép', size: 140 },
      {
        accessorKey: 'entitled',
        header: 'Tổng ngày',
        size: 110,
        cell: ({ row }) => (
          <span className="font-medium text-slate-700">{row.original.entitled}</span>
        ),
      },
      {
        accessorKey: 'used',
        header: 'Đã nghỉ',
        size: 100,
        cell: ({ row }) => <span className="text-slate-500">{row.original.used}</span>,
      },
      {
        accessorKey: 'scheduled',
        header: 'Đã lên lịch',
        size: 110,
        cell: ({ row }) => (
          <span className="text-amber-600 font-medium">
            {row.original.scheduled > 0 ? row.original.scheduled : '-'}
          </span>
        ),
      },
      {
        accessorKey: 'balance',
        header: 'Còn lại',
        size: 100,
        cell: ({ row }) => (
          <span
            className={`font-bold ${row.original.balance > 0 ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            {row.original.balance}
          </span>
        ),
      },
      {
        id: 'actions',
        header: '',
        size: 50,
        enableSorting: false,
        cell: () => (
          <Button variant="ghost" size="compact-icon">
            <MoreHorizontal className="h-4 w-4 text-slate-400" />
          </Button>
        ),
      },
    ],
    [],
  );

  const data = useMemo(
    () =>
      mockData.filter((item) => {
        if (filters.type && filters.type === 'annual' && item.type !== 'Phép năm') return false;
        if (
          keyword &&
          !item.employeeName.toLowerCase().includes(keyword.toLowerCase()) &&
          !item.id.toLowerCase().includes(keyword.toLowerCase())
        )
          return false;
        return true;
      }),
    [keyword, filters],
  );

  return (
    <div className="space-y-4">
      <FilterCustom
        keyword={keyword}
        onKeywordChange={setKeyword}
        fields={filterFields}
        values={filters}
        onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
        onReset={() => {
          setKeyword('');
          setFilters({ type: '' });
        }}
        placeholder={i18n.locale === 'en' ? 'Search employee...' : 'Tìm kiếm nhân viên...'}
      />

      <TableCustom
        columns={columns}
        data={data}
        keyword={keyword}
        fixedRight={['actions']}
        emptyTitle={i18n.locale === 'en' ? 'No balance records' : 'Không tìm thấy dữ liệu'}
        emptyDescription={
          i18n.locale === 'en'
            ? 'Cannot find any matching records.'
            : 'Vui lòng thay đổi từ khóa tìm kiếm.'
        }
      />
    </div>
  );
}
