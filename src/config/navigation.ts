import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  FileBarChart,
  Gauge,
  LucideIcon,
  Settings,
  Shield,
  TableProperties,
  Users,
  UserRound,
} from 'lucide-react';

import { hasPermission, Permission, PERMISSIONS } from '@/config/permissions';

export interface NavigationItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  permission?: Permission;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: Gauge,
    permission: PERMISSIONS.DASHBOARD_VIEW,
  },
  {
    title: 'Organization',
    path: '/organization',
    icon: Building2,
    permission: PERMISSIONS.ORGANIZATION_VIEW,
    children: [
      {
        title: 'Company',
        path: '/organization/company',
        permission: PERMISSIONS.ORGANIZATION_VIEW,
      },
      {
        title: 'Departments',
        path: '/organization/departments',
        permission: PERMISSIONS.ORGANIZATION_VIEW,
      },
      {
        title: 'Locations',
        path: '/organization/locations',
        permission: PERMISSIONS.ORGANIZATION_VIEW,
      },
      {
        title: 'Job Titles',
        path: '/organization/job-titles',
        permission: PERMISSIONS.ORGANIZATION_VIEW,
      },
    ],
  },
  {
    title: 'Employees',
    path: '/employees',
    icon: Users,
    permission: PERMISSIONS.EMPLOYEE_VIEW,
  },
  {
    title: 'Users',
    path: '/users',
    icon: UserRound,
    permission: PERMISSIONS.USER_VIEW,
  },
  {
    title: 'Leave',
    path: '/leave',
    icon: CalendarDays,
    permission: PERMISSIONS.LEAVE_VIEW,
    children: [
      { title: 'My Leave', path: '/leave/my-leave', permission: PERMISSIONS.LEAVE_REQUEST },
      { title: 'Requests', path: '/leave/requests', permission: PERMISSIONS.LEAVE_APPROVE },
      { title: 'Calendar', path: '/leave/calendar', permission: PERMISSIONS.LEAVE_VIEW },
      { title: 'Balances', path: '/leave/balances', permission: PERMISSIONS.LEAVE_VIEW },
      { title: 'Types', path: '/leave/types', permission: PERMISSIONS.LEAVE_CONFIGURE },
      {
        title: 'Entitlements',
        path: '/leave/entitlements',
        permission: PERMISSIONS.LEAVE_CONFIGURE,
      },
    ],
  },
  {
    title: 'Thời gian',
    path: '/workforce-attendance/dashboard',
    icon: Clock3,
    permission: PERMISSIONS.ATTENDANCE_VIEW,
    children: [
      {
        title: 'Tổng quan',
        path: '/workforce-attendance/dashboard',
        permission: PERMISSIONS.ATTENDANCE_VIEW,
      },
      {
        title: 'Ca làm việc',
        path: '/workforce-attendance/shifts',
        permission: PERMISSIONS.ATTENDANCE_MANAGE,
      },
      {
        title: 'Lịch làm việc',
        path: '/workforce-attendance/schedules',
        permission: PERMISSIONS.ATTENDANCE_VIEW,
      },
      {
        title: 'Trực & On-call',
        path: '/workforce-attendance/duty',
        permission: PERMISSIONS.ATTENDANCE_MANAGE,
      },
      {
        title: 'Chấm công ngày',
        path: '/workforce-attendance/daily',
        permission: PERMISSIONS.ATTENDANCE_VIEW,
      },
      {
        title: 'Ngoại lệ',
        path: '/workforce-attendance/exceptions',
        permission: PERMISSIONS.ATTENDANCE_MANAGE,
      },
      {
        title: 'Điều chỉnh',
        path: '/workforce-attendance/adjustments',
        permission: PERMISSIONS.ATTENDANCE_MANAGE,
      },
      {
        title: 'Làm thêm giờ',
        path: '/workforce-attendance/overtime',
        permission: PERMISSIONS.ATTENDANCE_MANAGE,
      },
      {
        title: 'Đổi ca',
        path: '/workforce-attendance/shift-swaps',
        permission: PERMISSIONS.ATTENDANCE_VIEW,
      },
      {
        title: 'Bảng công',
        path: '/workforce-attendance/timesheets',
        permission: PERMISSIONS.TIMESHEET_VIEW,
      },
      {
        title: 'Chốt công',
        path: '/workforce-attendance/closing',
        permission: PERMISSIONS.TIMESHEET_APPROVE,
      },
      {
        title: 'Chính sách',
        path: '/workforce-attendance/policies',
        permission: PERMISSIONS.ATTENDANCE_MANAGE,
      },
      {
        title: 'Thiết bị',
        path: '/workforce-attendance/devices',
        permission: PERMISSIONS.ATTENDANCE_MANAGE,
      },
      {
        title: 'Quy tắc phụ cấp',
        path: '/workforce-attendance/allowance-rules',
        permission: PERMISSIONS.ATTENDANCE_MANAGE,
      },
      {
        title: 'Chấm công của tôi',
        path: '/workforce-attendance/my-attendance',
        permission: PERMISSIONS.ATTENDANCE_VIEW,
      },
      {
        title: 'Lịch của tôi',
        path: '/workforce-attendance/my-schedule',
        permission: PERMISSIONS.ATTENDANCE_VIEW,
      },
      {
        title: 'Bảng công của tôi',
        path: '/workforce-attendance/my-timesheet',
        permission: PERMISSIONS.TIMESHEET_VIEW,
      },
      {
        title: 'Yêu cầu của tôi',
        path: '/workforce-attendance/my-requests',
        permission: PERMISSIONS.ATTENDANCE_VIEW,
      },
    ],
  },
  {
    title: 'Recruitment',
    path: '/recruitment',
    icon: BriefcaseBusiness,
    permission: PERMISSIONS.RECRUITMENT_VIEW,
  },
  {
    title: 'Performance',
    path: '/performance',
    icon: BarChart3,
    permission: PERMISSIONS.PERFORMANCE_VIEW,
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: FileBarChart,
    permission: PERMISSIONS.REPORT_VIEW,
  },
  {
    title: 'Administration',
    path: '/administration',
    icon: Settings,
    permission: PERMISSIONS.SYSTEM_ADMIN,
    children: [
      {
        title: 'Roles',
        path: '/administration/roles',
        icon: Shield,
        permission: PERMISSIONS.ROLE_VIEW,
      },
      {
        title: 'Permissions',
        path: '/administration/permissions',
        icon: TableProperties,
        permission: PERMISSIONS.ROLE_MANAGE,
      },
      {
        title: 'Audit Logs',
        path: '/administration/audit-logs',
        permission: PERMISSIONS.SYSTEM_ADMIN,
      },
      {
        title: 'Settings',
        path: '/administration/settings',
        permission: PERMISSIONS.SYSTEM_ADMIN,
      },
    ],
  },
];

export function filterNavigationByPermissions(
  items: NavigationItem[],
  permissions: Permission[] | undefined,
): NavigationItem[] {
  const filteredItems: NavigationItem[] = [];

  for (const item of items) {
    const children = item.children
      ? filterNavigationByPermissions(item.children, permissions)
      : undefined;
    const canAccessItem = hasPermission(permissions, item.permission);

    if (!canAccessItem && (!children || children.length === 0)) {
      continue;
    }

    filteredItems.push({
      ...item,
      children,
    });
  }

  return filteredItems;
}

export interface BreadcrumbSegment {
  title: string;
  path: string;
}

/**
 * Resolves the breadcrumb trail for a given pathname.
 * Returns e.g. [{ title: 'Organization', path: '/organization' }, { title: 'Departments', path: '/organization/departments' }]
 */
export function resolveBreadcrumb(pathname: string): BreadcrumbSegment[] {
  for (const item of navigationItems) {
    // Exact match on top-level item (no children or own route)
    if (item.path === pathname) {
      return [{ title: item.title, path: item.path }];
    }

    // Check children
    if (item.children) {
      for (const child of item.children) {
        if (child.path === pathname || pathname.startsWith(`${child.path}/`)) {
          return [
            { title: item.title, path: item.path },
            { title: child.title, path: child.path },
          ];
        }
      }

      // Pathname starts with item.path but no child matched exactly
      if (pathname.startsWith(`${item.path}/`) || pathname === item.path) {
        return [{ title: item.title, path: item.path }];
      }
    }
  }

  return [];
}
