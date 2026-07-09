import { PaginationState, SortingState } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { DataTable } from '@/components/data-display/DataTable';
import { ErrorState } from '@/components/feedback/ErrorState';
import { Button } from '@/components/ui/button';
import { userTableColumns } from '@/features/users/components/UserTableColumns';
import { useUsers } from '@/queries/user.query';
import { GetAllUserParams } from '@/types/user/user';

export default function UserListPage() {
  const [keyword, setKeyword] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const params: GetAllUserParams = useMemo(
    () => ({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      keyword: keyword || undefined,
      sortBy: sorting[0]?.id,
      sortDirection: sorting[0] ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
    }),
    [keyword, pagination.pageIndex, pagination.pageSize, sorting],
  );
  const usersQuery = useUsers(params);
  const pageCount = usersQuery.data?.totalPages ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>
          <Plus className="h-4 w-4" />
          <Link to="/users/new">New user</Link>
        </Button>
      </div>

      {usersQuery.error ? <ErrorState error={usersQuery.error} /> : null}

      <DataTable
        columns={userTableColumns}
        data={usersQuery.data?.items ?? []}
        pageCount={pageCount}
        pagination={pagination}
        sorting={sorting}
        keyword={keyword}
        isLoading={usersQuery.isLoading}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        onKeywordChange={(value) => {
          setKeyword(value);
          setPagination((current) => ({ ...current, pageIndex: 0 }));
        }}
      />
    </div>
  );
}
