import { useLingui } from '@lingui/react';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { FilterCustom } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { Badge } from '@/components/ui/badge';

interface EmployeeRecordRow {
  id: string;
  employeeName: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'ontime' | 'late' | 'early' | 'missing';
}

const mockData: EmployeeRecordRow[] = [
  {
    id: 'NV-001',
    employeeName: 'Nguyễn Minh Quân',
    department: 'Ban Giám hiệu',
    date: '12/07/2026',
    checkIn: '08:00',
    checkOut: '17:05',
    status: 'ontime',
  },
  {
    id: 'NV-002',
    employeeName: 'Trần Thu Hà',
    department: 'Phòng Nhân sự',
    date: '12/07/2026',
    checkIn: '08:15',
    checkOut: '--:--',
    status: 'late',
  },
  {
    id: 'NV-003',
    employeeName: 'Lê Hoàng Nam',
    department: 'Phòng Tài chính',
    date: '12/07/2026',
    checkIn: '07:55',
    checkOut: '17:00',
    status: 'ontime',
  },
  {
    id: 'NV-004',
    employeeName: 'Võ Thành Công',
    department: 'CNTT',
    date: '12/07/2026',
    checkIn: '--:--',
    checkOut: '--:--',
    status: 'missing',
  },
];

export default function EmployeeRecordsPage() {
  const { i18n } = useLingui();
  const [keyword, setKeyword] = useState('');

  const columns = useMemo<ColumnDef<EmployeeRecordRow>[]>(
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
        size: 180,
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-slate-900">{row.original.employeeName}</div>
            <div className="text-[10px] text-slate-500">{row.original.department}</div>
          </div>
        ),
      },
      { accessorKey: 'date', header: 'Ngày', size: 110 },
      {
        accessorKey: 'checkIn',
        header: 'Giờ vào',
        size: 90,
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.checkIn}</span>,
      },
      {
        accessorKey: 'checkOut',
        header: 'Giờ ra',
        size: 90,
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.checkOut}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        size: 120,
        cell: ({ row }) => {
          const statusMap = {
            ontime: { label: 'Đúng giờ', className: 'bg-emerald-50 text-emerald-700' },
            late: { label: 'Đi trễ', className: 'bg-amber-50 text-amber-700' },
            early: { label: 'Về sớm', className: 'bg-amber-50 text-amber-700' },
            missing: { label: 'Thiếu vân tay', className: 'bg-rose-50 text-rose-700' },
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
          item.employeeName.toLowerCase().includes(keyword.toLowerCase()) ||
          item.id.toLowerCase().includes(keyword.toLowerCase()),
      ),
    [keyword],
  );

  return (
    <div className="space-y-4">
      <FilterCustom
        keyword={keyword}
        onKeywordChange={setKeyword}
        onReset={() => setKeyword('')}
        placeholder={i18n.locale === 'en' ? 'Search employee...' : 'Tìm kiếm nhân viên...'}
      />

      <TableCustom
        columns={columns}
        data={data}
        keyword={keyword}
        fixedRight={['actions']}
        emptyTitle={i18n.locale === 'en' ? 'No records' : 'Không có dữ liệu chấm công'}
        emptyDescription={
          i18n.locale === 'en'
            ? 'No employee attendance records found.'
            : 'Không tìm thấy dữ liệu chấm công của nhân viên.'
        }
      />
    </div>
  );
}
