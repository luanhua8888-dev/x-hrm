import { useLingui } from '@lingui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LeaveCalendarPage() {
  const { i18n } = useLingui();

  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-slate-900">
            {i18n.locale === 'en' ? 'July 2026' : 'Tháng 7 2026'}
          </h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="compact-icon" className="h-7 w-7 text-slate-500">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="compact-icon" className="h-7 w-7 text-slate-500">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="h-8 text-xs">
            {i18n.locale === 'en' ? 'Today' : 'Hôm nay'}
          </Button>
        </div>
      </div>

      <div className="flex-1 rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/50">
          {days.map((d) => (
            <div
              key={d}
              className="py-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500 border-r border-slate-200 last:border-0"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 flex-1 bg-slate-100/50 gap-[1px]">
          {dates.map((date) => {
            const isToday = date === 12;
            return (
              <div
                key={date}
                className={`bg-white p-1.5 min-h-[80px] flex flex-col gap-1 transition-colors hover:bg-slate-50`}
              >
                <span
                  className={`text-[11px] font-medium w-5 h-5 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-white' : 'text-slate-600'}`}
                >
                  {date}
                </span>

                {/* Mock Event 1 */}
                {date === 10 && (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-semibold px-1.5 py-0.5 rounded truncate">
                    Trần Thu Hà (Ốm)
                  </div>
                )}
                {/* Mock Event 2 */}
                {date >= 20 && date <= 22 && (
                  <div className="bg-blue-50 border border-blue-100 text-blue-700 text-[9px] font-semibold px-1.5 py-0.5 rounded truncate">
                    N.M Quân (Phép năm)
                  </div>
                )}
              </div>
            );
          })}
          {/* Fill empty grid spots for mock layout */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-slate-50 p-1.5 min-h-[80px]"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
