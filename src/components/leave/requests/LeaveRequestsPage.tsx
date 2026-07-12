import { useLingui } from '@lingui/react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FilterCustom, type FilterField } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface LeaveRequestRow {
  id: string;
  employeeName: string;
  department: string;
  type: string;
  fromDate: string;
  toDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
}

const mockData: LeaveRequestRow[] = [
  {
    id: 'LV-2026-004',
    employeeName: 'Nguyễn Minh Quân',
    department: 'Ban Giám hiệu',
    type: 'Phép năm',
    fromDate: '2026-07-20',
    toDate: '2026-07-22',
    days: 3,
    status: 'pending',
  },
  {
    id: 'LV-2026-005',
    employeeName: 'Trần Thu Hà',
    department: 'Phòng Nhân sự',
    type: 'Phép ốm',
    fromDate: '2026-07-10',
    toDate: '2026-07-10',
    days: 1,
    status: 'approved',
  },
  {
    id: 'LV-2026-006',
    employeeName: 'Lê Hoàng Nam',
    department: 'Phòng Tài chính',
    type: 'Nghỉ không lương',
    fromDate: '2026-08-05',
    toDate: '2026-08-06',
    days: 2,
    status: 'pending',
  },
  {
    id: 'LV-2026-007',
    employeeName: 'Võ Thành Công',
    department: 'CNTT',
    type: 'Phép năm',
    fromDate: '2026-07-01',
    toDate: '2026-07-02',
    days: 2,
    status: 'rejected',
  },
];

export default function LeaveRequestsPage() {
  const { i18n } = useLingui();
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({ status: '' });

  const filterFields: FilterField[] = [
    {
      key: 'status',
      label: i18n.locale === 'en' ? 'Status' : 'Trạng thái',
      options: [
        { label: i18n.locale === 'en' ? 'All statuses' : 'Tất cả trạng thái', value: '' },
        { label: i18n.locale === 'en' ? 'Pending' : 'Chờ duyệt', value: 'pending' },
        { label: i18n.locale === 'en' ? 'Approved' : 'Đã duyệt', value: 'approved' },
        { label: i18n.locale === 'en' ? 'Rejected' : 'Từ chối', value: 'rejected' },
      ],
    },
  ];

  const columns = useMemo<ColumnDef<LeaveRequestRow>[]>(
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
        accessorKey: 'employeeName',
        header: 'Nhân viên',
        size: 180,
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-slate-900">{row.original.employeeName}</div>
            <div className="text-[10px] text-slate-500">{row.original.department}</div>
          </div>
        ),
      },
      { accessorKey: 'type', header: 'Loại phép', size: 140 },
      { accessorKey: 'fromDate', header: 'Từ ngày', size: 110 },
      { accessorKey: 'toDate', header: 'Đến ngày', size: 110 },
      { accessorKey: 'days', header: 'Số ngày', size: 90 },
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
      mockData.filter((item) => {
        if (filters.status && item.status !== filters.status) return false;
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
          setFilters({ status: '' });
        }}
        placeholder={i18n.locale === 'en' ? 'Search employee requests...' : 'Tìm kiếm yêu cầu...'}
      />

      <TableCustom
        columns={columns}
        data={data}
        keyword={keyword}
        fixedRight={['actions']}
        emptyTitle={i18n.locale === 'en' ? 'No pending requests' : 'Không tìm thấy yêu cầu nào'}
        emptyDescription={
          i18n.locale === 'en'
            ? 'You have caught up with all leave requests.'
            : 'Bạn đã xử lý hết tất cả yêu cầu nghỉ phép.'
        }
      />
    </div>
  );
}
