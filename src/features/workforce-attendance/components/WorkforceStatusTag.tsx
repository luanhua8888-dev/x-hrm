import { cn } from '@/utils/cn';
const tones: Record<string, string> = {
  PRESENT: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  ACTIVE: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  ONLINE: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  APPROVED: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  LATE: 'bg-amber-50 text-amber-700 ring-amber-200',
  PENDING: 'bg-amber-50 text-amber-700 ring-amber-200',
  PROCESSING: 'bg-blue-50 text-blue-700 ring-blue-200',
  OPEN: 'bg-blue-50 text-blue-700 ring-blue-200',
  MISSING_CHECK_OUT: 'bg-rose-50 text-rose-700 ring-rose-200',
  CRITICAL: 'bg-rose-50 text-rose-700 ring-rose-200',
  HIGH: 'bg-orange-50 text-orange-700 ring-orange-200',
  REJECTED: 'bg-rose-50 text-rose-700 ring-rose-200',
  OFFLINE: 'bg-slate-100 text-slate-600 ring-slate-200',
  LOCKED: 'bg-slate-800 text-white ring-slate-800',
};
export function WorkforceStatusTag({ value }: { value: string }) {
  return (
    <span
      className={cn(
        'inline-flex rounded px-2 py-1 text-[10px] font-semibold ring-1 ring-inset',
        tones[value] ?? 'bg-slate-100 text-slate-600 ring-slate-200',
      )}
    >
      {value.replaceAll('_', ' ')}
    </span>
  );
}
