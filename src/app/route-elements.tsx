import { lazy, Suspense, type ReactNode } from 'react';

import { PageLoading } from '@/components/feedback/PageLoading';

const AccessDeniedPage = lazy(() => import('@/components/common/AccessDeniedPage'));
const DashboardPage = lazy(() => import('@/components/dashboard/DashboardPage'));
const EmployeeListPage = lazy(() => import('@/components/employees/list/EmployeeListPage'));
const LeaveListPage = lazy(() => import('@/components/leave/LeaveListPage'));
const LoginPage = lazy(() => import('@/components/login/LoginPage'));
const NotFoundPage = lazy(() => import('@/components/common/NotFoundPage'));
const OrganizationPage = lazy(() => import('@/components/organization/OrganizationPage'));
const ReportsPage = lazy(() => import('@/components/reports/ReportsPage'));
const UserCreatePage = lazy(() => import('@/components/users/create/UserCreatePage'));
const UserDetailPage = lazy(() => import('@/components/users/detail/UserDetailPage'));
const UserListPage = lazy(() => import('@/components/users/list/UserListPage'));

function withPageLoading(element: ReactNode) {
  return <Suspense fallback={<PageLoading />}>{element}</Suspense>;
}

export function AccessDeniedRouteElement() {
  return withPageLoading(<AccessDeniedPage />);
}

export function DashboardRouteElement() {
  return withPageLoading(<DashboardPage />);
}

export function EmployeeListRouteElement() {
  return withPageLoading(<EmployeeListPage />);
}

export function LeaveListRouteElement() {
  return withPageLoading(<LeaveListPage />);
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
