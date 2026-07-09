import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PERMISSIONS } from '@/config/permissions';
import AccessDeniedPage from '@/features/common/pages/AccessDeniedPage';
import ModulePage from '@/features/common/pages/ModulePage';
import NotFoundPage from '@/features/common/pages/NotFoundPage';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import EmployeeListPage from '@/features/employees/pages/EmployeeListPage';
import LeaveListPage from '@/features/leave/pages/LeaveListPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import UserCreatePage from '@/features/users/pages/UserCreatePage';
import UserDetailPage from '@/features/users/pages/UserDetailPage';
import UserListPage from '@/features/users/pages/UserListPage';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import PermissionRoute from '@/routes/PermissionRoute';
import ProtectedRoute from '@/routes/ProtectedRoute';

const organizationPage = (
  <ModulePage capabilities={['Company information', 'Departments', 'Locations', 'Job titles']} />
);

const attendancePage = (
  <ModulePage
    capabilities={['Punch records', 'My attendance', 'Employee attendance', 'Attendance adjustments']}
  />
);

const timesheetPage = (
  <ModulePage capabilities={['My timesheet', 'Employee timesheets', 'Submission', 'Approval']} />
);

const recruitmentPage = (
  <ModulePage capabilities={['Vacancies', 'Candidates', 'Applications', 'Interviews', 'Hire or reject']} />
);

const performancePage = (
  <ModulePage capabilities={['KPI configuration', 'Goals', 'Reviews', 'Appraisals']} />
);

const reportsPage = (
  <ModulePage capabilities={['Employee reports', 'Leave reports', 'Attendance reports', 'Saved criteria']} />
);

const administrationPage = (
  <ModulePage capabilities={['Roles', 'Permissions', 'Audit logs', 'Settings']} />
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/access-denied',
            element: <AccessDeniedPage />,
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.DASHBOARD_VIEW} />,
            children: [{ path: '/dashboard', element: <DashboardPage /> }],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.ORGANIZATION_VIEW} />,
            children: [
              { path: '/organization', element: organizationPage },
              { path: '/organization/company', element: organizationPage },
              { path: '/organization/departments', element: organizationPage },
              { path: '/organization/locations', element: organizationPage },
              { path: '/organization/job-titles', element: organizationPage },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.USER_VIEW} />,
            children: [
              { path: '/users', element: <UserListPage /> },
              { path: '/users/:userId', element: <UserDetailPage /> },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.USER_CREATE} />,
            children: [{ path: '/users/new', element: <UserCreatePage /> }],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.EMPLOYEE_VIEW} />,
            children: [
              { path: '/employees', element: <EmployeeListPage /> },
              { path: '/employees/new', element: <EmployeeListPage /> },
              { path: '/employees/:employeeId', element: <EmployeeListPage /> },
              { path: '/employees/:employeeId/personal', element: <EmployeeListPage /> },
              { path: '/employees/:employeeId/contact', element: <EmployeeListPage /> },
              { path: '/employees/:employeeId/emergency-contacts', element: <EmployeeListPage /> },
              { path: '/employees/:employeeId/job', element: <EmployeeListPage /> },
              { path: '/employees/:employeeId/salary', element: <EmployeeListPage /> },
              { path: '/employees/:employeeId/documents', element: <EmployeeListPage /> },
              { path: '/employees/:employeeId/employment-history', element: <EmployeeListPage /> },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.LEAVE_VIEW} />,
            children: [
              { path: '/leave', element: <LeaveListPage /> },
              { path: '/leave/my-leave', element: <LeaveListPage /> },
              { path: '/leave/requests', element: <LeaveListPage /> },
              { path: '/leave/calendar', element: <LeaveListPage /> },
              { path: '/leave/balances', element: <LeaveListPage /> },
              { path: '/leave/types', element: <LeaveListPage /> },
              { path: '/leave/entitlements', element: <LeaveListPage /> },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.ATTENDANCE_VIEW} />,
            children: [
              { path: '/attendance', element: attendancePage },
              { path: '/attendance/my-records', element: attendancePage },
              { path: '/attendance/employee-records', element: attendancePage },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.TIMESHEET_VIEW} />,
            children: [
              { path: '/timesheets', element: timesheetPage },
              { path: '/timesheets/my-timesheet', element: timesheetPage },
              { path: '/timesheets/employee-timesheets', element: timesheetPage },
              { path: '/timesheets/approvals', element: timesheetPage },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.RECRUITMENT_VIEW} />,
            children: [
              { path: '/recruitment', element: recruitmentPage },
              { path: '/recruitment/vacancies', element: recruitmentPage },
              { path: '/recruitment/vacancies/:vacancyId', element: recruitmentPage },
              { path: '/recruitment/candidates', element: recruitmentPage },
              { path: '/recruitment/candidates/:candidateId', element: recruitmentPage },
              { path: '/recruitment/applications', element: recruitmentPage },
              { path: '/recruitment/interviews', element: recruitmentPage },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.PERFORMANCE_VIEW} />,
            children: [
              { path: '/performance', element: performancePage },
              { path: '/performance/kpis', element: performancePage },
              { path: '/performance/goals', element: performancePage },
              { path: '/performance/reviews', element: performancePage },
              { path: '/performance/appraisals', element: performancePage },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.REPORT_VIEW} />,
            children: [{ path: '/reports', element: reportsPage }],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.SYSTEM_ADMIN} />,
            children: [
              { path: '/administration', element: administrationPage },
              { path: '/administration/roles', element: administrationPage },
              { path: '/administration/permissions', element: administrationPage },
              { path: '/administration/audit-logs', element: administrationPage },
              { path: '/administration/settings', element: administrationPage },
            ],
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);
