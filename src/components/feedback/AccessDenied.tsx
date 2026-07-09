import { ShieldAlert } from 'lucide-react';

export function AccessDenied() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-slate-200 bg-white p-8 text-center">
      <ShieldAlert className="mb-3 h-10 w-10 text-amber-500" aria-hidden="true" />
      <h1 className="text-lg font-semibold text-slate-900">Access denied</h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Your account does not have permission to access this area.
      </p>
    </div>
  );
}
