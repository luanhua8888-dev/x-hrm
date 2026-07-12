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
  Download,
  Filter,
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
    description: msg({ message: 'Hồ sơ nhân viên và phân bổ tổ chức.' }),
    domain: 'People',
    icon: Users,
  },
  {
    id: 'headcount',
    name: msg({ message: 'Nhân sự theo phòng ban' }),
    description: msg({ message: 'Số lượng nhân viên đang làm việc.' }),
    domain: 'People',
    icon: FileBarChart,
  },
  {
    id: 'leave-balance',
    name: msg({ message: 'Tổng hợp số dư phép' }),
    description: msg({ message: 'Số ngày phép đã dùng và còn lại.' }),
    domain: 'Leave',
    icon: CalendarDays,
  },
  {
    id: 'leave-history',
    name: msg({ message: 'Lịch sử yêu cầu phép' }),
    description: msg({ message: 'Trạng thái các yêu cầu nghỉ phép.' }),
    domain: 'Leave',
    icon: CalendarDays,
  },
  {
    id: 'daily-attendance',
    name: msg({ message: 'Chấm công hằng ngày' }),
    description: msg({ message: 'Giờ vào/ra và đi trễ.' }),
    domain: 'Time',
    icon: Clock3,
  },
  {
    id: 'monthly-timesheet',
    name: msg({ message: 'Bảng công tháng' }),
    description: msg({ message: 'Tổng hợp giờ làm và tăng ca.' }),
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
    <div className="space-y-4 animate-in fade-in duration-500 pb-8">
      <header className="flex flex-col gap-2 border-b border-slate-200 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            <Trans>Trung tâm Báo cáo</Trans>
          </h1>
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            <Trans>Trích xuất, phân tích và xuất dữ liệu nhân sự.</Trans>
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-slate-500"></span>
          </span>
          <Trans>{reportCatalog.length} báo cáo sẵn sàng</Trans>
        </div>
      </header>

      <div className="grid min-h-[500px] overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm lg:grid-cols-[20rem_minmax(0,1fr)]">
        <aside className="border-b border-slate-100 bg-slate-50/50 lg:border-r lg:border-b-0 flex flex-col">
          <div className="space-y-3 border-b border-slate-100 p-3">
            <div className="relative">
              <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder={i18n._(msg({ message: 'Tìm kiếm báo cáo...' }))}
                className="h-8 w-full rounded-md border border-slate-200 bg-white pr-3 pl-8 text-xs font-medium outline-none transition-all placeholder:text-slate-400 focus:border-slate-400 focus:ring-1 focus:ring-slate-200"
              />
            </div>
            <div className="flex flex-wrap gap-1">
              {domains.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setDomain(item)}
                  className={cn(
                    'rounded-md px-2 py-1 text-[10px] font-bold transition-all',
                    domain === item
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50',
                  )}
                >
                  {i18n._(domainMessages[item])}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {filteredReports.map((report) => {
              const Icon = report.icon;
              const isSelected = selectedReport.id === report.id;
              return (
                <button
                  key={report.id}
                  type="button"
                  onClick={() => setSelectedId(report.id)}
                  className={cn(
                    'group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-all',
                    isSelected ? 'bg-slate-900 shadow-sm' : 'hover:bg-slate-100',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded transition-colors',
                      isSelected
                        ? 'bg-slate-800 text-white'
                        : 'bg-white text-slate-500 border border-slate-200 group-hover:text-slate-900',
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block truncate text-xs font-bold',
                        isSelected ? 'text-white' : 'text-slate-900',
                      )}
                    >
                      {i18n._(report.name)}
                    </span>
                    <span
                      className={cn(
                        'mt-0.5 block truncate text-[10px] font-medium',
                        isSelected ? 'text-slate-400' : 'text-slate-500',
                      )}
                    >
                      {i18n._(report.description)}
                    </span>
                  </span>
                  <ChevronRight
                    className={cn(
                      'h-3.5 w-3.5 shrink-0 transition-transform',
                      isSelected
                        ? 'text-slate-400'
                        : 'text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5',
                    )}
                  />
                </button>
              );
            })}
            {filteredReports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Search className="mb-2 h-5 w-5 text-slate-300" />
                <p className="text-[11px] font-bold text-slate-500">
                  <Trans>Không tìm thấy báo cáo.</Trans>
                </p>
              </div>
            ) : null}
          </div>
        </aside>

        <section className="flex flex-col min-w-0 bg-white">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm">
                <selectedReport.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">{i18n._(selectedReport.name)}</h2>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  {i18n._(selectedReport.description)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-5">
            <div className="mx-auto w-full flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <h3 className="text-xs font-bold text-slate-900">
                  <Trans>Tham số báo cáo</Trans>
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <label className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <Trans>Từ ngày</Trans>
                  </span>
                  <input
                    type="date"
                    className="h-8 w-full rounded-md border border-slate-200 px-2.5 text-xs font-semibold text-slate-900 outline-none transition-all focus:border-slate-400 focus:ring-1 focus:ring-slate-200"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <Trans>Đến ngày</Trans>
                  </span>
                  <input
                    type="date"
                    className="h-8 w-full rounded-md border border-slate-200 px-2.5 text-xs font-semibold text-slate-900 outline-none transition-all focus:border-slate-400 focus:ring-1 focus:ring-slate-200"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <Trans>Phòng ban</Trans>
                  </span>
                  <select className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-900 outline-none transition-all focus:border-slate-400 focus:ring-1 focus:ring-slate-200">
                    <option>{i18n._(msg({ message: 'Tất cả' }))}</option>
                  </select>
                </label>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-3 -mx-5 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-700">Định dạng:</span>
                  <select className="h-7 rounded border border-slate-200 bg-white px-1.5 text-[11px] font-semibold text-slate-700 outline-none">
                    <option>Excel (.xlsx)</option>
                    <option>PDF (.pdf)</option>
                    <option>CSV (.csv)</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="flex h-8 items-center justify-center gap-1.5 rounded-md bg-slate-900 px-4 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-slate-800"
                >
                  <Download className="h-3.5 w-3.5" />
                  <Trans>Xuất Báo cáo</Trans>
                </button>
              </div>
            </div>

            <div className="mt-5 flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white border border-slate-100 shadow-sm">
                <FileSpreadsheet className="h-4 w-4 text-slate-400" />
              </div>
              <p className="mt-2 text-[11px] font-bold text-slate-900">
                <Trans>Chưa có dữ liệu xem trước</Trans>
              </p>
              <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                <Trans>Chọn tham số và Xuất báo cáo để tải về.</Trans>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
