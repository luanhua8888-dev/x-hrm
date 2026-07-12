import { useLingui } from '@lingui/react';
import { type ReactNode, useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  MoreHorizontal,
  Download,
} from 'lucide-react';
import { cn } from '@/utils/cn';

function Trans({ children }: { children: ReactNode }) {
  const { i18n } = useLingui();
  const text = typeof children === 'string' ? children : '';
  return <>{text ? i18n._({ id: text, message: text }) : children}</>;
}

const attendanceRecords = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    department: 'Kỹ thuật',
    date: '15/07/2026',
    checkIn: '08:00',
    checkOut: '17:30',
    status: 'on-time',
    avatar: 'NA',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    department: 'Nhân sự',
    date: '15/07/2026',
    checkIn: '08:15',
    checkOut: '17:00',
    status: 'late',
    avatar: 'TB',
  },
  {
    id: '3',
    name: 'Lê Văn C',
    department: 'Thiết kế',
    date: '15/07/2026',
    checkIn: '--:--',
    checkOut: '--:--',
    status: 'absent',
    avatar: 'LC',
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    department: 'Kinh doanh',
    date: '15/07/2026',
    checkIn: '07:55',
    checkOut: '18:15',
    status: 'overtime',
    avatar: 'PD',
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    department: 'Kỹ thuật',
    date: '15/07/2026',
    checkIn: '08:05',
    checkOut: '17:05',
    status: 'late',
    avatar: 'HE',
  },
];

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <div className="space-y-4 animate-in fade-in duration-500 pb-8">
      <header className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            <Trans>Dữ liệu Chấm công</Trans>
          </h1>
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            <Trans>Theo dõi giờ vào/ra, đi trễ, về sớm và xuất bảng công.</Trans>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-slate-900 text-white text-[12px] font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Xuất dữ liệu
          </button>
        </div>
      </header>

      {/* Overview Cards */}
      <section className="grid gap-3 sm:grid-cols-4">
        <div className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
              <Trans>Đúng giờ</Trans>
            </p>
            <p className="text-xl font-black text-slate-900 leading-none tracking-tight">142</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
              <Trans>Đi trễ</Trans>
            </p>
            <p className="text-xl font-black text-slate-900 leading-none tracking-tight">18</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <XCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
              <Trans>Vắng mặt</Trans>
            </p>
            <p className="text-xl font-black text-slate-900 leading-none tracking-tight">5</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
              <Trans>Tăng ca</Trans>
            </p>
            <p className="text-xl font-black text-slate-900 leading-none tracking-tight">12</p>
          </div>
        </div>
      </section>

      {/* Main List Area */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50/50">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('daily')}
              className={cn(
                'text-xs font-bold transition-colors pb-3 -mb-3 border-b-2',
                activeTab === 'daily'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700',
              )}
            >
              <Trans>Chấm công hôm nay</Trans>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={cn(
                'text-xs font-bold transition-colors pb-3 -mb-3 border-b-2',
                activeTab === 'history'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700',
              )}
            >
              <Trans>Lịch sử theo tháng</Trans>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Ngày:
              </span>
              <input
                type="date"
                className="h-8 rounded-md border border-slate-200 px-2 text-xs font-medium outline-none focus:border-slate-400"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm nhân viên..."
                className="h-8 w-40 pl-8 pr-3 rounded-md border border-slate-200 text-xs font-medium outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200 transition-all"
              />
            </div>
            <button className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2.5 border-b border-slate-100">
                  <Trans>Nhân viên</Trans>
                </th>
                <th className="px-4 py-2.5 border-b border-slate-100">
                  <Trans>Phòng ban</Trans>
                </th>
                <th className="px-4 py-2.5 border-b border-slate-100">
                  <Trans>Giờ vào</Trans>
                </th>
                <th className="px-4 py-2.5 border-b border-slate-100">
                  <Trans>Giờ ra</Trans>
                </th>
                <th className="px-4 py-2.5 border-b border-slate-100">
                  <Trans>Trạng thái</Trans>
                </th>
                <th className="px-4 py-2.5 border-b border-slate-100 text-right">
                  <Trans>Thao tác</Trans>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {attendanceRecords.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-600 border border-slate-200">
                        {req.avatar}
                      </div>
                      <span className="text-slate-900 font-bold">{req.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">{req.department}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={cn(
                        'font-bold',
                        req.checkIn === '--:--' ? 'text-slate-300' : 'text-slate-700',
                      )}
                    >
                      {req.checkIn}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={cn(
                        'font-bold',
                        req.checkOut === '--:--' ? 'text-slate-300' : 'text-slate-700',
                      )}
                    >
                      {req.checkOut}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    {req.status === 'on-time' && (
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-100 border border-slate-700 font-bold text-[10px]">
                        <Trans>Đúng giờ</Trans>
                      </span>
                    )}
                    {req.status === 'late' && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[10px]">
                        <Trans>Đi trễ</Trans>
                      </span>
                    )}
                    {req.status === 'absent' && (
                      <span className="px-2 py-0.5 rounded bg-white text-slate-400 border border-slate-200 font-bold text-[10px] line-through">
                        <Trans>Vắng mặt</Trans>
                      </span>
                    )}
                    {req.status === 'overtime' && (
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 border border-slate-300 font-bold text-[10px]">
                        <Trans>Tăng ca</Trans>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button className="p-1 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
