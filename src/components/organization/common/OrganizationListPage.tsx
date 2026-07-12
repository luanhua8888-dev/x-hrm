import { useLingui } from '@lingui/react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FilterCustom, type FilterField } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface OrganizationRow {
  id: string;
  code: string;
  name: string;
  detail: string;
  owner: string;
  count: number;
  status: 'active' | 'inactive';
}

export interface OrganizationListConfig {
  title: [string, string];
  description: [string, string];
  addLabel: [string, string];
  search: [string, string];
  detailHeader: [string, string];
  countHeader: [string, string];
  emptyTitle: [string, string];
}

export function OrganizationListPage({
  config,
  rows,
}: {
  config: OrganizationListConfig;
  rows: OrganizationRow[];
}) {
  const { i18n } = useLingui();
  const languageIndex = i18n.locale === 'en' ? 1 : 0;
  const tr = (value: [string, string]) => value[languageIndex];
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({ status: '' });
  const data = useMemo(
    () => rows.filter((row) => !filters.status || row.status === filters.status),
    [filters.status, rows],
  );
  const filterFields: FilterField[] = [
    {
      key: 'status',
      label: languageIndex ? 'Status' : 'Trạng thái',
      options: [
        { label: languageIndex ? 'All statuses' : 'Tất cả trạng thái', value: '' },
        { label: languageIndex ? 'Active' : 'Đang hoạt động', value: 'active' },
        { label: languageIndex ? 'Inactive' : 'Ngừng hoạt động', value: 'inactive' },
      ],
    },
  ];
  const columns = useMemo<ColumnDef<OrganizationRow>[]>(
    () => [
      {
        accessorKey: 'code',
        header: languageIndex ? 'Code' : 'Mã',
        size: 100,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-primary">{row.original.code}</span>
        ),
      },
      {
        accessorKey: 'name',
        header: languageIndex ? 'Name' : 'Tên',
        size: 230,
        cell: ({ row }) => <span className="font-medium text-slate-900">{row.original.name}</span>,
      },
      { accessorKey: 'detail', header: config.detailHeader[languageIndex], size: 260 },
      { accessorKey: 'owner', header: languageIndex ? 'Owner' : 'Phụ trách', size: 180 },
      { accessorKey: 'count', header: config.countHeader[languageIndex], size: 110 },
      {
        accessorKey: 'status',
        header: languageIndex ? 'Status' : 'Trạng thái',
        size: 140,
        cell: ({ row }) => (
          <Badge
            className={
              row.original.status === 'active'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-slate-100 text-slate-500'
            }
          >
            {row.original.status === 'active'
              ? languageIndex
                ? 'Active'
                : 'Hoạt động'
              : languageIndex
                ? 'Inactive'
                : 'Ngừng hoạt động'}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: '',
        size: 50,
        enableSorting: false,
        cell: () => (
          <Button
            variant="ghost"
            size="compact-icon"
            aria-label={languageIndex ? 'Options' : 'Tùy chọn'}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        ),
      },
    ],
    [config.countHeader, config.detailHeader, languageIndex],
  );

  return (
    <div className="space-y-3">
      <header className="flex min-h-9 items-center justify-end border-b border-brand-border pb-2">
        <Button size="sm" className="h-8 rounded-lg bg-primary text-xs hover:bg-primary-hover">
          <Plus className="h-4 w-4" />
          {tr(config.addLabel)}
        </Button>
      </header>
      <FilterCustom
        keyword={keyword}
        onKeywordChange={setKeyword}
        fields={filterFields}
        values={filters}
        onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
        onReset={() => {
          setKeyword('');
          setFilters({ status: '' });
        }}
        placeholder={tr(config.search)}
      />
      <TableCustom
        columns={columns}
        data={data}
        keyword={keyword}
        fixedLeft={['code', 'name']}
        fixedRight={['actions']}
        emptyTitle={tr(config.emptyTitle)}
        emptyDescription={
          languageIndex
            ? 'Add the first record to begin managing.'
            : 'Thêm bản ghi đầu tiên để bắt đầu quản lý.'
        }
      />
    </div>
  );
}
