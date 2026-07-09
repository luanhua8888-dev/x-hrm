import { describe, expect, it } from 'vitest';

import { hasPermission, PERMISSIONS } from '@/config/permissions';

describe('hasPermission', () => {
  it('allows system admin to access any permission-protected capability', () => {
    expect(hasPermission([PERMISSIONS.SYSTEM_ADMIN], PERMISSIONS.EMPLOYEE_DELETE)).toBe(true);
  });

  it('denies missing permissions', () => {
    expect(hasPermission([PERMISSIONS.EMPLOYEE_VIEW], PERMISSIONS.LEAVE_APPROVE)).toBe(false);
  });
});
