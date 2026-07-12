import { useLingui } from '@lingui/react';
import { type ColumnDef } from '@tanstack/react-table';
import { Calendar, CalendarCheck, CalendarX, Clock, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FilterCustom } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

import { mockLeaveRequests } from './LeaveListData';
import { LeaveListText } from './LeaveListText';

export default function LeaveListPage() {
  const { i18n } = useLingui();
  const t = LeaveListText[i18n.locale as 'vi' | 'en'] ?? LeaveListText.vi;

  const [keyword, setKeyword] = useState('');
  const [activeTab, setActiveTab] = useState<'requests' | 'history'>('requests');

  const columns = useMemo<ColumnDef<(typeof mockLeaveRequests)[0]>[]>(
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
        accessorKey: 'type',
        header: t.colType,
        cell: ({ row }) => <span className="text-slate-700">{row.original.type}</span>,
      },
      {
        accessorKey: 'date',
        header: t.colDuration,
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-slate-800">{row.original.date}</span>
            <span className="text-[10px] text-slate-400">{row.original.duration}</span>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: t.colStatus,
        cell: ({ row }) => {
          const status = row.original.status;
          if (status === 'pending') {
            return (
              <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                {t.statusPending}
              </span>
            );
          }
          if (status === 'approved') {
            return (
              <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-100">
                {t.statusApproved}
              </span>
            );
          }
          return (
            <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-400 line-through">
              {t.statusRejected}
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
            <Plus className="mr-1.5 h-3.5 w-3.5" /> {t.create}
          </Button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-4">
        {[
          { icon: Clock, label: t.pending, value: '12' },
          { icon: CalendarCheck, label: t.approvedWeek, value: '45' },
          { icon: CalendarX, label: t.rejected, value: '3' },
          { icon: Calendar, label: t.onLeave, value: '18' },
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
            onClick={() => setActiveTab('requests')}
            className={cn(
              'border-b-2 pb-2 text-xs font-bold transition-colors',
              activeTab === 'requests'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700',
            )}
          >
            {t.tabRequests}
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
              key: 'type',
              label: t.colType,
              options: [
                { label: 'Phép năm', value: 'annual' },
                { label: 'Nghỉ ốm', value: 'sick' },
              ],
            },
          ]}
        />

        <TableCustom
          columns={columns}
          data={mockLeaveRequests}
          keyword={keyword}
          pageCount={1}
          pagination={{ pageIndex: 0, pageSize: 10 }}
          onPaginationChange={() => {}}
        />
      </div>
    </div>
  );
}
