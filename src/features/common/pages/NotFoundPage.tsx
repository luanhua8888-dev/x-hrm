import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-slate-200 bg-white p-8 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-500">The requested HRM page does not exist.</p>
      <Link
        to="/dashboard"
        className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800"
      >
        Go to dashboard
      </Link>
    </div>
  );
}
