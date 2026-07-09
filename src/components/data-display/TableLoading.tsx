export function TableLoading() {
  return (
    <div className="space-y-2 rounded-md border border-slate-200 bg-white p-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-10 animate-pulse rounded bg-slate-100" />
      ))}
    </div>
  );
}
