import { PaginationState, SortingState } from '@tanstack/react-table';
import { useLingui } from '@lingui/react';
import { Plus } from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { DataTable } from '@/components/data-display/DataTable';
import { ErrorState } from '@/components/feedback/ErrorState';
import { userTableColumns } from '@/features/users/components/UserTableColumns';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useUsers } from '@/queries/user.query';
import { GetAllUserParams } from '@/types/user/user';

function Trans({ children }: { children: ReactNode }) {
  const { i18n } = useLingui();
  const text = toText(children);
  return <>{i18n._({ id: text, message: text })}</>;
}

function toText(children: ReactNode) {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === 'string' || typeof child === 'number' ? String(child) : ''))
      .join('');
  }

  return '';
}

export default function UserListPage() {
  const [keyword, setKeyword] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const debouncedKeyword = useDebouncedValue(keyword);
  const params: GetAllUserParams = useMemo(
    () => ({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      keyword: debouncedKeyword || undefined,
      sortBy: sorting[0]?.id,
      sortDirection: sorting[0] ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
    }),
    [debouncedKeyword, pagination.pageIndex, pagination.pageSize, sorting],
  );
  const usersQuery = useUsers(params);
  const pageCount = usersQuery.data?.totalPages ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-brand-border pb-2">
        <div>
          <h1 className="text-base font-semibold text-brand-primary-text">
            <Trans>Dữ liệu người dùng</Trans>
          </h1>
          <p className="text-xs text-brand-secondary-text">
            <Trans>Quản lý tài khoản và quyền truy cập hệ thống.</Trans>
          </p>
        </div>
        <Link
          to="/users/new"
          className="inline-flex h-8 items-center justify-center gap-2 rounded-sm bg-primary px-3 text-xs font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Plus className="h-4 w-4" />
          <Trans>Thêm người dùng</Trans>
        </Link>
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
