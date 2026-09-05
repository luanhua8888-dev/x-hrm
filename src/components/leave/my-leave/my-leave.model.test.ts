import { describe, expect, it } from 'vitest';

import { calculateLeaveDays, createLeaveRequest } from '@/components/leave/my-leave/my-leave.model';

describe('calculateLeaveDays', () => {
  it('counts both the first and last day of a leave request', () => {
    expect(calculateLeaveDays('2026-09-10', '2026-09-12')).toBe(3);
  });

  it('returns zero when the end date is before the start date', () => {
    expect(calculateLeaveDays('2026-09-12', '2026-09-10')).toBe(0);
  });
});

describe('createLeaveRequest', () => {
  it('creates a pending request with the correct number of leave days', () => {
    expect(
      createLeaveRequest(
        { type: 'Phép năm', fromDate: '2026-09-10', toDate: '2026-09-12', reason: 'Việc gia đình' },
        4,
      ),
    ).toEqual({
      id: 'LV-2026-005',
      type: 'Phép năm',
      fromDate: '2026-09-10',
      toDate: '2026-09-12',
      days: 3,
      reason: 'Việc gia đình',
      status: 'pending',
    });
  });
});
