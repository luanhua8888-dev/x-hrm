export function FilterLoading() {
  return (
    <div
      className="flex h-12 items-center gap-2 rounded-xl border border-brand-border bg-white px-2"
      aria-hidden="true"
    >
      <div className="h-8 min-w-52 flex-1 animate-pulse rounded-lg bg-slate-100 sm:max-w-sm" />
      <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-100" />
      <div className="ml-auto hidden h-8 w-24 animate-pulse rounded-lg bg-slate-100 sm:block" />
    </div>
  );
}

export function TableLoading({ rows = 6 }: { rows?: number }) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-brand-border bg-white"
      aria-hidden="true"
    >
      <div className="grid h-9 grid-cols-[90px_minmax(180px,1fr)_180px_100px] items-center gap-4 bg-slate-50 px-4">
        {[48, 88, 72, 56].map((width, index) => (
          <div key={index} className="h-2.5 animate-pulse rounded bg-slate-200" style={{ width }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="grid h-12 grid-cols-[90px_minmax(180px,1fr)_180px_100px] items-center gap-4 border-t border-slate-100 px-4"
        >
          <div className="h-3 w-12 animate-pulse rounded bg-slate-100" />
          <div
            className="h-3 animate-pulse rounded bg-slate-100"
            style={{ width: `${58 + (index % 3) * 12}%` }}
          />
          <div className="h-3 w-28 animate-pulse rounded bg-slate-100" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}
