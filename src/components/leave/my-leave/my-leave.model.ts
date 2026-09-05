export type MyLeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface MyLeaveRow {
  id: string;
  type: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: MyLeaveStatus;
}

export interface CreateLeaveRequestInput {
  type: string;
  fromDate: string;
  toDate: string;
  reason: string;
}

const millisecondsInDay = 24 * 60 * 60 * 1000;

export function calculateLeaveDays(fromDate: string, toDate: string) {
  const start = new Date(`${fromDate}T00:00:00Z`).getTime();
  const end = new Date(`${toDate}T00:00:00Z`).getTime();

  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return 0;
  return Math.floor((end - start) / millisecondsInDay) + 1;
}

export function createLeaveRequest(
  input: CreateLeaveRequestInput,
  existingCount: number,
): MyLeaveRow {
  return {
    id: `LV-2026-${String(existingCount + 1).padStart(3, '0')}`,
    type: input.type,
    fromDate: input.fromDate,
    toDate: input.toDate,
    days: calculateLeaveDays(input.fromDate, input.toDate),
    reason: input.reason.trim(),
    status: 'pending',
  };
}
