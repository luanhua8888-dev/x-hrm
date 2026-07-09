import { EmptyState } from '@/components/feedback/EmptyState';

export default function LeaveListPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Leave</h1>
        <p className="text-sm text-slate-500">
          Leave is structured around configuration, entitlement, balance, request, and approval.
        </p>
      </div>
      <EmptyState
        title="Leave workflow foundation is ready"
        description="Service methods exist for GetAllLeave, GetLeaveById, RequestLeave, ApproveLeave, RejectLeave, and CancelLeave."
      />
    </div>
  );
}
