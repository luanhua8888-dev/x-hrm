import { FilterLoading, TableLoading } from '@/components/common/TableLoading';

export function PageLoading() {
  return (
    <div className="space-y-3" role="status" aria-label="Loading page">
      <div
        className="flex h-9 items-center justify-between border-b border-brand-border pb-2"
        aria-hidden="true"
      >
        <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
        <div className="h-8 w-28 animate-pulse rounded-lg bg-slate-200" />
      </div>
      <FilterLoading />
      <TableLoading />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
