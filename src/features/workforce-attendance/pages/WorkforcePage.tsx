import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { type ColumnDef } from '@tanstack/react-table';
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Plus,
  RefreshCw,
  Users,
} from 'lucide-react';
import { TableCustom } from '@/components/common/TableCustom';
import { FilterCustom } from '@/components/common/FilterCustom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { workforceDemo, type DemoRow } from '../data/workforce-demo';
import { WorkforceStatusTag } from '../components/WorkforceStatusTag';
import { AttendanceTimeline } from '../components/AttendanceTimeline';

type Screen = {
  title: string;
  description: string;
  data: DemoRow[];
  create?: string;
  readonly?: boolean;
};
const screens: Record<string, Screen> = {
  '/workforce-attendance/shifts': {
    title: 'Mẫu ca làm việc',
    description: 'Cấu hình ca ngày, ca đêm, ca qua ngày và ca linh hoạt.',
    data: workforceDemo.shifts,
    create: '/workforce-attendance/shifts/create',
  },
  '/workforce-attendance/daily': {
    title: 'Chấm công hằng ngày',
    description: 'Đối chiếu lịch phân ca với thời gian làm việc thực tế.',
    data: workforceDemo.daily,
  },
  '/workforce-attendance/logs': {
    title: 'Log chấm công gốc',
    description: 'Dữ liệu bất biến từ thiết bị, ứng dụng và tích hợp API.',
    data: workforceDemo.logs,
    readonly: true,
  },
  '/workforce-attendance/exceptions': {
    title: 'Ngoại lệ chấm công',
    description: 'Phân loại, ưu tiên và xử lý sai lệch chấm công.',
    data: workforceDemo.exceptions,
  },
  '/workforce-attendance/adjustments': {
    title: 'Yêu cầu điều chỉnh',
    description: 'Luồng điều chỉnh không ghi đè dữ liệu chấm công gốc.',
    data: workforceDemo.requests,
    create: '/workforce-attendance/adjustments/create',
  },
  '/workforce-attendance/overtime': {
    title: 'Yêu cầu làm thêm giờ',
    description: 'Quản lý OT theo ngày thường, cuối tuần, ngày lễ và ban đêm.',
    data: workforceDemo.overtime,
    create: '/workforce-attendance/overtime/create',
  },
  '/workforce-attendance/duty': {
    title: 'Trực và on-call',
    description: 'Phân công trực tại viện, on-call và theo dõi call-back.',
    data: workforceDemo.duty,
    create: '/workforce-attendance/duty/create',
  },
  '/workforce-attendance/shift-swaps': {
    title: 'Yêu cầu đổi ca',
    description: 'Kiểm tra năng lực, xung đột và phê duyệt đổi ca.',
    data: workforceDemo.swaps,
    create: '/workforce-attendance/shift-swaps/create',
  },
  '/workforce-attendance/timesheets': {
    title: 'Bảng công tháng',
    description: 'Thời gian đã được công nhận sau xử lý ngoại lệ và phê duyệt.',
    data: workforceDemo.timesheets,
  },
  '/workforce-attendance/policies': {
    title: 'Chính sách chấm công',
    description: 'Phiên bản chính sách theo nhóm nhân viên và thời gian hiệu lực.',
    data: workforceDemo.policies,
    create: '/workforce-attendance/policies/create',
  },
  '/workforce-attendance/devices': {
    title: 'Thiết bị chấm công',
    description: 'Kết nối đa nguồn theo cơ sở và vị trí.',
    data: workforceDemo.devices,
  },
  '/workforce-attendance/allowance-rules': {
    title: 'Quy tắc phụ cấp',
    description: 'Điều kiện đầu vào cho payroll, không cấu hình tiền trực tiếp trên UI.',
    data: workforceDemo.allowances,
    create: '/workforce-attendance/allowance-rules/create',
  },
};
const labels: Record<string, string> = {
  code: 'Mã',
  name: 'Tên',
  type: 'Loại',
  start: 'Bắt đầu',
  end: 'Kết thúc',
  break: 'Nghỉ',
  hours: 'Giờ chuẩn',
  night: 'Ca đêm',
  overnight: 'Qua ngày',
  policy: 'Chính sách',
  status: 'Trạng thái',
  employee: 'Nhân viên',
  department: 'Khoa/phòng',
  shift: 'Ca',
  checkIn: 'Check-in',
  checkOut: 'Check-out',
  worked: 'Giờ làm',
  late: 'Đi muộn',
  early: 'Về sớm',
  overtime: 'OT',
  timestamp: 'Thời điểm',
  direction: 'Hướng',
  source: 'Nguồn',
  device: 'Thiết bị',
  location: 'Vị trí',
  ip: 'IP',
  coordinates: 'Tọa độ',
  createdAt: 'Tạo lúc',
  date: 'Ngày',
  severity: 'Mức độ',
  assignedTo: 'Phụ trách',
  original: 'Ban đầu',
  requested: 'Đề nghị',
  reason: 'Lý do',
  approver: 'Người duyệt',
};
const isStatus = (key: string) =>
  ['status', 'severity', 'connection', 'direction', 'type'].includes(key);

function Dashboard() {
  return (
    <div className="space-y-4">
      <Header
        title="Tổng quan lực lượng hôm nay"
        description="Tình hình nhân sự, ngoại lệ và phê duyệt theo thời gian vận hành."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Nhân sự theo lịch', '286', Users],
          ['Có mặt', '241', CheckCircle2],
          ['Ca đêm hiện tại', '38', Clock3],
          ['Ngoại lệ cần xử lý', '12', AlertTriangle],
        ].map(([l, v, I]) => (
          <div key={String(l)} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex justify-between">
              <span className="text-xs text-slate-500">{String(l)}</span>
              <I className="h-4 w-4 text-slate-400" />
            </div>
            <p className="mt-3 text-2xl font-semibold tabular-nums text-slate-900">{String(v)}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold">Xu hướng 7 ngày</h2>
          <div className="mt-6 flex h-48 items-end gap-3">
            {[72, 84, 79, 91, 87, 76, 89].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </section>
        <section>
          <TableCustom
            columns={columnsFor(workforceDemo.exceptions)}
            data={workforceDemo.exceptions}
          />
        </section>
      </div>
    </div>
  );
}
function Header({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
      {actions}
    </header>
  );
}
function columnsFor(data: DemoRow[]): ColumnDef<DemoRow>[] {
  if (!data[0]) return [];
  return Object.keys(data[0])
    .filter((k) => k !== 'id')
    .map((key) => ({
      accessorKey: key,
      header: labels[key] ?? key,
      cell: ({ row }) =>
        isStatus(key) ? (
          <WorkforceStatusTag value={String(row.original[key])} />
        ) : (
          <span
            className={key === 'employee' || key === 'name' ? 'font-semibold text-slate-900' : ''}
          >
            {String(row.original[key])}
          </span>
        ),
    }));
}
function Schedule() {
  const days = Array.from({ length: 14 }, (_, i) => i + 1);
  return (
    <div className="space-y-4">
      <Header
        title="Lịch làm việc tháng 07/2026"
        description="Kéo thả, phân ca hàng loạt và phát hiện xung đột trước khi công bố."
        actions={
          <Button>
            <CalendarDays className="h-4 w-4" />
            Công bố lịch
          </Button>
        }
      />
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-[1100px] w-full text-xs">
          <thead>
            <tr className="bg-slate-50">
              <th className="sticky left-0 bg-slate-50 p-3 text-left">Nhân viên</th>
              {days.map((d) => (
                <th key={d} className="p-3">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workforceDemo.employees.map((e, ri) => (
              <tr key={e.id} className="border-t border-slate-100">
                <td className="sticky left-0 bg-white p-3 font-semibold">
                  {e.name}
                  <small className="block font-normal text-slate-400">{e.department}</small>
                </td>
                {days.map((d) => (
                  <td key={d} className="p-1 text-center">
                    <span className="block rounded bg-blue-50 px-1 py-2 font-semibold text-blue-700">
                      {(d + ri) % 5 === 0 ? 'OFF' : (d + ri) % 3 === 0 ? 'N22' : 'M06'}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function FormScreen() {
  return (
    <div className="space-y-4">
      <Header
        title="Thông tin nghiệp vụ"
        description="Các thay đổi được lưu phiên bản và ghi nhận audit trail."
      />
      <form className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 md:grid-cols-2">
        {[
          'Mã / Nhân viên',
          'Tên / Loại yêu cầu',
          'Ngày bắt đầu',
          'Ngày kết thúc',
          'Chính sách áp dụng',
          'Người phê duyệt',
        ].map((x) => (
          <label key={x} className="space-y-1.5 text-xs font-semibold text-slate-600">
            {x}
            <Input className="h-10" />
          </label>
        ))}
        <label className="space-y-1.5 text-xs font-semibold text-slate-600 md:col-span-2">
          Ghi chú
          <textarea className="mt-1 min-h-24 w-full rounded-lg border border-slate-200 p-3 font-normal" />
        </label>
        <div className="flex gap-2 md:col-span-2">
          <Button type="button">Lưu và gửi phê duyệt</Button>
          <Button type="button" variant="secondary">
            Lưu nháp
          </Button>
        </div>
      </form>
    </div>
  );
}
export default function WorkforcePage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  if (pathname.endsWith('/dashboard')) return <Dashboard />;
  if (pathname === '/workforce-attendance/schedules' || pathname.includes('/schedules/employee/'))
    return <Schedule />;
  if (/\/(create|edit)$/.test(pathname) || pathname.includes('/edit')) return <FormScreen />;
  if (
    /^\/workforce-attendance\/(daily|exceptions|adjustments|devices)\/.+/.test(pathname) ||
    pathname.includes('/timesheets/')
  )
    return (
      <div className="space-y-4">
        <Header
          title="Chi tiết hồ sơ"
          description="Đối chiếu lịch, log gốc, kết quả tính và lịch sử phê duyệt."
        />
        <AttendanceTimeline />
        <TableCustom columns={columnsFor(workforceDemo.daily)} data={workforceDemo.daily} />
      </div>
    );
  if (pathname === '/workforce-attendance/closing')
    return (
      <div className="space-y-4">
        <Header
          title="Chốt công tháng 07/2026"
          description="Chỉ khóa kỳ công khi không còn ngoại lệ nghiêm trọng hoặc yêu cầu chờ duyệt."
          actions={
            <Button>
              <CheckCircle2 className="h-4 w-4" />
              Chạy kiểm tra
            </Button>
          }
        />
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Còn 2 ngoại lệ nghiêm trọng và 4 điều chỉnh đang chờ duyệt. Chưa thể khóa kỳ công.
        </div>
        <TableCustom
          columns={columnsFor(workforceDemo.timesheets)}
          data={workforceDemo.timesheets}
        />
      </div>
    );
  const screen = screens[pathname] ?? screens['/workforce-attendance/daily'];
  const cols = columnsFor(screen.data);
  return (
    <div className="space-y-3">
      <Header
        title={screen.title}
        description={screen.description}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary">
              <Download className="h-4 w-4" />
              Xuất
            </Button>
            {screen.create ? (
              <Button onClick={() => void navigate(screen.create!)}>
                <Plus className="h-4 w-4" />
                Tạo mới
              </Button>
            ) : (
              <Button variant="secondary">
                <RefreshCw className="h-4 w-4" />
                Làm mới
              </Button>
            )}
          </div>
        }
      />
      {screen.readonly ? (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700">
          Log gốc chỉ đọc. Mọi sửa đổi phải qua yêu cầu điều chỉnh.
        </div>
      ) : null}
      <FilterCustom
        keyword={keyword}
        onKeywordChange={setKeyword}
        placeholder="Tìm nhân viên, mã hoặc khoa phòng..."
      />
      <TableCustom
        columns={cols}
        data={screen.data}
        keyword={keyword}
        fixedLeft={['employee', 'name']}
      />
    </div>
  );
}
