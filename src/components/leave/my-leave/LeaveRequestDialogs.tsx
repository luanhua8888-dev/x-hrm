import { CalendarPlus } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';

import {
  CreateLeaveRequestInput,
  MyLeaveRow,
  calculateLeaveDays,
} from '@/components/leave/my-leave/my-leave.model';
import {
  getLeaveTypeById,
  getLeaveTypeGroups,
} from '@/components/leave/my-leave/leave-type-catalog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PopupCustom } from '@/components/ui/PopupCustom';

export function LeaveRequestDialog({
  onClose,
  onCreate,
  open,
}: {
  onClose: () => void;
  onCreate: (input: CreateLeaveRequestInput) => void;
  open: boolean;
}) {
  const [form, setForm] = useState<CreateLeaveRequestInput>({
    type: 'Phép năm',
    fromDate: '',
    toDate: '',
    reason: '',
  });
  const [leaveTypeId, setLeaveTypeId] = useState('annual');
  const [error, setError] = useState('');
  const days = calculateLeaveDays(form.fromDate, form.toDate);
  const leaveTypeGroups = getLeaveTypeGroups();
  const selectedLeaveType = getLeaveTypeById(leaveTypeId) ?? leaveTypeGroups[0].types[0];

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.fromDate || !form.toDate || !form.reason.trim()) {
      setError('Hãy điền ngày nghỉ và lý do.');
      return;
    }
    if (!days) {
      setError('Ngày kết thúc phải từ ngày bắt đầu trở đi.');
      return;
    }
    onCreate({ ...form, type: selectedLeaveType.name });
    setForm({ type: 'Phép năm', fromDate: '', toDate: '', reason: '' });
    setLeaveTypeId('annual');
    setError('');
  };

  return (
    <PopupCustom.Root open={open} onClose={onClose} size="md">
      <form onSubmit={submit}>
        <PopupCustom.Header
          icon={<CalendarPlus className="h-4 w-4" />}
          description="Hệ thống sẽ kiểm tra đơn theo chính sách của loại nghỉ bạn chọn."
        >
          Tạo đơn nghỉ phép
        </PopupCustom.Header>
        <PopupCustom.Body>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Loại nghỉ" className="sm:col-span-2">
              <select
                value={leaveTypeId}
                onChange={(event) => setLeaveTypeId(event.target.value)}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                {leaveTypeGroups.map((group) => (
                  <optgroup key={group.id} label={group.name}>
                    {group.types.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </Field>
            <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2.5 text-sm sm:col-span-2">
              <p className="font-medium text-slate-800">{selectedLeaveType.description}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {selectedLeaveType.requiresDocument
                  ? 'Cần chứng từ y tế để HR xử lý chế độ.'
                  : selectedLeaveType.usesBalance
                    ? 'Số dư sẽ được kiểm tra trước khi đơn được xác nhận.'
                    : selectedLeaveType.requiresApproval
                      ? 'Đơn sẽ được gửi để phê duyệt.'
                      : 'Bạn chỉ cần thông báo theo quy định áp dụng.'}
              </p>
            </div>
            <Field label="Từ ngày">
              <Input
                type="date"
                value={form.fromDate}
                onChange={(event) =>
                  setForm((current) => ({ ...current, fromDate: event.target.value }))
                }
              />
            </Field>
            <Field label="Đến ngày">
              <Input
                type="date"
                value={form.toDate}
                onChange={(event) =>
                  setForm((current) => ({ ...current, toDate: event.target.value }))
                }
              />
            </Field>
            <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 sm:col-span-2">
              <p className="text-sm text-slate-600">Tổng ngày nghỉ</p>
              {days ? (
                <p className="text-sm font-semibold tabular-nums text-slate-900">{days} ngày</p>
              ) : (
                <p className="text-sm text-slate-400">Chọn khoảng thời gian</p>
              )}
            </div>
          </div>
          {selectedLeaveType.requiresDocument ? (
            <Field label="Chứng từ" className="mt-4">
              <Input type="file" accept=".pdf,.jpg,.jpeg,.png" required />
            </Field>
          ) : null}
          <Field label="Lý do" className="mt-4">
            <textarea
              value={form.reason}
              onChange={(event) =>
                setForm((current) => ({ ...current, reason: event.target.value }))
              }
              rows={3}
              placeholder="Nêu ngắn gọn lý do nghỉ phép"
              className="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </Field>
          {error ? (
            <p role="alert" className="mt-3 text-sm text-rose-600">
              {error}
            </p>
          ) : null}
        </PopupCustom.Body>
        <PopupCustom.Footer>
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button type="submit">Gửi đơn phép</Button>
        </PopupCustom.Footer>
      </form>
    </PopupCustom.Root>
  );
}

export function LeaveRequestDetailDialog({
  onCancel,
  onClose,
  request,
}: {
  onCancel: (id: string) => void;
  onClose: () => void;
  request: MyLeaveRow | null;
}) {
  return (
    <PopupCustom.Root open={Boolean(request)} onClose={onClose} size="sm">
      <PopupCustom.Header description={request ? `Mã đơn ${request.id}` : undefined}>
        Chi tiết đơn nghỉ phép
      </PopupCustom.Header>
      {request ? (
        <>
          <PopupCustom.Body>
            <dl className="space-y-3 text-sm">
              <DetailRow label="Loại phép" value={request.type} />
              <DetailRow label="Thời gian" value={`${request.fromDate} → ${request.toDate}`} />
              <DetailRow label="Số ngày" value={String(request.days)} />
              <DetailRow label="Lý do" value={request.reason} />
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <dt className="text-slate-500">Trạng thái</dt>
                <dd>
                  <LeaveStatusBadge status={request.status} />
                </dd>
              </div>
            </dl>
          </PopupCustom.Body>
          <PopupCustom.Footer>
            {request.status === 'pending' ? (
              <Button variant="danger" onClick={() => onCancel(request.id)}>
                Hủy đơn
              </Button>
            ) : null}
            <Button variant="secondary" onClick={onClose}>
              Đóng
            </Button>
          </PopupCustom.Footer>
        </>
      ) : null}
    </PopupCustom.Root>
  );
}

function LeaveStatusBadge({ status }: { status: MyLeaveRow['status'] }) {
  const styleMap: Record<MyLeaveRow['status'], { label: string; className: string }> = {
    pending: { label: 'Chờ duyệt', className: 'bg-amber-50 text-amber-700' },
    approved: { label: 'Đã duyệt', className: 'bg-emerald-50 text-emerald-700' },
    rejected: { label: 'Từ chối', className: 'bg-rose-50 text-rose-700' },
    cancelled: { label: 'Đã hủy', className: 'bg-slate-100 text-slate-600' },
  };
  const item = styleMap[status];
  return (
    <Badge className={`rounded-md px-2 py-0.5 font-medium shadow-none ${item.className}`}>
      {item.label}
    </Badge>
  );
}

function Field({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <label className={`block space-y-1.5 ${className ?? ''}`}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
      <dt className="shrink-0 text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-800">{value}</dd>
    </div>
  );
}
