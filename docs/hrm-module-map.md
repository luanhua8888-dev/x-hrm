# HRM Module Map

## Dashboard

Purpose:
Provide an operational HR overview and quick entry points.

Routes:

- `/dashboard`

Entities:

- DashboardMetric
- DashboardTrend

Actions:

- View workforce summary
- View pending approval counts
- Navigate to common workflows

Permissions:

- `DASHBOARD_VIEW`

## Organization

Purpose:
Manage company structure and job master data.

Routes:

- `/organization`
- `/organization/company`
- `/organization/departments`
- `/organization/locations`
- `/organization/job-titles`

Entities:

- Organization
- Department
- Location
- JobTitle
- EmploymentStatus
- JobCategory
- PayGrade

Actions:

- View organization configuration
- Manage company details
- Manage departments
- Manage locations
- Manage job titles

Permissions:

- `ORGANIZATION_VIEW`
- `ORGANIZATION_MANAGE`

## Users

Purpose:
Manage application login accounts, roles, and account status.

Routes:

- `/users`
- `/users/new`
- `/users/:userId`

Entities:

- UserAccount
- Role
- Permission
- Employee

Actions:

- View users
- Create user
- Update user
- Disable user
- Link user to employee

Permissions:

- `USER_VIEW`
- `USER_CREATE`
- `USER_UPDATE`
- `USER_DELETE`
- `ROLE_VIEW`
- `ROLE_MANAGE`

## Employees

Purpose:
Manage employee HR records independently from application user accounts.

Routes:

- `/employees`
- `/employees/new`
- `/employees/:employeeId`
- `/employees/:employeeId/personal`
- `/employees/:employeeId/contact`
- `/employees/:employeeId/emergency-contacts`
- `/employees/:employeeId/job`
- `/employees/:employeeId/salary`
- `/employees/:employeeId/documents`
- `/employees/:employeeId/employment-history`

Entities:

- Employee
- EmployeeJob
- EmployeeSalary
- EmployeeDocument
- EmergencyContact
- ReportingRelationship
- EmploymentHistory

Actions:

- View employee
- Create employee
- Update personal information
- Update job information
- Manage salary information
- Manage documents
- Manage employment history

Permissions:

- `EMPLOYEE_VIEW`
- `EMPLOYEE_CREATE`
- `EMPLOYEE_UPDATE`
- `EMPLOYEE_DELETE`
- `EMPLOYEE_DOCUMENT_MANAGE`

## Leave

Purpose:
Manage leave policy, entitlement, balance, requests, and approvals.

Routes:

- `/leave`
- `/leave/my-leave`
- `/leave/requests`
- `/leave/calendar`
- `/leave/balances`
- `/leave/types`
- `/leave/entitlements`

Entities:

- LeavePeriod
- LeaveType
- WorkWeek
- Holiday
- LeaveEntitlement
- LeaveBalance
- LeaveRequest

Actions:

- Request leave
- Assign leave
- Approve leave
- Reject leave
- Cancel leave
- Configure leave types
- Manage entitlements

Permissions:

- `LEAVE_VIEW`
- `LEAVE_REQUEST`
- `LEAVE_APPROVE`
- `LEAVE_CONFIGURE`

## Attendance

Purpose:
Manage punch records and attendance review.

Routes:

- `/attendance`
- `/attendance/my-records`
- `/attendance/employee-records`

Entities:

- AttendanceRecord
- AttendanceAdjustment

Actions:

- Punch in
- Punch out
- View own attendance
- View employee attendance
- Manage attendance adjustments

Permissions:

- `ATTENDANCE_VIEW`
- `ATTENDANCE_MANAGE`

## Timesheets

Purpose:
Manage submitted work logs separately from attendance punch records.

Routes:

- `/timesheets`
- `/timesheets/my-timesheet`
- `/timesheets/employee-timesheets`
- `/timesheets/approvals`

Entities:

- Timesheet
- TimesheetEntry
- Project
- Activity

Actions:

- View timesheet
- Edit draft timesheet
- Submit timesheet
- Approve timesheet
- Reject timesheet

Permissions:

- `TIMESHEET_VIEW`
- `TIMESHEET_SUBMIT`
- `TIMESHEET_APPROVE`

## Recruitment

Purpose:
Manage vacancies, candidates, applications, interviews, and hiring decisions.

Routes:

- `/recruitment`
- `/recruitment/vacancies`
- `/recruitment/vacancies/:vacancyId`
- `/recruitment/candidates`
- `/recruitment/candidates/:candidateId`
- `/recruitment/applications`
- `/recruitment/interviews`

Entities:

- Vacancy
- Candidate
- CandidateApplication
- Interview

Actions:

- Create vacancy
- Manage candidate profile
- Move application through pipeline
- Schedule interview
- Hire candidate
- Reject candidate

Permissions:

- `RECRUITMENT_VIEW`
- `RECRUITMENT_MANAGE`

## Performance

Purpose:
Manage KPIs, goals, performance reviews, and appraisals.

Routes:

- `/performance`
- `/performance/kpis`
- `/performance/goals`
- `/performance/reviews`
- `/performance/appraisals`

Entities:

- KPI
- Goal
- PerformanceReview
- Appraisal

Actions:

- Configure KPIs
- Manage goals
- Create review
- Complete self evaluation
- Complete supervisor evaluation
- Finalize appraisal

Permissions:

- `PERFORMANCE_VIEW`
- `PERFORMANCE_MANAGE`

## Reports

Purpose:
Provide filtered, export-ready HR reporting.

Routes:

- `/reports`

Entities:

- ReportDefinition
- ReportFilter
- ReportRun

Actions:

- View reports
- Configure filters
- Select display fields
- Export report
- Save criteria

Permissions:

- `REPORT_VIEW`

## Administration

Purpose:
Manage roles, permissions, audit logs, and system settings.

Routes:

- `/administration`
- `/administration/roles`
- `/administration/permissions`
- `/administration/audit-logs`
- `/administration/settings`

Entities:

- Role
- Permission
- AuditLog
- SystemSetting

Actions:

- Manage roles
- Manage permissions
- View audit logs
- Manage settings

Permissions:

- `SYSTEM_ADMIN`
- `ROLE_VIEW`
- `ROLE_MANAGE`
