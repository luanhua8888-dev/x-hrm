import { lazy, Suspense, type ReactNode } from 'react';

import { PageLoading } from '@/components/feedback/PageLoading';

const AccessDeniedPage = lazy(() => import('@/components/common/AccessDeniedPage'));
const DashboardPage = lazy(() => import('@/components/dashboard/DashboardPage'));
const EmployeeListPage = lazy(() => import('@/components/employees/list/EmployeeListPage'));
const LoginPage = lazy(() => import('@/components/login/LoginPage'));
const NotFoundPage = lazy(() => import('@/components/common/NotFoundPage'));
const OrganizationPage = lazy(() => import('@/components/organization/OrganizationPage'));
const ReportsPage = lazy(() => import('@/components/reports/ReportsPage'));
const UserCreatePage = lazy(() => import('@/components/users/create/UserCreatePage'));
const UserDetailPage = lazy(() => import('@/components/users/detail/UserDetailPage'));
const UserListPage = lazy(() => import('@/components/users/list/UserListPage'));
const AdministrationPage = lazy(() => import('@/components/administration/AdministrationPage'));

function withPageLoading(element: ReactNode) {
  return <Suspense fallback={<PageLoading />}>{element}</Suspense>;
}

export function AccessDeniedRouteElement() {
  return withPageLoading(<AccessDeniedPage />);
}

export function AdministrationRouteElement() {
  return withPageLoading(<AdministrationPage />);
}

export function DashboardRouteElement() {
  return withPageLoading(<DashboardPage />);
}

export function EmployeeListRouteElement() {
  return withPageLoading(<EmployeeListPage />);
}

const LeaveMyLeavePage = lazy(() => import('@/components/leave/my-leave/MyLeavePage'));
const LeaveRequestsPage = lazy(() => import('@/components/leave/requests/LeaveRequestsPage'));
const LeaveCalendarPage = lazy(() => import('@/components/leave/calendar/LeaveCalendarPage'));
const LeaveBalancesPage = lazy(() => import('@/components/leave/balances/LeaveBalancesPage'));
const LeaveTypesPage = lazy(() => import('@/components/leave/types/LeaveTypesPage'));
const LeaveEntitlementsPage = lazy(
  () => import('@/components/leave/entitlements/LeaveEntitlementsPage'),
);

export function LeaveMyLeaveRouteElement() {
  return withPageLoading(<LeaveMyLeavePage />);
}
export function LeaveRequestsRouteElement() {
  return withPageLoading(<LeaveRequestsPage />);
}
export function LeaveCalendarRouteElement() {
  return withPageLoading(<LeaveCalendarPage />);
}
export function LeaveBalancesRouteElement() {
  return withPageLoading(<LeaveBalancesPage />);
}
export function LeaveTypesRouteElement() {
  return withPageLoading(<LeaveTypesPage />);
}
export function LeaveEntitlementsRouteElement() {
  return withPageLoading(<LeaveEntitlementsPage />);
}

const AttendanceDashboardPage = lazy(
  () => import('@/components/attendance/dashboard/AttendanceDashboardPage'),
);
const MyRecordsPage = lazy(() => import('@/components/attendance/my-records/MyRecordsPage'));
const EmployeeRecordsPage = lazy(
  () => import('@/components/attendance/employee-records/EmployeeRecordsPage'),
);

export function AttendanceDashboardRouteElement() {
  return withPageLoading(<AttendanceDashboardPage />);
}
export function MyRecordsRouteElement() {
  return withPageLoading(<MyRecordsPage />);
}
export function EmployeeRecordsRouteElement() {
  return withPageLoading(<EmployeeRecordsPage />);
}

export function LoginRouteElement() {
  return withPageLoading(<LoginPage />);
}

export function NotFoundRouteElement() {
  return withPageLoading(<NotFoundPage />);
}

export function OrganizationRouteElement() {
  return withPageLoading(<OrganizationPage />);
}

export function ReportsRouteElement() {
  return withPageLoading(<ReportsPage />);
}

export function UserCreateRouteElement() {
  return withPageLoading(<UserCreatePage />);
}

export function UserDetailRouteElement() {
  return withPageLoading(<UserDetailPage />);
}

export function UserListRouteElement() {
  return withPageLoading(<UserListPage />);
}
