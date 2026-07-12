import { useLingui } from '@lingui/react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FilterCustom } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { Button } from '@/components/ui/button';

interface EntitlementRow {
  id: string;
  ruleName: string;
  target: string;
  leaveType: string;
  validFrom: string;
  validTo: string;
  days: number;
}

const mockData: EntitlementRow[] = [
  {
    id: 'ENT-001',
    ruleName: 'Phép năm tiêu chuẩn',
    target: 'Toàn bộ nhân viên',
    leaveType: 'Nghỉ phép năm',
    validFrom: '01/01/2026',
    validTo: '31/12/2026',
    days: 12,
  },
  {
    id: 'ENT-002',
    ruleName: 'Phép năm thâm niên (5 năm)',
    target: 'Thâm niên > 5 năm',
    leaveType: 'Nghỉ phép năm',
    validFrom: '01/01/2026',
    validTo: '31/12/2026',
    days: 13,
  },
  {
    id: 'ENT-003',
    ruleName: 'Nghỉ thai sản nữ',
    target: 'Nữ giới',
    leaveType: 'Nghỉ thai sản',
    validFrom: '01/01/2026',
    validTo: '31/12/2026',
    days: 180,
  },
];

export default function LeaveEntitlementsPage() {
  const { i18n } = useLingui();
  const [keyword, setKeyword] = useState('');

  const columns = useMemo<ColumnDef<EntitlementRow>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Mã',
        size: 100,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-primary">{row.original.id}</span>
        ),
      },
      {
        accessorKey: 'ruleName',
        header: 'Tên chính sách / Quy tắc',
        size: 250,
        cell: ({ row }) => (
          <span className="font-medium text-slate-900">{row.original.ruleName}</span>
        ),
      },
      {
        accessorKey: 'target',
        header: 'Đối tượng áp dụng',
        size: 180,
        cell: ({ row }) => <span className="text-slate-600">{row.original.target}</span>,
      },
      { accessorKey: 'leaveType', header: 'Loại phép', size: 150 },
      { accessorKey: 'validFrom', header: 'Hiệu lực từ', size: 110 },
      { accessorKey: 'validTo', header: 'Đến ngày', size: 110 },
      {
        accessorKey: 'days',
        header: 'Định mức (Ngày)',
        size: 120,
        cell: ({ row }) => <span className="font-bold text-slate-700">{row.original.days}</span>,
      },
      {
        id: 'actions',
        header: '',
        size: 50,
        enableSorting: false,
        cell: () => (
          <Button variant="ghost" size="compact-icon">
            <MoreHorizontal className="h-4 w-4 text-slate-400" />
          </Button>
        ),
      },
    ],
    [],
  );

  const data = useMemo(
    () =>
      mockData.filter(
        (item) =>
          item.ruleName.toLowerCase().includes(keyword.toLowerCase()) ||
          item.target.toLowerCase().includes(keyword.toLowerCase()),
      ),
    [keyword],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end border-b border-slate-100 pb-2">
        <Button size="sm" className="h-8 bg-primary text-xs hover:bg-primary-hover">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          {i18n.locale === 'en' ? 'Assign Entitlement' : 'Thêm chính sách'}
        </Button>
      </div>

      <FilterCustom
        keyword={keyword}
        onKeywordChange={setKeyword}
        onReset={() => setKeyword('')}
        placeholder={i18n.locale === 'en' ? 'Search policies...' : 'Tìm kiếm chính sách...'}
      />

      <TableCustom
        columns={columns}
        data={data}
        keyword={keyword}
        fixedRight={['actions']}
        emptyTitle={i18n.locale === 'en' ? 'No policies' : 'Không có dữ liệu'}
        emptyDescription={
          i18n.locale === 'en'
            ? 'Manage leave accrual policies.'
            : 'Quản lý chính sách cộng dồn và cấp phát quyền lợi nghỉ phép.'
        }
      />
    </div>
  );
}
