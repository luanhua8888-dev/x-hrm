import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useLingui } from '@lingui/react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const msg = (descriptor: { id?: string; message: string }) => ({
  id: descriptor.id ?? descriptor.message,
  message: descriptor.message,
});

function Trans({ children }: { children: import('react').ReactNode }) {
  const { i18n } = useLingui();
  const text = toText(children);
  return <>{i18n._({ id: text, message: text })}</>;
}

function toText(children: import('react').ReactNode) {
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

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageCount: number;
  pagination: PaginationState;
  sorting: SortingState;
  keyword: string;
  isLoading?: boolean;
  onPaginationChange: (pagination: PaginationState) => void;
  onSortingChange: (sorting: SortingState) => void;
  onKeywordChange: (keyword: string) => void;
}

export function DataTable<TData>({
  columns,
  data,
  pageCount,
  pagination,
  sorting,
  keyword,
  isLoading,
  onPaginationChange,
  onSortingChange,
  onKeywordChange,
}: DataTableProps<TData>) {
  const { i18n } = useLingui();
  // TanStack Table intentionally exposes imperative helpers that React Compiler cannot memoize.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination, sorting },
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater(pagination) : updater;
      onPaginationChange(next);
    },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      onSortingChange(next);
    },
  });

  return (
    <div className="overflow-hidden rounded-sm border border-brand-border bg-white shadow-sm">
      <div className="flex min-h-10 flex-col gap-2 border-b border-brand-border bg-slate-50 px-2 py-1.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-brand-secondary-text" />
          <Input
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder={i18n._(msg({ message: 'Tìm trong dữ liệu...' }))}
            aria-label="Search records"
            className="h-7 rounded-sm border-brand-border bg-white pl-7 text-xs"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-brand-secondary-text">
          <span>
            <Trans>Số dòng</Trans>
          </span>
          <select
            value={pagination.pageSize}
            onChange={(event) =>
              onPaginationChange({ pageIndex: 0, pageSize: Number(event.target.value) })
            }
            className="h-7 rounded-sm border border-brand-border bg-white px-1.5 text-xs text-brand-primary-text"
            aria-label="Rows per page"
          >
            {[20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="min-w-20 text-right">
            <Trans>Trang</Trans> {pagination.pageIndex + 1} / {Math.max(pageCount, 1)}
          </span>
        </div>
      </div>

      <div className="max-h-[calc(100vh-15rem)] overflow-auto">
        <table className="min-w-full border-separate border-spacing-0 text-xs">
          <thead className="sticky top-0 z-10 bg-[#eaf1f6] text-left font-semibold text-brand-primary-text shadow-[0_1px_0_0_#d7e0e7]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-8 whitespace-nowrap border-r border-[#d7e0e7] px-2 last:border-r-0"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={!header.column.getCanSort()}
                        className="flex w-full items-center justify-between gap-2 text-left disabled:cursor-default"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() ? (
                          header.column.getIsSorted() === 'asc' ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronsUpDown className="h-3 w-3 text-slate-400" />
                          )
                        ) : null}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="h-24 text-center text-brand-secondary-text" colSpan={columns.length}>
                  <Trans>Đang tải dữ liệu...</Trans>
                </td>
              </tr>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="even:bg-slate-50/60 hover:bg-primary-light">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="h-8 whitespace-nowrap border-b border-r border-slate-200 px-2 text-brand-primary-text last:border-r-0"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="h-24 text-center text-brand-secondary-text" colSpan={columns.length}>
                  <Trans>Không tìm thấy dữ liệu.</Trans>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex h-9 items-center justify-between border-t border-brand-border bg-slate-50 px-2 text-[11px] text-brand-secondary-text">
        <span>
          <Trans>{data.length} bản ghi trên trang này</Trans>
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            size="compact-icon"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <span className="min-w-16 text-center">
            {pagination.pageIndex + 1} / {Math.max(pageCount, 1)}
          </span>
          <Button
            variant="secondary"
            size="compact-icon"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            aria-label="Next page"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
