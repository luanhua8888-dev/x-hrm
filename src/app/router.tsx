import { createBrowserRouter, Navigate } from 'react-router-dom';

import {
  AccessDeniedRouteElement,
  AdministrationRouteElement,
  DashboardRouteElement,
  EmployeeListRouteElement,
  LeaveMyLeaveRouteElement,
  LeaveRequestsRouteElement,
  LeaveCalendarRouteElement,
  LeaveBalancesRouteElement,
  LeaveTypesRouteElement,
  LeaveEntitlementsRouteElement,
  LoginRouteElement,
  NotFoundRouteElement,
  OrganizationRouteElement,
  ReportsRouteElement,
  UserCreateRouteElement,
  UserDetailRouteElement,
  UserListRouteElement,
  AttendanceDashboardRouteElement,
  MyRecordsRouteElement,
  EmployeeRecordsRouteElement,
} from '@/app/route-elements';
import { PERMISSIONS } from '@/config/permissions';
import ModulePage from '@/components/common/ModulePage';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import PermissionRoute from '@/routes/PermissionRoute';
import ProtectedRoute from '@/routes/ProtectedRoute';

const timesheetPage = (
  <ModulePage capabilities={['My timesheet', 'Employee timesheets', 'Submission', 'Approval']} />
);

const recruitmentPage = (
  <ModulePage
    capabilities={['Vacancies', 'Candidates', 'Applications', 'Interviews', 'Hire or reject']}
  />
);

const performancePage = (
  <ModulePage capabilities={['KPI configuration', 'Goals', 'Reviews', 'Appraisals']} />
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
        element: <LoginRouteElement />,
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
            element: <AccessDeniedRouteElement />,
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.DASHBOARD_VIEW} />,
            children: [{ path: '/dashboard', element: <DashboardRouteElement /> }],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.ORGANIZATION_VIEW} />,
            children: [
              { path: '/organization', element: <OrganizationRouteElement /> },
              { path: '/organization/company', element: <OrganizationRouteElement /> },
              { path: '/organization/departments', element: <OrganizationRouteElement /> },
              { path: '/organization/locations', element: <OrganizationRouteElement /> },
              { path: '/organization/job-titles', element: <OrganizationRouteElement /> },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.USER_VIEW} />,
            children: [
              { path: '/users', element: <UserListRouteElement /> },
              { path: '/users/:userId', element: <UserDetailRouteElement /> },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.USER_CREATE} />,
            children: [{ path: '/users/new', element: <UserCreateRouteElement /> }],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.EMPLOYEE_VIEW} />,
            children: [
              { path: '/employees', element: <EmployeeListRouteElement /> },
              { path: '/employees/new', element: <EmployeeListRouteElement /> },
              { path: '/employees/:employeeId', element: <EmployeeListRouteElement /> },
              { path: '/employees/:employeeId/personal', element: <EmployeeListRouteElement /> },
              { path: '/employees/:employeeId/contact', element: <EmployeeListRouteElement /> },
              {
                path: '/employees/:employeeId/emergency-contacts',
                element: <EmployeeListRouteElement />,
              },
              { path: '/employees/:employeeId/job', element: <EmployeeListRouteElement /> },
              { path: '/employees/:employeeId/salary', element: <EmployeeListRouteElement /> },
              { path: '/employees/:employeeId/documents', element: <EmployeeListRouteElement /> },
              {
                path: '/employees/:employeeId/employment-history',
                element: <EmployeeListRouteElement />,
              },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.LEAVE_VIEW} />,
            children: [
              { path: '/leave', element: <LeaveMyLeaveRouteElement /> },
              { path: '/leave/my-leave', element: <LeaveMyLeaveRouteElement /> },
              { path: '/leave/requests', element: <LeaveRequestsRouteElement /> },
              { path: '/leave/calendar', element: <LeaveCalendarRouteElement /> },
              { path: '/leave/balances', element: <LeaveBalancesRouteElement /> },
              { path: '/leave/types', element: <LeaveTypesRouteElement /> },
              { path: '/leave/entitlements', element: <LeaveEntitlementsRouteElement /> },
            ],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.ATTENDANCE_VIEW} />,
            children: [
              { path: '/attendance', element: <AttendanceDashboardRouteElement /> },
              { path: '/attendance/my-records', element: <MyRecordsRouteElement /> },
              { path: '/attendance/employee-records', element: <EmployeeRecordsRouteElement /> },
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
            children: [{ path: '/reports', element: <ReportsRouteElement /> }],
          },
          {
            element: <PermissionRoute permission={PERMISSIONS.SYSTEM_ADMIN} />,
            children: [
              { path: '/administration', element: <AdministrationRouteElement /> },
              { path: '/administration/roles', element: <AdministrationRouteElement /> },
              { path: '/administration/permissions', element: <AdministrationRouteElement /> },
              { path: '/administration/audit-logs', element: <AdministrationRouteElement /> },
              { path: '/administration/settings', element: <AdministrationRouteElement /> },
            ],
          },
          {
            path: '*',
            element: <NotFoundRouteElement />,
          },
        ],
      },
    ],
  },
]);
