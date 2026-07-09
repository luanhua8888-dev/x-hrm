import { AlertTriangle } from 'lucide-react';

import { getUserFacingErrorMessage } from '@/api/api-error';

interface ErrorStateProps {
  title?: string;
  error: unknown;
}

export function ErrorState({ title = 'Unable to load data', error }: ErrorStateProps) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1">{getUserFacingErrorMessage(error)}</p>
        </div>
      </div>
    </div>
  );
}
