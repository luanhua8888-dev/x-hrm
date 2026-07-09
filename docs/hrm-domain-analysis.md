# HRM Domain Analysis

This document captures domain research for `hrm-web`. OrangeHRM is used as a business and workflow reference only. No OrangeHRM source code, UI, assets, branding, CSS, or implementation patterns are copied.

## Official Sources Analyzed

- OrangeHRM official GitHub repository: `orangehrm/orangehrm`, including the public module structure and README statement that OrangeHRM is a comprehensive HRM system.
- OrangeHRM Starter Help Portal: Admin User Guide and Employee User Guide.
- OrangeHRM Starter articles for user accounts, employee creation, employee job details, employee list filtering, reporting relationships, leave configuration, leave application, leave assignment, leave approval, timesheets, recruitment vacancies, and performance reviews.
- OrangeHRM open-source demo login was checked only to understand that the product is a JavaScript SPA; it was not used as a visual source.

## OrangeHRM Modules Analyzed

- Administration
- PIM / Employee Management
- Leave
- Time / Attendance / Timesheets
- Recruitment
- Performance
- Reporting
- Maintenance and configuration concepts at a high level

## Important Business Domains

- Identity and access management
- Organization structure and master data
- Employee record management
- Leave policy, entitlement, request, approval, and balance
- Attendance punch records
- Timesheet submission and approval
- Recruitment vacancy and candidate pipeline
- Performance KPI and review lifecycle
- Reporting and export-ready analytics

## Main Entities

- UserAccount
- Role
- Permission
- Employee
- EmployeeJob
- EmployeeContact
- EmergencyContact
- Dependent
- ImmigrationRecord
- EmployeeSalary
- ReportingRelationship
- EmployeeDocument
- Organization
- Department
- Location
- JobTitle
- EmploymentStatus
- JobCategory
- PayGrade
- Qualification
- LeavePeriod
- LeaveType
- WorkWeek
- Holiday
- LeaveEntitlement
- LeaveBalance
- LeaveRequest
- LeaveRequestDay
- AttendanceRecord
- Timesheet
- TimesheetEntry
- Project
- Activity
- Vacancy
- Candidate
- CandidateApplication
- Interview
- KPI
- Goal
- PerformanceReview
- Appraisal
- ReportDefinition
- ReportRun

## Entity Relationships

- A `UserAccount` may link to one `Employee`, but an `Employee` may exist without a login account.
- A `Role` aggregates `Permission` values. UI and route access should evaluate permissions, not scattered role strings.
- An `Employee` has personal, contact, emergency contact, dependent, immigration, job, salary, reporting relationship, qualification, membership, document, and employment history records.
- `EmployeeJob` references master data such as `JobTitle`, `EmploymentStatus`, `JobCategory`, `Department`, and `Location`.
- `ReportingRelationship` connects an employee to one or more supervisors or subordinates and drives manager approval responsibilities.
- `LeaveType` and `LeavePeriod` define policy. `LeaveEntitlement` grants allowance to an employee for a leave type and period. `LeaveBalance` reflects entitlement minus approved/taken leave. `LeaveRequest` consumes balance through an approval workflow.
- `AttendanceRecord` captures punch in/out and attendance history. `Timesheet` captures work allocation against project/activity entries and has a separate submission/approval lifecycle.
- `Vacancy` is opened for a job title and hiring manager. `Candidate` may have one or more `CandidateApplication` records against vacancies. A hired candidate can become an `Employee`.
- `KPI` definitions are usually associated with job titles. `PerformanceReview` references employee, reviewer, review period, KPIs, self evaluation, supervisor evaluation, and finalization data.
- `ReportDefinition` defines filters, fields, and output format. `ReportRun` represents generated report results.

## Important Screens

- Login
- Dashboard
- Admin user management
- Roles and permissions
- Organization general information
- Departments / organization units
- Locations
- Job titles
- Employment statuses
- Job categories
- Pay grades
- Qualifications
- Employee list
- Add employee
- Employee profile sections: personal, contact, emergency contacts, dependents, immigration, job, salary, report-to, qualifications, memberships, documents, employment history
- Leave configuration: leave period, leave types, work week, holidays
- Leave entitlements
- Leave balances
- Apply/request leave
- Assign leave
- My leave
- Leave request list
- Leave request details
- Leave calendar
- Attendance punch in/out
- My attendance records
- Employee attendance records
- Timesheet entry
- My timesheet
- Employee timesheets
- Timesheet approvals
- Vacancies
- Candidates
- Applications
- Interviews
- KPI management
- Goals
- Performance reviews
- Appraisals
- Reports and report builder

## Important Workflows

- Create employee record in PIM; optionally create a linked user account during or after employee creation.
- Configure organization master data before assigning job details.
- Assign job details after employee creation because job data is reused by other modules.
- Configure reporting relationships so supervisors can perform team actions.
- Configure leave period, leave types, work week, and holidays before employees request leave.
- Grant leave entitlement before leave balance can be consumed.
- Employee applies for leave; supervisor or administrator approves, rejects, or cancels.
- Admin can assign leave on behalf of an employee.
- Employees record attendance via punch in/out; managers or HR review attendance records.
- Employees submit timesheets; supervisors approve or reject subordinate timesheets.
- Recruiter creates a vacancy, tracks candidates and applications, schedules interviews, and records hire or reject decisions.
- Hired candidates can become employees through onboarding.
- Admin configures KPIs by job title, creates performance reviews, activates them, employees perform self evaluation, supervisors evaluate, then reviews are finalized.

## Important Statuses

- User status: `ACTIVE`, `INACTIVE`, `LOCKED`
- Employee status: `ACTIVE`, `TERMINATED`, `ON_LEAVE`, `PROBATION`
- Leave request status: `DRAFT`, `PENDING_APPROVAL`, `SCHEDULED`, `TAKEN`, `REJECTED`, `CANCELLED`
- Leave day duration: `FULL_DAY`, `HALF_DAY_MORNING`, `HALF_DAY_AFTERNOON`, `SPECIFIC_TIME`
- Attendance status: `PUNCHED_IN`, `PUNCHED_OUT`, `MISSING_PUNCH`, `ADJUSTED`
- Timesheet status: `DRAFT`, `SUBMITTED`, `APPROVED`, `REJECTED`
- Vacancy status: `ACTIVE`, `INACTIVE`, `CLOSED`
- Application status: `APPLIED`, `SCREENING`, `INTERVIEW_SCHEDULED`, `INTERVIEW_PASSED`, `OFFERED`, `HIRED`, `REJECTED`
- Review status: `DRAFT`, `ACTIVATED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`

## Approval Flows

- Leave approval is driven by manager/supervisor or HR/admin permissions. Supervisors should normally see subordinate requests; HR/admin can see broader organization scope.
- Timesheet approval is separate from attendance approval and is normally supervisor-driven.
- Performance reviews include employee self evaluation and supervisor evaluation before finalization.
- Recruitment decisions pass through screening, interview, decision, hire/reject states.

## Role / Permission Observations

- OrangeHRM distinguishes Admin and ESS style access. This project will generalize that into permission-based authorization.
- Employee self-service permissions should allow employees to manage their own profile sections and own leave/time records without granting HR-level access.
- Supervisor permissions are contextual: supervisors can view or approve subordinate leave, timesheets, and performance reviews.
- HR/admin permissions are broader and configuration-oriented.

## Concepts Retained For This Project

- User and Employee are separate entities.
- Permission-based access control.
- Organization master data before employee job assignment.
- Employee profile split into focused sections.
- Leave configuration before leave usage.
- Leave entitlement, balance, request, and approval as distinct concepts.
- Attendance and timesheets as separate domains.
- Vacancy-to-candidate-to-application recruitment pipeline.
- KPI definitions separate from goals, reviews, and appraisals.
- Reporting as configurable filtered outputs, not just static tables.

## Concepts Intentionally Simplified

- Starter foundation implements representative routes and service/query architecture, not every detailed form.
- Payroll, benefits, advanced compensation, LDAP, social authentication, and corporate branding are deferred.
- Leave balance calculations are backend-dependent and are not simulated in frontend services.
- Timesheet project/activity details are modeled but not fully implemented in UI.
- Performance trackers are acknowledged but deferred behind the broader performance module.

## Concepts Intentionally Not Copied

- OrangeHRM PHP, Vue, Twig, SCSS, CSS, and database implementation.
- OrangeHRM visual design, branding, logos, icons, exact text, and page layouts.
- OrangeHRM route names and internal API contracts.
- Legacy implementation decisions that do not fit a modern React frontend.
