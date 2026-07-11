import {
  CalendarCheck,
  ClipboardCheck,
  UserCheck,
  Users,
  TrendingUp,
  Clock,
  Briefcase,
  Award,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import {
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from 'recharts';

const metricCards = [
  { label: 'Tổng nhân sự', value: '1,248', change: '+12%', icon: Users },
  { label: 'Đang làm việc', value: '1,180', change: '+5%', icon: UserCheck },
  { label: 'Đang nghỉ phép', value: '42', change: '-2%', icon: CalendarCheck },
  { label: 'Chờ duyệt phép', value: '18', change: '+8%', icon: ClipboardCheck },
];

const attendanceData = [
  { name: 'T2', value: 98 },
  { name: 'T3', value: 95 },
  { name: 'T4', value: 99 },
  { name: 'T5', value: 92 },
  { name: 'T6', value: 96 },
  { name: 'T7', value: 85 },
];

const recruitmentData = [
  { name: 'Lập trình viên', value: 45 },
  { name: 'Thiết kế', value: 25 },
  { name: 'Marketing', value: 20 },
  { name: 'Nhân sự', value: 10 },
];

// Unified, professional color palette
const COLORS = ['#0f172a', '#334155', '#475569', '#94a3b8'];

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Metric Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-100">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                  <TrendingUp className="h-3 w-3" />
                  {card.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{card.value}</p>
                <p className="text-sm font-medium text-slate-500 mt-1">{card.label}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Charts Section */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Main Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2 relative overflow-hidden">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Tỷ lệ đi làm tuần này</h2>
              <p className="text-xs text-slate-500 mt-1">
                Dữ liệu chấm công được cập nhật theo thời gian thực.
              </p>
            </div>
            <button className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md transition-colors">
              Xem chi tiết
            </button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={attendanceData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                  }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0f172a"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
          <div>
            <h2 className="text-base font-bold text-slate-900">Nhu cầu tuyển dụng</h2>
            <p className="text-xs text-slate-500 mt-1">Phân bổ vị trí đang mở theo phòng ban.</p>
          </div>
          <div className="flex-1 min-h-[240px] mt-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={recruitmentData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  stroke="none"
                >
                  {recruitmentData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-900">100</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                Vị trí mở
              </span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {recruitmentData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                <span className="text-slate-600 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">Thao tác nhanh</h2>
          <div className="grid gap-3">
            {[
              {
                title: 'Thêm nhân viên mới',
                desc: 'Tạo hồ sơ nhân viên vào hệ thống',
                icon: Users,
              },
              {
                title: 'Tạo đơn xin nghỉ phép',
                desc: 'Gửi yêu cầu nghỉ phép lên quản lý',
                icon: Calendar,
              },
              {
                title: 'Đăng tin tuyển dụng',
                desc: 'Mở yêu cầu tuyển dụng vị trí mới',
                icon: Briefcase,
              },
            ].map((action) => (
              <button
                key={action.title}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-slate-100 text-slate-600">
                    <action.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-xs text-slate-500">{action.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">Hoạt động gần đây</h2>
          <div className="space-y-4">
            {[
              {
                user: 'Nguyễn Văn A',
                action: 'vừa duyệt đơn nghỉ phép của',
                target: 'Trần Thị B',
                time: '10 phút trước',
                icon: ClipboardCheck,
              },
              {
                user: 'Phòng Nhân sự',
                action: 'vừa tạo đợt đánh giá hiệu suất',
                target: 'Quý 3/2026',
                time: '1 giờ trước',
                icon: Award,
              },
              {
                user: 'Hệ thống',
                action: 'đã hoàn tất tính lương',
                target: 'Tháng 6/2026',
                time: '2 giờ trước',
                icon: Clock,
              },
            ].map((log, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-0.5 relative flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200">
                    <log.icon className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  {i !== 2 && <div className="w-px h-full bg-slate-200 absolute top-8"></div>}
                </div>
                <div className="pb-4">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">{log.user}</span> {log.action}{' '}
                    <span className="font-medium text-slate-800">{log.target}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
