import type { ReactNode } from 'react';
import { useLingui } from '@lingui/react';
import {
  AlertTriangle,
  Cake,
  Check,
  Clock3,
  FileWarning,
  RefreshCw,
  UsersRound,
  X,
} from 'lucide-react';

import { cn } from '@/utils/cn';

import { alerts, departments, type AttendanceStatus, type LeaveStatus } from './dashboard.mock';
import type { DashboardMock } from './useDashboardMock';

const PANEL = 'rounded-xl border border-slate-100 bg-white p-3 shadow-sm';

const attendanceStyles: Record<AttendanceStatus, string> = {
  working: 'bg-emerald-50 text-emerald-700',
  late: 'bg-amber-50 text-amber-700',
  absent: 'bg-rose-50 text-rose-700',
};

const attendanceLabels: Record<AttendanceStatus, string> = {
  working: 'Đang làm việc',
  late: 'Đi trễ',
  absent: 'Vắng mặt',
};

const leaveStyles: Record<LeaveStatus, string> = {
  pending: 'bg-amber-50 text-amber-700',
  approved: 'bg-emerald-50 text-emerald-700',
  rejected: 'bg-rose-50 text-rose-700',
};

const leaveLabels: Record<LeaveStatus, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Đã từ chối',
};

const alertIcons = {
  warning: AlertTriangle,
  danger: FileWarning,
  info: Cake,
} as const;

const alertStyles = {
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-rose-50 text-rose-700',
  info: 'bg-sky-50 text-sky-700',
} as const;

function T({ children }: { children: ReactNode }) {
  const { i18n } = useLingui();
  const text = typeof children === 'string' || typeof children === 'number' ? String(children) : '';
  return <>{text ? i18n._({ id: text, message: text }) : children}</>;
}

function Heading({ icon: Icon, children }: { icon: typeof UsersRound; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-slate-400" />
      <h2 className="text-sm font-bold text-slate-900">
        <T>{children}</T>
      </h2>
    </div>
  );
}

export function DashboardToolbar({ model }: { model: DashboardMock }) {
  const { i18n } = useLingui();
  const locale = i18n.locale === 'en' ? 'en-US' : 'vi-VN';

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-end sm:justify-between">
      <div className="grid flex-1 gap-2 sm:grid-cols-2">
        <label className="space-y-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <T>Khoảng thời gian</T>
          <select
            aria-label={i18n._({ id: 'Khoảng thời gian', message: 'Khoảng thời gian' })}
            value={model.period}
            onChange={(event) => model.selectPeriod(event.target.value as DashboardMock['period'])}
            className="block h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-semibold normal-case tracking-normal text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
          >
            <option value="week">{i18n._({ id: 'Tuần này', message: 'Tuần này' })}</option>
            <option value="month">{i18n._({ id: 'Tháng này', message: 'Tháng này' })}</option>
            <option value="quarter">{i18n._({ id: 'Quý này', message: 'Quý này' })}</option>
          </select>
        </label>
        <label className="space-y-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <T>Phòng ban</T>
          <select
            aria-label={i18n._({ id: 'Phòng ban', message: 'Phòng ban' })}
            value={model.department}
            onChange={(event) =>
              model.selectDepartment(event.target.value as DashboardMock['department'])
            }
            className="block h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-semibold normal-case tracking-normal text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {i18n._({
                  id: department === 'all' ? 'Tất cả phòng ban' : department,
                  message: department === 'all' ? 'Tất cả phòng ban' : department,
                })}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span className="text-[10px] text-slate-400">
          <T>Cập nhật lúc</T>{' '}
          {model.updatedAt.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
        </span>
        <button
          type="button"
          aria-label={i18n._({ id: 'Làm mới dữ liệu', message: 'Làm mới dữ liệu' })}
          onClick={model.refresh}
          disabled={model.isLoading}
          className="flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-3 text-xs font-bold text-white transition hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60"
        >
          <RefreshCw className={cn('h-3.5 w-3.5', model.isLoading && 'animate-spin')} />
          <T>Làm mới</T>
        </button>
      </div>
    </section>
  );
}

export function DashboardSkeleton() {
  return (
    <div data-testid="dashboard-skeleton" aria-busy="true" className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-20 animate-pulse rounded-xl bg-slate-200/70" />
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="h-56 animate-pulse rounded-xl bg-slate-200/70 lg:col-span-2" />
        <div className="h-56 animate-pulse rounded-xl bg-slate-200/70" />
      </div>
    </div>
  );
}

export function WorkforceCard({ model }: { model: DashboardMock }) {
  return (
    <section className={cn(PANEL, 'overflow-hidden lg:col-span-2')}>
      <div className="mb-3 flex items-center justify-between">
        <Heading icon={UsersRound}>Tình hình hôm nay</Heading>
        <span className="text-[10px] font-semibold text-slate-400">
          {model.filteredWorkforce.length} <T>nhân viên</T>
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-xs">
          <thead className="border-y border-slate-100 bg-slate-50/70 text-[9px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-3 py-2">
                <T>Nhân viên</T>
              </th>
              <th className="px-3 py-2">
                <T>Phòng ban</T>
              </th>
              <th className="px-3 py-2">
                <T>Giờ vào</T>
              </th>
              <th className="px-3 py-2">
                <T>Trạng thái</T>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {model.filteredWorkforce.map((employee) => (
              <tr key={employee.id} className="transition-colors hover:bg-slate-50/70">
                <td className="px-3 py-2.5 font-semibold text-slate-800">{employee.name}</td>
                <td className="px-3 py-2.5 text-slate-500">
                  <T>{employee.department}</T>
                </td>
                <td className="px-3 py-2.5 font-mono text-slate-600">{employee.checkIn}</td>
                <td className="px-3 py-2.5">
                  <span
                    className={cn(
                      'rounded-full px-2 py-1 text-[9px] font-bold',
                      attendanceStyles[employee.status],
                    )}
                  >
                    <T>{attendanceLabels[employee.status]}</T>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function LeaveRequestsCard({ model }: { model: DashboardMock }) {
  const { i18n } = useLingui();

  return (
    <section className={cn(PANEL, 'flex flex-col')}>
      <div className="mb-3 flex items-center justify-between">
        <Heading icon={Clock3}>Yêu cầu nghỉ phép</Heading>
        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
          {model.pendingCount}
        </span>
      </div>
      <div className="space-y-2">
        {model.requests.map((request) => (
          <div key={request.id} className="rounded-lg border border-slate-100 bg-slate-50/60 p-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[11px] font-bold text-slate-800">{request.employee}</p>
                <p className="mt-0.5 text-[9px] text-slate-500">
                  <T>{request.type}</T> · <T>{request.duration}</T> · {request.dates}
                </p>
              </div>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2 py-1 text-[9px] font-bold',
                  leaveStyles[request.status],
                )}
              >
                <T>{leaveLabels[request.status]}</T>
              </span>
            </div>
            {request.status === 'pending' ? (
              <div className="mt-2 flex gap-1.5">
                <button
                  aria-label={i18n._({
                    id: 'Duyệt đơn của {employee}',
                    message: 'Duyệt đơn của {employee}',
                    values: { employee: request.employee },
                  })}
                  onClick={() => model.updateRequest(request.id, 'approved')}
                  className="flex h-7 flex-1 items-center justify-center gap-1 rounded-md bg-emerald-600 text-[10px] font-bold text-white hover:bg-emerald-700"
                >
                  <Check className="h-3 w-3" />
                  <T>Duyệt</T>
                </button>
                <button
                  aria-label={i18n._({
                    id: 'Từ chối đơn của {employee}',
                    message: 'Từ chối đơn của {employee}',
                    values: { employee: request.employee },
                  })}
                  onClick={() => model.updateRequest(request.id, 'rejected')}
                  className="flex h-7 flex-1 items-center justify-center gap-1 rounded-md border border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-700"
                >
                  <X className="h-3 w-3" />
                  <T>Từ chối</T>
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export function AlertsCard() {
  return (
    <section className={cn(PANEL, 'flex flex-col')}>
      <div className="mb-3">
        <Heading icon={AlertTriangle}>Trung tâm cảnh báo</Heading>
      </div>
      <div className="space-y-2">
        {alerts.map((alert) => {
          const Icon = alertIcons[alert.tone];
          return (
            <button
              key={alert.id}
              type="button"
              className="flex w-full items-start gap-2.5 rounded-lg border border-slate-100 p-2.5 text-left transition-colors hover:bg-slate-50"
            >
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
                  alertStyles[alert.tone],
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-bold text-slate-800">
                  <T>{alert.title}</T>
                </span>
                <span className="mt-0.5 block text-[9px] text-slate-500">
                  <T>{alert.detail}</T>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
