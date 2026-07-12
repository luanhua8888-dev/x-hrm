import { useLingui } from '@lingui/react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function AttendanceDashboardPage() {
  const { i18n } = useLingui();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const dateString = time.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-8 py-12">
      <div className="text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          {dateString}
        </h2>
        <div className="mt-4 text-6xl font-black tracking-tight text-slate-900 font-mono">
          {timeString}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 text-sm font-bold shadow-sm">
          <Clock className="mr-2 h-5 w-5" />
          {i18n.locale === 'en' ? 'Check In' : 'Vào ca'}
        </Button>
        <Button
          variant="secondary"
          className="h-14 px-8 text-sm font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 shadow-sm border border-rose-100"
        >
          {i18n.locale === 'en' ? 'Check Out' : 'Tan ca'}
        </Button>
      </div>

      <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
        <div className="flex flex-col items-center justify-center p-3 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Giờ vào ca
          </span>
          <span className="mt-1 font-mono text-lg font-semibold text-slate-900">08:00</span>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-slate-200 p-3 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Giờ tan ca
          </span>
          <span className="mt-1 font-mono text-lg font-semibold text-slate-400">--:--</span>
        </div>
      </div>
    </div>
  );
}
