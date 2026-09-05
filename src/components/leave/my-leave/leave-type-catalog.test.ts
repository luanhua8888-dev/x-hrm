import { describe, expect, it } from 'vitest';

import {
  getLeaveTypeGroups,
  getLeaveTypeById,
} from '@/components/leave/my-leave/leave-type-catalog';

describe('getLeaveTypeGroups', () => {
  it('groups selectable leave types by the employee action required', () => {
    expect(
      getLeaveTypeGroups().map(({ id, types }) => ({
        id,
        typeIds: types.map((type) => type.id),
      })),
    ).toEqual([
      { id: 'balance', typeIds: ['annual', 'compensatory'] },
      { id: 'personal-paid', typeIds: ['own-marriage', 'child-marriage', 'family-bereavement'] },
      { id: 'personal-unpaid', typeIds: ['family-event-unpaid', 'unpaid-personal'] },
      { id: 'benefit', typeIds: ['sick', 'child-sick', 'maternity'] },
      { id: 'company', typeIds: ['study', 'special-leave'] },
    ]);
  });
});

describe('getLeaveTypeById', () => {
  it('flags sick leave as a document-based social-insurance request', () => {
    expect(getLeaveTypeById('sick')).toMatchObject({
      id: 'sick',
      groupId: 'benefit',
      requiresDocument: true,
    });
  });
});
