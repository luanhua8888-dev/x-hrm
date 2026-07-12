import { useLingui } from '@lingui/react';
import { type ColumnDef } from '@tanstack/react-table';
import { AlertCircle, CheckCircle2, Clock, Download, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FilterCustom } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

import { mockAttendanceRecords } from './AttendanceListData';
import { AttendanceListText } from './AttendanceListText';

export default function AttendanceListPage() {
  const { i18n } = useLingui();
  const t = AttendanceListText[i18n.locale as 'vi' | 'en'] ?? AttendanceListText.vi;

  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState<'daily' | 'history'>('daily');

  const columns = useMemo<ColumnDef<(typeof mockAttendanceRecords)[0]>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t.colEmployee,
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-100 text-[9px] font-bold text-slate-600">
              {row.original.avatar}
            </div>
            <span className="font-bold text-slate-900">{row.original.name}</span>
          </div>
        ),
      },
      {
        accessorKey: 'department',
        header: t.colDepartment,
        cell: ({ row }) => <span className="text-slate-600">{row.original.department}</span>,
      },
      {
        accessorKey: 'checkIn',
        header: t.colCheckIn,
        cell: ({ row }) => (
          <span
            className={cn(
              'font-bold',
              row.original.checkIn === '--:--' ? 'text-slate-300' : 'text-slate-700',
            )}
          >
            {row.original.checkIn}
          </span>
        ),
      },
      {
        accessorKey: 'checkOut',
        header: t.colCheckOut,
        cell: ({ row }) => (
          <span
            className={cn(
              'font-bold',
              row.original.checkOut === '--:--' ? 'text-slate-300' : 'text-slate-700',
            )}
          >
            {row.original.checkOut}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: t.colStatus,
        cell: ({ row }) => {
          const status = row.original.status;
          if (status === 'on-time') {
            return (
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-100">
                {t.onTime}
              </span>
            );
          }
          if (status === 'late') {
            return (
              <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                {t.late}
              </span>
            );
          }
          if (status === 'absent') {
            return (
              <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-400 line-through">
                {t.absent}
              </span>
            );
          }
          return (
            <span className="rounded border border-slate-300 bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-800">
              {t.overtime}
            </span>
          );
        },
      },
    ],
    [t],
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-500 pb-8">
      <header className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">{t.title}</h1>
          <p className="mt-0.5 text-xs font-medium text-slate-500">{t.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="h-8 rounded-lg px-3 text-xs">
            <Download className="mr-1.5 h-3.5 w-3.5" /> {t.export}
          </Button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-4">
        {[
          { icon: CheckCircle2, label: t.onTime, value: '142' },
          { icon: AlertCircle, label: t.late, value: '18' },
          { icon: XCircle, label: t.absent, value: '5' },
          { icon: Clock, label: t.overtime, value: '12' },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <stat.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
              <p className="text-xl font-black leading-none tracking-tight text-slate-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </section>

      <div className="space-y-3">
        <div className="flex gap-4 border-b border-slate-100 px-1">
          <button
            onClick={() => setActiveTab('daily')}
            className={cn(
              'border-b-2 pb-2 text-xs font-bold transition-colors',
              activeTab === 'daily'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700',
            )}
          >
            {t.tabDaily}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              'border-b-2 pb-2 text-xs font-bold transition-colors',
              activeTab === 'history'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700',
            )}
          >
            {t.tabHistory}
          </button>
        </div>

        <FilterCustom
          keyword={keyword}
          onKeywordChange={setKeyword}
          fields={[
            {
              key: 'department',
              label: t.colDepartment,
              options: [
                { label: 'Kỹ thuật', value: 'engineering' },
                { label: 'Nhân sự', value: 'hr' },
              ],
            },
          ]}
        />

        <TableCustom
          columns={columns}
          data={mockAttendanceRecords}
          keyword={keyword}
          pageCount={1}
          pagination={{ pageIndex: 0, pageSize: 10 }}
          onPaginationChange={() => {}}
        />
      </div>
    </div>
  );
}
