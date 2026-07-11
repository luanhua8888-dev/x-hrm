import { useLingui } from '@lingui/react';
import {
  type Column,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsUpDown, Inbox, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface TableCustomProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  keyword?: string;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  fixedLeft?: string[];
  fixedRight?: string[];
  showColumnFilters?: boolean;
}

const copy = {
  vi: {
    number: 'STT',
    filter: 'Lọc...',
    records: 'bản ghi',
    rows: 'dòng',
    page: 'Trang',
    previous: 'Trang trước',
    next: 'Trang sau',
    empty: 'Chưa có dữ liệu',
    emptyDescription: 'Dữ liệu mới sẽ hiển thị tại đây.',
  },
  en: {
    number: 'No.',
    filter: 'Filter...',
    records: 'records',
    rows: 'rows',
    page: 'Page',
    previous: 'Previous page',
    next: 'Next page',
    empty: 'No data yet',
    emptyDescription: 'New data will appear here.',
  },
} as const;

function stickyStyle<TData>(column: Column<TData>, side?: 'left' | 'right') {
  if (!side) return undefined;
  return {
    position: 'sticky' as const,
    [side]: `${side === 'left' ? column.getStart('left') : column.getAfter('right')}px`,
    zIndex: 2,
  };
}

export function TableCustom<TData>({
  columns,
  data,
  keyword = '',
  isLoading = false,
  emptyTitle,
  emptyDescription,
  fixedLeft = [],
  fixedRight = [],
  showColumnFilters = true,
}: TableCustomProps<TData>) {
  const { i18n } = useLingui();
  const t = copy[i18n.locale === 'en' ? 'en' : 'vi'];
  const tableColumns: ColumnDef<TData>[] = [
    {
      id: '__index',
      header: t.number,
      size: 56,
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row, table }) =>
        table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
        row.index +
        1,
    },
    ...columns,
  ];

  // TanStack Table exposes imperative helpers that React Compiler cannot memoize.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      globalFilter: keyword,
      columnPinning: { left: ['__index', ...fixedLeft], right: fixedRight },
    },
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className="overflow-hidden rounded-xl border border-brand-border bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div
        className="scrollbar-hidden overflow-x-auto"
        tabIndex={0}
        aria-label="Scrollable data table"
      >
        <table className="w-full min-w-max border-separate border-spacing-0 text-[13px]">
          <thead className="text-left text-[11px] font-semibold uppercase tracking-[0.04em] text-slate-500">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => {
                  const side = header.column.getIsPinned() || undefined;
                  return (
                    <th
                      key={header.id}
                      style={{ width: header.getSize(), ...stickyStyle(header.column, side) }}
                      className="h-10 border-b border-brand-border bg-slate-50 px-3 first:text-center"
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          disabled={!header.column.getCanSort()}
                          onClick={header.column.getToggleSortingHandler()}
                          className="flex w-full items-center gap-1.5 whitespace-nowrap text-left disabled:cursor-default first:justify-center"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() ? (
                            <ChevronsUpDown className="h-3 w-3" />
                          ) : null}
                        </button>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
            {showColumnFilters ? (
              <tr>
                {table.getLeafHeaders().map((header) => {
                  const side = header.column.getIsPinned() || undefined;
                  return (
                    <th
                      key={header.id}
                      style={{ width: header.getSize(), ...stickyStyle(header.column, side) }}
                      className="border-b border-brand-border bg-slate-50 px-2 pb-2"
                    >
                      {header.column.getCanFilter() ? (
                        <label className="relative block">
                          <span className="sr-only">{t.filter}</span>
                          <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
                          <input
                            value={(header.column.getFilterValue() as string) ?? ''}
                            onChange={(event) => header.column.setFilterValue(event.target.value)}
                            placeholder={t.filter}
                            className="h-7 w-full min-w-28 rounded-md border border-slate-200 bg-white pl-6 pr-2 text-[11px] font-normal normal-case tracking-normal text-slate-700 outline-none focus:border-primary"
                          />
                        </label>
                      ) : null}
                    </th>
                  );
                })}
              </tr>
            ) : null}
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <tr key={index}>
                  {tableColumns.map((_, cellIndex) => (
                    <td key={cellIndex} className="h-12 border-b border-slate-100 bg-white px-3">
                      <div className="h-3 w-3/4 animate-pulse rounded bg-slate-100" />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="group">
                  {row.getVisibleCells().map((cell) => {
                    const side = cell.column.getIsPinned() || undefined;
                    return (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize(), ...stickyStyle(cell.column, side) }}
                        className="h-12 whitespace-nowrap border-b border-slate-100 bg-white px-3 text-slate-700 transition-colors group-hover:bg-primary-light first:text-center last:text-right"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableColumns.length} className="px-6 py-14 text-center">
                  <Inbox className="mx-auto h-8 w-8 text-slate-300" />
                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    {emptyTitle ?? t.empty}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {emptyDescription ?? t.emptyDescription}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer className="flex min-h-12 flex-col gap-2 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          {table.getFilteredRowModel().rows.length} {t.records}
        </span>
        <div className="flex items-center gap-2">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(event) => table.setPageSize(Number(event.target.value))}
            className="h-8 rounded-md border border-slate-200 bg-white px-2 outline-none focus:border-primary"
            aria-label={t.rows}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} {t.rows}
              </option>
            ))}
          </select>
          <span className="min-w-20 text-center">
            {t.page} {table.getState().pagination.pageIndex + 1}/{Math.max(table.getPageCount(), 1)}
          </span>
          <Button
            variant="secondary"
            size="compact-icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label={t.previous}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="compact-icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label={t.next}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </section>
  );
}
