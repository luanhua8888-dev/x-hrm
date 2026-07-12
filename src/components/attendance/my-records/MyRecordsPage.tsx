import { useLingui } from '@lingui/react';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { FilterCustom } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { Badge } from '@/components/ui/badge';

interface AttendanceRecordRow {
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  status: 'ontime' | 'late' | 'early' | 'missing';
}

const mockData: AttendanceRecordRow[] = [
  {
    date: '12/07/2026',
    checkIn: '08:00',
    checkOut: '17:05',
    totalHours: '8h 5m',
    status: 'ontime',
  },
  { date: '11/07/2026', checkIn: '08:15', checkOut: '17:00', totalHours: '7h 45m', status: 'late' },
  {
    date: '10/07/2026',
    checkIn: '07:55',
    checkOut: '16:30',
    totalHours: '7h 35m',
    status: 'early',
  },
  { date: '09/07/2026', checkIn: '08:02', checkOut: '--:--', totalHours: '--', status: 'missing' },
];

export default function MyRecordsPage() {
  const { i18n } = useLingui();
  const [keyword, setKeyword] = useState('');

  const columns = useMemo<ColumnDef<AttendanceRecordRow>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Ngày',
        size: 120,
        cell: ({ row }) => <span className="font-medium text-slate-900">{row.original.date}</span>,
      },
      {
        accessorKey: 'checkIn',
        header: 'Giờ vào',
        size: 100,
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.checkIn}</span>,
      },
      {
        accessorKey: 'checkOut',
        header: 'Giờ ra',
        size: 100,
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.checkOut}</span>,
      },
      {
        accessorKey: 'totalHours',
        header: 'Tổng thời gian',
        size: 120,
        cell: ({ row }) => (
          <span className="font-medium text-slate-700">{row.original.totalHours}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        size: 150,
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
    ],
    [],
  );

  const data = useMemo(
    () => mockData.filter((item) => item.date.includes(keyword) || item.status.includes(keyword)),
    [keyword],
  );

  return (
    <div className="space-y-4">
      <FilterCustom
        keyword={keyword}
        onKeywordChange={setKeyword}
        onReset={() => setKeyword('')}
        placeholder={i18n.locale === 'en' ? 'Search records...' : 'Tìm kiếm dữ liệu...'}
      />

      <TableCustom
        columns={columns}
        data={data}
        keyword={keyword}
        emptyTitle={i18n.locale === 'en' ? 'No records' : 'Không có dữ liệu chấm công'}
        emptyDescription={
          i18n.locale === 'en'
            ? 'You have no attendance records yet.'
            : 'Chưa có dữ liệu chấm công nào được ghi nhận.'
        }
      />
    </div>
  );
}
