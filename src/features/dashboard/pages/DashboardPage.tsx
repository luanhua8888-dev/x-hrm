import { Activity, CalendarCheck, ClipboardCheck, UserCheck, Users } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Badge } from '@/components/ui/badge';

const metricCards = [
  { label: 'Total employees', value: '—', icon: Users },
  { label: 'Active employees', value: '—', icon: UserCheck },
  { label: 'Employees on leave', value: '—', icon: CalendarCheck },
  { label: 'Pending leave approvals', value: '—', icon: ClipboardCheck },
];

const attendanceData = [
  { name: 'Present', value: 0 },
  { name: 'Late', value: 0 },
  { name: 'Absent', value: 0 },
];

const recruitmentData = [
  { name: 'Open vacancies', value: 0 },
  { name: 'Interviews', value: 0 },
  { name: 'Offers', value: 0 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-md border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{card.label}</p>
                <Icon className="h-5 w-5 text-slate-400" />
              </div>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
              <p className="mt-1 text-xs text-slate-500">Waiting for API contract</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-md border border-slate-200 bg-white p-4 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Attendance summary</h2>
              <p className="text-sm text-slate-500">Designed for daily attendance API data.</p>
            </div>
            <Activity className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#334155" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h2 className="font-semibold text-slate-900">Recruitment overview</h2>
          <p className="text-sm text-slate-500">Vacancy and hiring pipeline readiness.</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={recruitmentData} dataKey="value" outerRadius={80} label>
                  {recruitmentData.map((entry, index) => (
                    <Cell key={entry.name} fill={['#0f172a', '#64748b', '#94a3b8'][index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="rounded-md border border-slate-200 bg-white p-4">
        <h2 className="font-semibold text-slate-900">Quick actions</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {['Add employee', 'Request leave', 'Create vacancy'].map((action) => (
            <div
              key={action}
              className="rounded-md border border-slate-200 p-3 text-sm text-slate-700"
            >
              {action}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
