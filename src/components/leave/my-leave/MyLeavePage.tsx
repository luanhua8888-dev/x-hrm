import { useLingui } from '@lingui/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FilterCustom } from '@/components/common/FilterCustom';
import { TableCustom } from '@/components/common/TableCustom';
import {
  LeaveRequestDetailDialog,
  LeaveRequestDialog,
} from '@/components/leave/my-leave/LeaveRequestDialogs';
import {
  CreateLeaveRequestInput,
  MyLeaveRow,
  MyLeaveStatus,
  createLeaveRequest,
} from '@/components/leave/my-leave/my-leave.model';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const initialLeaveRequests: MyLeaveRow[] = [
  {
    id: 'LV-2026-001',
    type: 'Phép năm',
    fromDate: '2026-07-15',
    toDate: '2026-07-16',
    days: 2,
    reason: 'Việc gia đình',
    status: 'approved',
  },
  {
    id: 'LV-2026-002',
    type: 'Phép ốm',
    fromDate: '2026-08-01',
    toDate: '2026-08-01',
    days: 1,
    reason: 'Khám sức khỏe',
    status: 'pending',
  },
  {
    id: 'LV-2026-003',
    type: 'Phép năm',
    fromDate: '2026-09-02',
    toDate: '2026-09-03',
    days: 2,
    reason: 'Nghỉ lễ',
    status: 'rejected',
  },
];

export default function MyLeavePage() {
  const { i18n } = useLingui();
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<MyLeaveStatus | ''>('');
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MyLeaveRow | null>(null);

  const columns = useMemo<ColumnDef<MyLeaveRow>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Mã',
        size: 110,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-primary">{row.original.id}</span>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Loại phép',
        size: 140,
        cell: ({ row }) => <span className="font-medium text-slate-900">{row.original.type}</span>,
      },
      { accessorKey: 'fromDate', header: 'Từ ngày', size: 120 },
      { accessorKey: 'toDate', header: 'Đến ngày', size: 120 },
      { accessorKey: 'days', header: 'Số ngày', size: 90 },
      {
        accessorKey: 'reason',
        header: 'Lý do',
        size: 200,
        cell: ({ row }) => <span className="truncate text-slate-500">{row.original.reason}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        size: 120,
        cell: ({ row }) => {
          const statusMap = {
            pending: { label: 'Chờ duyệt', className: 'bg-amber-50 text-amber-700' },
            approved: { label: 'Đã duyệt', className: 'bg-emerald-50 text-emerald-700' },
            rejected: { label: 'Từ chối', className: 'bg-red-50 text-red-700' },
            cancelled: { label: 'Đã hủy', className: 'bg-slate-100 text-slate-600' },
          };
          const st = statusMap[row.original.status];
          return (
            <Badge className={`shadow-none font-medium px-2 py-0.5 rounded-md ${st.className}`}>
              {st.label}
            </Badge>
          );
        },
      },
      {
        id: 'actions',
        header: '',
        size: 50,
        enableSorting: false,
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="compact-icon"
            onClick={() => setSelectedRequest(row.original)}
            aria-label={`Xem đơn ${row.original.id}`}
          >
            <Eye className="h-4 w-4 text-slate-500" />
          </Button>
        ),
      },
    ],
    [],
  );

  const data = useMemo(
    () =>
      leaveRequests.filter(
        (item) =>
          (!status || item.status === status) &&
          (item.id.toLowerCase().includes(keyword.toLowerCase()) ||
            item.reason.toLowerCase().includes(keyword.toLowerCase()) ||
            item.type.toLowerCase().includes(keyword.toLowerCase())),
      ),
    [keyword, leaveRequests, status],
  );

  const createRequest = (input: CreateLeaveRequestInput) => {
    setLeaveRequests((current) => [createLeaveRequest(input, current.length), ...current]);
    setIsRequestDialogOpen(false);
  };

  const cancelRequest = (id: string) => {
    setLeaveRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status: 'cancelled' as const } : request,
      ),
    );
    setSelectedRequest((current) =>
      current?.id === id ? { ...current, status: 'cancelled' } : current,
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end border-b border-slate-100 pb-2">
        <Button
          size="sm"
          className="h-8 bg-primary text-xs hover:bg-primary-hover"
          onClick={() => setIsRequestDialogOpen(true)}
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          {i18n.locale === 'en' ? 'Request Leave' : 'Tạo đơn phép'}
        </Button>
      </div>

      <FilterCustom
        keyword={keyword}
        onKeywordChange={setKeyword}
        fields={[
          {
            key: 'status',
            label: i18n.locale === 'en' ? 'Status' : 'Trạng thái',
            options: [
              { label: i18n.locale === 'en' ? 'All statuses' : 'Tất cả trạng thái', value: '' },
              { label: i18n.locale === 'en' ? 'Pending' : 'Chờ duyệt', value: 'pending' },
              { label: i18n.locale === 'en' ? 'Approved' : 'Đã duyệt', value: 'approved' },
              { label: i18n.locale === 'en' ? 'Rejected' : 'Từ chối', value: 'rejected' },
              { label: i18n.locale === 'en' ? 'Cancelled' : 'Đã hủy', value: 'cancelled' },
            ],
          },
        ]}
        values={{ status }}
        onFilterChange={(_, value) => setStatus(value as MyLeaveStatus | '')}
        onReset={() => {
          setKeyword('');
          setStatus('');
        }}
        placeholder={i18n.locale === 'en' ? 'Search leave records...' : 'Tìm kiếm đơn phép...'}
      />

      <TableCustom
        columns={columns}
        data={data}
        keyword={keyword}
        fixedRight={['actions']}
        emptyTitle={i18n.locale === 'en' ? 'No leave requests' : 'Chưa có đơn phép nào'}
        emptyDescription={
          i18n.locale === 'en'
            ? 'You have not submitted any leave requests yet.'
            : 'Bạn chưa tạo đơn xin nghỉ phép nào.'
        }
      />
      <LeaveRequestDialog
        open={isRequestDialogOpen}
        onClose={() => setIsRequestDialogOpen(false)}
        onCreate={createRequest}
      />
      <LeaveRequestDetailDialog
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onCancel={cancelRequest}
      />
    </div>
  );
}
