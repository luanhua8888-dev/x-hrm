import type { ReactNode } from 'react';
import { useLingui } from '@lingui/react';
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  FileText,
  Gift,
  MoreHorizontal,
  UserPlus,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/utils/cn';

import {
  AlertsCard,
  DashboardSkeleton,
  DashboardToolbar,
  LeaveRequestsCard,
  WorkforceCard,
} from './DashboardFeatures';
import { useDashboardMock } from './useDashboardMock';

type Navigate = (path: string) => void;
type IconItem = { icon: LucideIcon };

const PANEL = 'rounded-xl border border-slate-100 bg-white p-3 shadow-sm';
const COLORS = ['#0f172a', '#334155', '#64748b', '#cbd5e1'] as const;

const METRICS = [
  { label: 'Tổng nhân sự', value: '1,248', change: '+12%', isUp: true, icon: Users },
  { label: 'Nhân sự mới', value: '42', change: '+5%', isUp: true, icon: UserPlus },
  { label: 'Vắng mặt', value: '18', change: '-2%', isUp: false, icon: CalendarCheck },
  { label: 'Cần duyệt', value: '15', change: '+8%', isUp: true, icon: ClipboardCheck },
] satisfies readonly (IconItem & {
  label: string;
  value: string;
  change: string;
  isUp: boolean;
})[];

const ATTENDANCE = [
  { name: 'T2', value: 98 },
  { name: 'T3', value: 95 },
  { name: 'T4', value: 99 },
  { name: 'T5', value: 92 },
  { name: 'T6', value: 96 },
  { name: 'T7', value: 85 },
] as const;

const RECRUITMENT = [
  { name: 'Lập trình viên', value: 45 },
  { name: 'Thiết kế', value: 25 },
  { name: 'Marketing', value: 20 },
  { name: 'Nhân sự', value: 10 },
] as const;

const TASKS = [
  {
    title: 'Duyệt đơn nghỉ phép',
    applicant: 'Phạm Thị D',
    time: '2h trước',
    icon: CalendarCheck,
    route: '/leave/requests',
  },
  {
    title: 'Đánh giá thử việc',
    applicant: 'Hoàng Văn E',
    time: '4h trước',
    icon: FileText,
    route: '/performance/reviews',
  },
  {
    title: 'Duyệt yêu cầu thiết bị',
    applicant: 'Vũ Thị F',
    time: '1n trước',
    icon: CheckCircle2,
    route: '/administration/settings',
  },
] satisfies readonly (IconItem & {
  title: string;
  applicant: string;
  time: string;
  route: string;
})[];

const ACTIONS = [
  { title: 'Thêm nhân viên', icon: UserPlus, route: '/employees/new' },
  { title: 'Tạo đơn phép', icon: Calendar, route: '/leave/my-leave' },
  { title: 'Đăng tuyển dụng', icon: Briefcase, route: '/recruitment/vacancies' },
  { title: 'Tạo báo cáo', icon: FileText, route: '/reports' },
] satisfies readonly (IconItem & { title: string; route: string })[];

const BIRTHDAYS = [
  { name: 'Nguyễn Văn A', date: '15/07', role: 'Frontend Dev', avatar: 'NA' },
  { name: 'Trần Thị B', date: '18/07', role: 'HR Manager', avatar: 'TB' },
  { name: 'Lê Văn C', date: '21/07', role: 'UI/UX Designer', avatar: 'LC' },
] as const;

const ACTIVITIES = [
  { actor: 'Nguyễn Văn A', action: 'duyệt phép', time: '10p trước', icon: CheckCircle2 },
  { actor: 'Hệ thống', action: 'tính lương', time: '2h trước', icon: Clock },
  { actor: 'Phòng NS', action: 'tạo đánh giá', time: '3h trước', icon: Award },
] satisfies readonly (IconItem & { actor: string; action: string; time: string })[];

function T({ children }: { children: ReactNode }) {
  const { i18n } = useLingui();
  const text = typeof children === 'string' || typeof children === 'number' ? String(children) : '';
  return <>{text ? i18n._({ id: text, message: text }) : children}</>;
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-sm font-bold text-slate-900">
      <T>{children}</T>
    </h2>
  );
}

function MetricGrid({ pendingCount }: { pendingCount: number }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {METRICS.map(({ label, value, change, isUp, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-700">
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-0.5 truncate text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <T>{label}</T>
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-xl font-black leading-none tracking-tight text-slate-900">
                {label === 'Cần duyệt' ? pendingCount : value}
              </p>
              <span
                className={cn(
                  'rounded px-1.5 py-0.5 text-[10px] font-bold',
                  isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600',
                )}
              >
                {change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function AttendanceCard({ go }: { go: Navigate }) {
  return (
    <div className={cn(PANEL, 'flex flex-col xl:col-span-3')}>
      <div className="mb-3 flex items-center justify-between">
        <Title>Tỷ lệ đi làm tuần này</Title>
        <button
          onClick={() => go('/attendance')}
          className="flex items-center gap-1 text-[11px] font-bold text-slate-500 transition-colors hover:text-slate-900"
        >
          <T>Chi tiết</T>
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
      <div className="min-h-[120px] w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ATTENDANCE} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f172a" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                fontSize: 11,
                padding: '8px 12px',
                fontWeight: 500,
              }}
              itemStyle={{ color: '#0f172a', fontWeight: 700 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0f172a"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{ r: 4, fill: '#0f172a', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PendingTasks({ go }: { go: Navigate }) {
  return (
    <div className={cn(PANEL, 'flex flex-col')}>
      <div className="mb-3 flex items-center justify-between">
        <Title>Cần xử lý</Title>
        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
          {TASKS.length}
        </span>
      </div>
      <div className="flex-1 space-y-1.5 overflow-y-auto">
        {TASKS.map(({ title, applicant, time, icon: Icon, route }) => (
          <button
            key={route}
            onClick={() => go(route)}
            className="-mx-2 flex w-[calc(100%+1rem)] items-center gap-2.5 rounded-lg p-2 text-left transition-colors hover:bg-slate-50"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-700">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] font-bold text-slate-800">
                <T>{title}</T>
              </span>
              <span className="mt-0.5 flex items-center justify-between">
                <span className="truncate text-[10px] font-medium text-slate-500">{applicant}</span>
                <span className="shrink-0 text-[9px] font-medium text-slate-400">
                  <T>{time}</T>
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
      <button
        onClick={() => go('/leave/requests')}
        className="mt-3 w-full rounded-lg border border-slate-200 py-1.5 text-[11px] font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
      >
        <T>Xem tất cả</T>
      </button>
    </div>
  );
}

function QuickActions({ go }: { go: Navigate }) {
  return (
    <div className={PANEL}>
      <div className="mb-2">
        <Title>Thao tác nhanh</Title>
      </div>
      <div className="space-y-0.5">
        {ACTIONS.map(({ title, icon: Icon, route }) => (
          <button
            key={route}
            onClick={() => go(route)}
            className="group flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-slate-50"
          >
            <span className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-transparent bg-slate-100 text-slate-600 transition-all group-hover:border-slate-200 group-hover:bg-white group-hover:shadow-sm">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-[12px] font-semibold text-slate-700 group-hover:text-slate-900">
                <T>{title}</T>
              </span>
            </span>
            <ChevronRight className="h-3 w-3 text-slate-400 transition-colors group-hover:text-slate-900" />
          </button>
        ))}
      </div>
    </div>
  );
}

function RecruitmentCard({ go }: { go: Navigate }) {
  const { i18n } = useLingui();
  const data = RECRUITMENT.map((item) => ({
    ...item,
    name: i18n._({ id: item.name, message: item.name }),
  }));

  return (
    <div
      className={cn(PANEL, 'flex cursor-pointer flex-col transition-shadow hover:shadow-md')}
      onClick={() => go('/recruitment')}
    >
      <div className="mb-2 flex items-center justify-between">
        <Title>Tuyển dụng</Title>
        <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
      </div>
      <div className="relative min-h-[88px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((item, index) => (
                <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 6,
                border: '1px solid #e2e8f0',
                fontSize: 10,
                padding: '4px 8px',
                fontWeight: 600,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black leading-none text-slate-900">100</span>
          <span className="mt-0.5 text-[8px] font-bold uppercase tracking-widest text-slate-400">
            <T>Vị trí</T>
          </span>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="truncate text-[10px] font-semibold text-slate-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BirthdaysCard({ go }: { go: Navigate }) {
  return (
    <div
      className={cn(PANEL, 'flex cursor-pointer flex-col transition-shadow hover:shadow-md')}
      onClick={() => go('/employees')}
    >
      <div className="mb-3 flex items-center justify-between">
        <Title>Sự kiện sắp tới</Title>
        <Gift className="h-4 w-4 text-slate-400" />
      </div>
      <div className="space-y-2">
        {BIRTHDAYS.map((person) => (
          <div key={person.name} className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-slate-200 bg-slate-50 text-[9px] font-bold text-slate-700">
              {person.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[11px] font-bold text-slate-800">{person.name}</h3>
              <p className="truncate text-[9px] font-medium text-slate-500">
                <T>{person.role}</T>
              </p>
            </div>
            <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
              {person.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityCard({ go }: { go: Navigate }) {
  return (
    <div
      className={cn(PANEL, 'flex cursor-pointer flex-col transition-shadow hover:shadow-md')}
      onClick={() => go('/administration/audit-logs')}
    >
      <div className="mb-3 flex items-center justify-between">
        <Title>Hoạt động</Title>
        <MoreHorizontal className="h-4 w-4 text-slate-400" />
      </div>
      <div className="flex-1 space-y-2">
        {ACTIVITIES.map(({ actor, action, time, icon: Icon }) => (
          <div key={[actor, time].join('-')} className="flex items-start gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-700">
              <Icon className="h-3 w-3" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] text-slate-600">
                <strong className="font-bold text-slate-900">{actor}</strong> <T>{action}</T>
              </p>
              <p className="text-[9px] text-slate-400">
                <T>{time}</T>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardView({ go }: { go: Navigate }) {
  const dashboard = useDashboardMock();

  return (
    <div className="space-y-3 pb-4 animate-in fade-in duration-500">
      <DashboardToolbar model={dashboard} />
      {dashboard.isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <MetricGrid pendingCount={dashboard.pendingCount} />
          <section className="grid gap-3 xl:grid-cols-4">
            <AttendanceCard go={go} />
            <PendingTasks go={go} />
          </section>
          <section className="grid gap-3 lg:grid-cols-4">
            <WorkforceCard model={dashboard} />
            <LeaveRequestsCard model={dashboard} />
            <AlertsCard />
          </section>
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <QuickActions go={go} />
            <RecruitmentCard go={go} />
            <BirthdaysCard go={go} />
            <ActivityCard go={go} />
          </section>
        </>
      )}
    </div>
  );
}
