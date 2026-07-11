import { useMemo, useState, type ReactNode } from 'react';
import { useLingui } from '@lingui/react';
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  FileBarChart,
  FileSpreadsheet,
  Search,
  Users,
} from 'lucide-react';

import { cn } from '@/utils/cn';

const msg = (descriptor: { id?: string; message: string }) => ({
  id: descriptor.id ?? descriptor.message,
  message: descriptor.message,
});

function Trans({ children }: { children: ReactNode }) {
  const { i18n } = useLingui();
  const text = toText(children);
  return <>{i18n._({ id: text, message: text })}</>;
}

function toText(children: ReactNode) {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === 'string' || typeof child === 'number' ? String(child) : ''))
      .join('');
  }

  return '';
}

const reportCatalog = [
  {
    id: 'employee-directory',
    name: msg({ message: 'Danh sách nhân viên' }),
    description: msg({ message: 'Hồ sơ nhân viên và thông tin phân bổ trong tổ chức.' }),
    domain: 'People',
    icon: Users,
  },
  {
    id: 'headcount',
    name: msg({ message: 'Nhân sự theo phòng ban' }),
    description: msg({ message: 'Số nhân viên đang làm việc theo phòng ban và địa điểm.' }),
    domain: 'People',
    icon: FileBarChart,
  },
  {
    id: 'leave-balance',
    name: msg({ message: 'Tổng hợp số dư phép' }),
    description: msg({ message: 'Quyền lợi, số ngày đã dùng và số dư còn lại theo nhân viên.' }),
    domain: 'Leave',
    icon: CalendarDays,
  },
  {
    id: 'leave-history',
    name: msg({ message: 'Lịch sử yêu cầu nghỉ phép' }),
    description: msg({ message: 'Các yêu cầu đã gửi, được duyệt hoặc bị từ chối.' }),
    domain: 'Leave',
    icon: CalendarDays,
  },
  {
    id: 'daily-attendance',
    name: msg({ message: 'Chấm công hằng ngày' }),
    description: msg({ message: 'Giờ vào, giờ ra, đi trễ và trạng thái chấm công.' }),
    domain: 'Time',
    icon: Clock3,
  },
  {
    id: 'monthly-timesheet',
    name: msg({ message: 'Bảng công tháng' }),
    description: msg({ message: 'Giờ làm việc, tăng ca và các mục bảng công đã duyệt.' }),
    domain: 'Time',
    icon: FileSpreadsheet,
  },
] as const;

const domains = ['All', 'People', 'Leave', 'Time'] as const;
const domainMessages = {
  All: msg({ message: 'Tất cả' }),
  People: msg({ message: 'Nhân sự' }),
  Leave: msg({ message: 'Nghỉ phép' }),
  Time: msg({ message: 'Thời gian' }),
} as const;

export default function ReportsPage() {
  const { i18n } = useLingui();
  const [keyword, setKeyword] = useState('');
  const [domain, setDomain] = useState<(typeof domains)[number]>('All');
  const [selectedId, setSelectedId] = useState<string>(reportCatalog[0].id);

  const filteredReports = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    return reportCatalog.filter(
      (report) =>
        (domain === 'All' || report.domain === domain) &&
        (!normalizedKeyword ||
          i18n._(report.name).toLowerCase().includes(normalizedKeyword) ||
          i18n._(report.description).toLowerCase().includes(normalizedKeyword)),
    );
  }, [domain, i18n, keyword]);

  const selectedReport =
    reportCatalog.find((report) => report.id === selectedId) ?? reportCatalog[0];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 border-b border-brand-border pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-brand-primary-text">
            <Trans>Báo cáo</Trans>
          </h1>
          <p className="mt-0.5 text-xs text-brand-secondary-text">
            <Trans>Chạy báo cáo vận hành và xuất dữ liệu nhân sự.</Trans>
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-brand-secondary-text">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <Trans>{reportCatalog.length} báo cáo tiêu chuẩn khả dụng</Trans>
        </div>
      </div>

      <div className="grid min-h-[calc(100vh-12rem)] overflow-hidden rounded-md border border-brand-border bg-white shadow-sm lg:grid-cols-[19rem_minmax(0,1fr)]">
        <aside className="border-b border-brand-border bg-slate-50/70 lg:border-r lg:border-b-0">
          <div className="space-y-2 border-b border-brand-border p-3">
            <div className="relative">
              <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder={i18n._(msg({ message: 'Tìm báo cáo...' }))}
                className="h-8 w-full rounded-md border border-brand-border bg-white pr-3 pl-8 text-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {domains.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setDomain(item)}
                  className={cn(
                    'rounded-md px-2 py-1 text-[11px] font-medium transition-colors',
                    domain === item
                      ? 'bg-primary text-white'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100',
                  )}
                >
                  {i18n._(domainMessages[item])}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[calc(100vh-18rem)] overflow-y-auto p-1.5">
            {filteredReports.map((report) => {
              const Icon = report.icon;
              const isSelected = selectedReport.id === report.id;
              return (
                <button
                  key={report.id}
                  type="button"
                  onClick={() => setSelectedId(report.id)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-md border px-2.5 py-2 text-left transition-colors',
                    isSelected
                      ? 'border-primary/20 bg-primary-light text-primary'
                      : 'border-transparent text-brand-primary-text hover:bg-white',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
                      isSelected ? 'bg-white' : 'bg-slate-100',
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold">
                      {i18n._(report.name)}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-brand-secondary-text">
                      {i18n._(domainMessages[report.domain])}
                    </span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
                </button>
              );
            })}
            {filteredReports.length === 0 ? (
              <p className="p-6 text-center text-xs text-brand-secondary-text">
                <Trans>Không tìm thấy báo cáo phù hợp.</Trans>
              </p>
            ) : null}
          </div>
        </aside>

        <section className="min-w-0">
          <div className="border-b border-brand-border px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                <selectedReport.icon className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-brand-primary-text">
                  {i18n._(selectedReport.name)}
                </h2>
                <p className="mt-1 text-xs text-brand-secondary-text">
                  {i18n._(selectedReport.description)}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="max-w-3xl rounded-md border border-brand-border">
              <div className="border-b border-brand-border bg-slate-50 px-3 py-2">
                <h3 className="text-xs font-semibold text-brand-primary-text">
                  <Trans>Tham số báo cáo</Trans>
                </h3>
              </div>
              <div className="grid gap-3 p-3 sm:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-brand-secondary-text">
                    <Trans>Từ ngày</Trans>
                  </span>
                  <input
                    type="date"
                    className="h-8 w-full rounded-sm border border-brand-border px-2 text-xs outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-brand-secondary-text">
                    <Trans>Đến ngày</Trans>
                  </span>
                  <input
                    type="date"
                    className="h-8 w-full rounded-sm border border-brand-border px-2 text-xs outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-brand-secondary-text">
                    <Trans>Phòng ban</Trans>
                  </span>
                  <select className="h-8 w-full rounded-sm border border-brand-border bg-white px-2 text-xs outline-none focus:border-primary">
                    <option>{i18n._(msg({ message: 'Tất cả phòng ban' }))}</option>
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-medium text-brand-secondary-text">
                    <Trans>Định dạng đầu ra</Trans>
                  </span>
                  <select className="h-8 w-full rounded-sm border border-brand-border bg-white px-2 text-xs outline-none focus:border-primary">
                    <option>{i18n._(msg({ message: 'Xem trước' }))}</option>
                    <option>{i18n._(msg({ message: 'Tệp Excel' }))}</option>
                    <option>{i18n._(msg({ message: 'Tài liệu PDF' }))}</option>
                  </select>
                </label>
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-brand-border bg-slate-50 px-3 py-2">
                <button
                  type="button"
                  className="h-8 rounded-sm border border-brand-border bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  <Trans>Đặt lại</Trans>
                </button>
                <button
                  type="button"
                  className="h-8 rounded-sm bg-primary px-4 text-xs font-semibold text-white hover:bg-primary-hover"
                >
                  <Trans>Chạy báo cáo</Trans>
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-dashed border-brand-border bg-slate-50/60 px-4 py-10 text-center">
              <FileBarChart className="mx-auto h-7 w-7 text-slate-300" />
              <p className="mt-2 text-xs font-medium text-slate-600">
                <Trans>Xem trước báo cáo</Trans>
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                <Trans>Chọn tham số và chạy báo cáo để xem kết quả.</Trans>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
