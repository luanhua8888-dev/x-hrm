import { ArrowDown, ArrowUp } from 'lucide-react';
export function AttendanceTimeline() {
  const logs = [
    ['05:53', 'IN', 'FACE-ER-01'],
    ['12:01', 'OUT', 'RFID-CAN-02'],
    ['12:55', 'IN', 'RFID-CAN-02'],
    ['14:18', 'OUT', 'FACE-ER-01'],
  ];
  return (
    <div className="grid gap-2 sm:grid-cols-4">
      {logs.map(([time, type, source]) => (
        <div key={time} className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2">
            {type === 'IN' ? (
              <ArrowDown className="h-4 w-4 text-emerald-600" />
            ) : (
              <ArrowUp className="h-4 w-4 text-blue-600" />
            )}
            <b className="text-sm text-slate-900">{time}</b>
            <WorkforceStatusTag value={type} />
          </div>
          <p className="mt-2 text-[11px] text-slate-500">{source}</p>
        </div>
      ))}
    </div>
  );
}
import { WorkforceStatusTag } from './WorkforceStatusTag';
