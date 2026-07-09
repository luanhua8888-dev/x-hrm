import { describe, expect, it } from 'vitest';

import { filterNavigationByPermissions, navigationItems } from '@/config/navigation';
import { PERMISSIONS } from '@/config/permissions';

describe('filterNavigationByPermissions', () => {
  it('keeps only navigation entries allowed by permissions', () => {
    const result = filterNavigationByPermissions(navigationItems, [
      PERMISSIONS.DASHBOARD_VIEW,
      PERMISSIONS.EMPLOYEE_VIEW,
    ]);

    expect(result.map((item) => item.title)).toContain('Dashboard');
    expect(result.map((item) => item.title)).toContain('People');
    expect(result.map((item) => item.title)).not.toContain('Administration');
  });
});
