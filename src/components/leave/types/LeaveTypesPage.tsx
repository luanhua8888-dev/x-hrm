import { useLingui } from '@lingui/react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FilterCustom } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface LeaveTypeRow {
  id: string;
  name: string;
  code: string;
  isPaid: boolean;
  accrual: string;
  status: 'active' | 'inactive';
}

const mockData: LeaveTypeRow[] = [
  {
    id: 'LT-01',
    name: 'Nghỉ phép năm',
    code: 'ANNUAL',
    isPaid: true,
    accrual: '1 ngày / tháng',
    status: 'active',
  },
  {
    id: 'LT-02',
    name: 'Nghỉ ốm',
    code: 'SICK',
    isPaid: true,
    accrual: 'Theo quy định BHXH',
    status: 'active',
  },
  {
    id: 'LT-03',
    name: 'Nghỉ không lương',
    code: 'UNPAID',
    isPaid: false,
    accrual: 'Không giới hạn',
    status: 'active',
  },
  {
    id: 'LT-04',
    name: 'Nghỉ thai sản',
    code: 'MATERNITY',
    isPaid: true,
    accrual: '6 tháng',
    status: 'active',
  },
  {
    id: 'LT-05',
    name: 'Nghỉ kết hôn',
    code: 'MARRIAGE',
    isPaid: true,
    accrual: '3 ngày',
    status: 'active',
  },
];

export default function LeaveTypesPage() {
  const { i18n } = useLingui();
  const [keyword, setKeyword] = useState('');

  const columns = useMemo<ColumnDef<LeaveTypeRow>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'Mã',
        size: 110,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-primary">{row.original.code}</span>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Loại phép',
        size: 250,
        cell: ({ row }) => <span className="font-medium text-slate-900">{row.original.name}</span>,
      },
      {
        accessorKey: 'isPaid',
        header: 'Hưởng lương',
        size: 120,
        cell: ({ row }) => (
          <span className={row.original.isPaid ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
            {row.original.isPaid ? 'Có' : 'Không'}
          </span>
        ),
      },
      {
        accessorKey: 'accrual',
        header: 'Định mức / Cộng dồn',
        size: 200,
        cell: ({ row }) => <span className="text-slate-500">{row.original.accrual}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        size: 120,
        cell: ({ row }) => {
          return row.original.status === 'active' ? (
            <Badge className="shadow-none font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
              Đang áp dụng
            </Badge>
          ) : (
            <Badge className="shadow-none font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
              Ngừng áp dụng
            </Badge>
          );
        },
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
      mockData.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.code.toLowerCase().includes(keyword.toLowerCase()),
      ),
    [keyword],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end border-b border-slate-100 pb-2">
        <Button size="sm" className="h-8 bg-primary text-xs hover:bg-primary-hover">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          {i18n.locale === 'en' ? 'Add Type' : 'Thêm loại phép'}
        </Button>
      </div>

      <FilterCustom
        keyword={keyword}
        onKeywordChange={setKeyword}
        onReset={() => setKeyword('')}
        placeholder={i18n.locale === 'en' ? 'Search leave types...' : 'Tìm kiếm loại phép...'}
      />

      <TableCustom
        columns={columns}
        data={data}
        keyword={keyword}
        fixedRight={['actions']}
        emptyTitle={i18n.locale === 'en' ? 'No leave types' : 'Không có dữ liệu'}
        emptyDescription={
          i18n.locale === 'en'
            ? 'Configure different types of leave.'
            : 'Định nghĩa các loại nghỉ phép được áp dụng trong công ty.'
        }
      />
    </div>
  );
}
