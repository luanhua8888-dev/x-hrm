import { describe, expect, it } from 'vitest';

import { resolveEmployeeWorkspace } from '@/components/employees/employee-workspace';

describe('resolveEmployeeWorkspace', () => {
  it('routes a new employee URL to the onboarding workspace', () => {
    expect(resolveEmployeeWorkspace('/employees/new')).toEqual({ kind: 'onboarding' });
  });

  it('keeps the employee identity and selected tab for nested profile URLs', () => {
    expect(resolveEmployeeWorkspace('/employees/emp-1001/documents')).toEqual({
      kind: 'profile',
      employeeId: 'emp-1001',
      tab: 'documents',
    });
  });

  it('uses personal details as the default profile tab', () => {
    expect(resolveEmployeeWorkspace('/employees/emp-1001')).toEqual({
      kind: 'profile',
      employeeId: 'emp-1001',
      tab: 'personal',
    });
  });

  it('keeps the employee directory as the fallback', () => {
    expect(resolveEmployeeWorkspace('/employees')).toEqual({ kind: 'directory' });
  });
});
