import { lazy, Suspense, type ReactNode } from 'react';

import { PageLoading } from '@/components/feedback/PageLoading';

const AccessDeniedPage = lazy(() => import('@/features/common/pages/AccessDeniedPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const EmployeeListPage = lazy(() => import('@/features/employees/pages/EmployeeListPage'));
const LeaveListPage = lazy(() => import('@/features/leave/pages/LeaveListPage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const NotFoundPage = lazy(() => import('@/features/common/pages/NotFoundPage'));
const UserCreatePage = lazy(() => import('@/features/users/pages/UserCreatePage'));
const UserDetailPage = lazy(() => import('@/features/users/pages/UserDetailPage'));
const UserListPage = lazy(() => import('@/features/users/pages/UserListPage'));

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

export function UserCreateRouteElement() {
  return withPageLoading(<UserCreatePage />);
}

export function UserDetailRouteElement() {
  return withPageLoading(<UserDetailPage />);
}

export function UserListRouteElement() {
  return withPageLoading(<UserListPage />);
}
