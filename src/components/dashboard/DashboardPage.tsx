import {
  CalendarCheck,
  ClipboardCheck,
  Users,
  Clock,
  Briefcase,
  Award,
  ChevronRight,
  Calendar,
  UserPlus,
  Gift,
  CheckCircle2,
  FileText,
  MoreHorizontal,
  ArrowUpRight,
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
import { useNavigate } from 'react-router-dom';

const metricCards = [
  { label: 'Tổng nhân sự', value: '1,248', change: '+12%', isUp: true, icon: Users },
  { label: 'Nhân sự mới', value: '42', change: '+5%', isUp: true, icon: UserPlus },
  { label: 'Vắng mặt', value: '18', change: '-2%', isUp: false, icon: CalendarCheck },
  { label: 'Cần duyệt', value: '15', change: '+8%', isUp: true, icon: ClipboardCheck },
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

const upcomingBirthdays = [
  { name: 'Nguyễn Văn A', date: '15/07', role: 'Frontend Dev', avatar: 'NA' },
  { name: 'Trần Thị B', date: '18/07', role: 'HR Manager', avatar: 'TB' },
  { name: 'Lê Văn C', date: '21/07', role: 'UI/UX Designer', avatar: 'LC' },
];

const pendingTasks = [
  {
    title: 'Duyệt đơn nghỉ phép',
    applicant: 'Phạm Thị D',
    time: '2h trước',
    type: 'leave',
    icon: CalendarCheck,
    route: '/leave/requests',
  },
  {
    title: 'Đánh giá thử việc',
    applicant: 'Hoàng Văn E',
    time: '4h trước',
    type: 'review',
    icon: FileText,
    route: '/performance/reviews',
  },
  {
    title: 'Duyệt yêu cầu thiết bị',
    applicant: 'Vũ Thị F',
    time: '1n trước',
    type: 'asset',
    icon: CheckCircle2,
    route: '/administration/settings',
  },
];

const quickActions = [
  { title: 'Thêm nhân viên', icon: UserPlus, route: '/employees/new' },
  { title: 'Tạo đơn phép', icon: Calendar, route: '/leave/my-leave' },
  { title: 'Đăng tuyển dụng', icon: Briefcase, route: '/recruitment/vacancies' },
  { title: 'Tạo báo cáo', icon: FileText, route: '/reports' },
];

// Refined minimal palette
const COLORS = ['#0f172a', '#334155', '#64748b', '#cbd5e1'];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 animate-in fade-in duration-500 pb-8">
      {/* Metric Cards - Horizontal Compact Layout */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-700 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate mb-0.5">
                  {card.label}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-black text-slate-900 leading-none tracking-tight">
                    {card.value}
                  </p>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${card.isUp ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600 bg-slate-100'}`}
                  >
                    {card.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Content Grid */}
      <section className="grid gap-4 xl:grid-cols-4">
        {/* Main Chart */}
        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm xl:col-span-3 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">Tỷ lệ đi làm tuần này</h2>
            <button
              onClick={() => void navigate('/attendance')}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Chi tiết <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 min-h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
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
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                    fontSize: '11px',
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

        {/* Pending Tasks */}
        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm xl:col-span-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900">Cần xử lý</h2>
            <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              3
            </span>
          </div>
          <div className="flex-1 space-y-1.5 overflow-y-auto">
            {pendingTasks.map((task, i) => {
              const TaskIcon = task.icon;
              return (
                <div
                  key={i}
                  onClick={() => void navigate(task.route)}
                  className="flex items-center gap-2.5 p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-700 shrink-0">
                    <TaskIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[11px] font-bold text-slate-800 truncate">{task.title}</h3>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[10px] font-medium text-slate-500 truncate">
                        {task.applicant}
                      </span>
                      <span className="text-[9px] font-medium text-slate-400 shrink-0">
                        {task.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => void navigate('/leave/requests')}
            className="w-full mt-3 text-[11px] font-bold text-slate-600 hover:text-slate-900 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Xem tất cả
          </button>
        </div>
      </section>

      {/* Bottom Row */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Quick Actions List */}
        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3">Thao tác nhanh</h2>
          <div className="space-y-1">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={() => void navigate(action.route)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 flex items-center justify-center rounded bg-slate-100 text-slate-600 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-slate-200 transition-all shrink-0">
                    <action.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[12px] font-semibold text-slate-700 group-hover:text-slate-900">
                    {action.title}
                  </span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Donut Chart */}
        <div
          className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-col cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => void navigate('/recruitment')}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-900">Tuyển dụng</h2>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex-1 min-h-[120px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={recruitmentData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  paddingAngle={2}
                  stroke="none"
                >
                  {recruitmentData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    fontSize: '10px',
                    padding: '4px 8px',
                    fontWeight: 600,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-slate-900 leading-none">100</span>
              <span className="text-[8px] uppercase font-bold text-slate-400 tracking-widest mt-0.5">
                Vị trí
              </span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
            {recruitmentData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                <span className="text-[10px] font-semibold text-slate-600 truncate">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div
          className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-col cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => void navigate('/employees')}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900">Sự kiện sắp tới</h2>
            <Gift className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-2.5">
            {upcomingBirthdays.map((person, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-[9px] font-bold text-slate-700 border border-slate-200 shrink-0">
                  {person.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[11px] font-bold text-slate-800 truncate">{person.name}</h3>
                  <p className="text-[9px] font-medium text-slate-500 truncate">{person.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {person.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Summary */}
        <div
          className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-col cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => void navigate('/administration/audit-logs')}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900">Hoạt động</h2>
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-3 flex-1">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-700 shrink-0">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-slate-600 truncate">
                  <span className="font-bold text-slate-900">Nguyễn Văn A</span> duyệt phép
                </p>
                <p className="text-[9px] text-slate-400">10p trước</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-700 shrink-0">
                <Clock className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-slate-600 truncate">
                  <span className="font-bold text-slate-900">Hệ thống</span> tính lương
                </p>
                <p className="text-[9px] text-slate-400">2h trước</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-700 shrink-0">
                <Award className="w-3 h-3" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-slate-600 truncate">
                  <span className="font-bold text-slate-900">Phòng NS</span> tạo đánh giá
                </p>
                <p className="text-[9px] text-slate-400">3h trước</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
