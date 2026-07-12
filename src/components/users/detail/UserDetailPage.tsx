import { useParams } from 'react-router-dom';

import { ErrorState } from '@/components/feedback/ErrorState';
import { PageLoading } from '@/components/feedback/PageLoading';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/queries/user.query';

export default function UserDetailPage() {
  const { userId } = useParams();
  const userQuery = useUser(userId ?? '');

  if (userQuery.isLoading) {
    return <PageLoading />;
  }

  if (userQuery.error) {
    return <ErrorState error={userQuery.error} />;
  }

  if (!userQuery.data) {
    return <ErrorState error={new Error('User was not found.')} />;
  }

  return (
    <div className="max-w-3xl space-y-4">
      <div className="rounded-md border border-slate-200 bg-white p-4">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">Username</dt>
            <dd className="font-medium text-slate-900">{userQuery.data.username}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Status</dt>
            <dd>
              <Badge>{userQuery.data.status}</Badge>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Employee link</dt>
            <dd className="font-medium text-slate-900">
              {userQuery.data.employeeId ?? 'Not linked'}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Created</dt>
            <dd className="font-medium text-slate-900">
              {new Date(userQuery.data.createdAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
