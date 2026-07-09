export const PERMISSIONS = {
  DASHBOARD_VIEW: 'DASHBOARD_VIEW',
  ORGANIZATION_VIEW: 'ORGANIZATION_VIEW',
  ORGANIZATION_MANAGE: 'ORGANIZATION_MANAGE',
  USER_VIEW: 'USER_VIEW',
  USER_CREATE: 'USER_CREATE',
  USER_UPDATE: 'USER_UPDATE',
  USER_DELETE: 'USER_DELETE',
  ROLE_VIEW: 'ROLE_VIEW',
  ROLE_MANAGE: 'ROLE_MANAGE',
  EMPLOYEE_VIEW: 'EMPLOYEE_VIEW',
  EMPLOYEE_CREATE: 'EMPLOYEE_CREATE',
  EMPLOYEE_UPDATE: 'EMPLOYEE_UPDATE',
  EMPLOYEE_DELETE: 'EMPLOYEE_DELETE',
  EMPLOYEE_DOCUMENT_MANAGE: 'EMPLOYEE_DOCUMENT_MANAGE',
  LEAVE_VIEW: 'LEAVE_VIEW',
  LEAVE_REQUEST: 'LEAVE_REQUEST',
  LEAVE_APPROVE: 'LEAVE_APPROVE',
  LEAVE_CONFIGURE: 'LEAVE_CONFIGURE',
  ATTENDANCE_VIEW: 'ATTENDANCE_VIEW',
  ATTENDANCE_MANAGE: 'ATTENDANCE_MANAGE',
  TIMESHEET_VIEW: 'TIMESHEET_VIEW',
  TIMESHEET_SUBMIT: 'TIMESHEET_SUBMIT',
  TIMESHEET_APPROVE: 'TIMESHEET_APPROVE',
  RECRUITMENT_VIEW: 'RECRUITMENT_VIEW',
  RECRUITMENT_MANAGE: 'RECRUITMENT_MANAGE',
  PERFORMANCE_VIEW: 'PERFORMANCE_VIEW',
  PERFORMANCE_MANAGE: 'PERFORMANCE_MANAGE',
  REPORT_VIEW: 'REPORT_VIEW',
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export function hasPermission(
  userPermissions: Permission[] | undefined,
  permission?: Permission,
): boolean {
  if (!permission) {
    return true;
  }

  if (!userPermissions) {
    return false;
  }

  return userPermissions.includes(PERMISSIONS.SYSTEM_ADMIN) || userPermissions.includes(permission);
}

export function hasAnyPermission(
  userPermissions: Permission[] | undefined,
  permissions: Permission[],
): boolean {
  return permissions.some((permission) => hasPermission(userPermissions, permission));
}
