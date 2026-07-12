import { useLingui } from '@lingui/react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FilterCustom } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MyLeaveRow {
  id: string;
  type: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockData: MyLeaveRow[] = [
  {
    id: 'LV-2026-001',
    type: 'Phép năm',
    fromDate: '2026-07-15',
    toDate: '2026-07-16',
    days: 2,
    reason: 'Việc gia đình',
    status: 'approved',
  },
  {
    id: 'LV-2026-002',
    type: 'Phép ốm',
    fromDate: '2026-08-01',
    toDate: '2026-08-01',
    days: 1,
    reason: 'Khám sức khỏe',
    status: 'pending',
  },
  {
    id: 'LV-2026-003',
    type: 'Phép năm',
    fromDate: '2026-09-02',
    toDate: '2026-09-03',
    days: 2,
    reason: 'Nghỉ lễ',
    status: 'rejected',
  },
];

export default function MyLeavePage() {
  const { i18n } = useLingui();
  const [keyword, setKeyword] = useState('');

  const columns = useMemo<ColumnDef<MyLeaveRow>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Mã',
        size: 110,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-primary">{row.original.id}</span>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Loại phép',
        size: 140,
        cell: ({ row }) => <span className="font-medium text-slate-900">{row.original.type}</span>,
      },
      { accessorKey: 'fromDate', header: 'Từ ngày', size: 120 },
      { accessorKey: 'toDate', header: 'Đến ngày', size: 120 },
      { accessorKey: 'days', header: 'Số ngày', size: 90 },
      {
        accessorKey: 'reason',
        header: 'Lý do',
        size: 200,
        cell: ({ row }) => <span className="truncate text-slate-500">{row.original.reason}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        size: 120,
        cell: ({ row }) => {
          const statusMap = {
            pending: { label: 'Chờ duyệt', className: 'bg-amber-50 text-amber-700' },
            approved: { label: 'Đã duyệt', className: 'bg-emerald-50 text-emerald-700' },
            rejected: { label: 'Từ chối', className: 'bg-red-50 text-red-700' },
          };
          const st = statusMap[row.original.status];
          return (
            <Badge className={`shadow-none font-medium px-2 py-0.5 rounded-md ${st.className}`}>
              {st.label}
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
          item.id.toLowerCase().includes(keyword.toLowerCase()) ||
          item.reason.toLowerCase().includes(keyword.toLowerCase()),
      ),
    [keyword],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end border-b border-slate-100 pb-2">
        <Button size="sm" className="h-8 bg-primary text-xs hover:bg-primary-hover">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          {i18n.locale === 'en' ? 'Request Leave' : 'Tạo đơn phép'}
        </Button>
      </div>

      <FilterCustom
        keyword={keyword}
        onKeywordChange={setKeyword}
        onReset={() => setKeyword('')}
        placeholder={i18n.locale === 'en' ? 'Search leave records...' : 'Tìm kiếm đơn phép...'}
      />

      <TableCustom
        columns={columns}
        data={data}
        keyword={keyword}
        fixedRight={['actions']}
        emptyTitle={i18n.locale === 'en' ? 'No leave requests' : 'Chưa có đơn phép nào'}
        emptyDescription={
          i18n.locale === 'en'
            ? 'You have not submitted any leave requests yet.'
            : 'Bạn chưa tạo đơn xin nghỉ phép nào.'
        }
      />
    </div>
  );
}
