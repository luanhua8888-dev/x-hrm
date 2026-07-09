# HRM Workflows

## Employee Onboarding Workflow

```mermaid
flowchart TD
  Candidate[Candidate or new hire] --> EmployeeRecord[Create employee record]
  EmployeeRecord --> Personal[Capture personal details]
  Personal --> Job[Assign job, department, location, employment status]
  Job --> Reporting[Assign supervisor or reporting line]
  Reporting --> OptionalUser{Needs system access?}
  OptionalUser -->|Yes| UserAccount[Create linked user account]
  OptionalUser -->|No| Complete[Employee active without login]
  UserAccount --> Role[Assign role and permissions]
  Role --> Complete
```

## User Account and Employee Relationship

```mermaid
flowchart LR
  Employee[Employee HR record] -->|optional one-to-one link| UserAccount[User account]
  UserAccount --> Role[Role]
  Role --> Permission[Permissions]
  Employee --> Job[Job details]
  Job --> Department[Department]
  Job --> Location[Location]
```

An employee record represents a person in HR. A user account represents login access. They are intentionally separate because not every employee needs application access.

## Leave Request Workflow

```mermaid
flowchart TD
  Config[Configure leave period, leave types, work week, holidays] --> Entitlement[Grant entitlement]
  Entitlement --> Balance[Calculate employee balance]
  Balance --> Request[Employee requests leave]
  Request --> Pending[Pending approval]
  Pending --> Approved[Approved or scheduled]
  Pending --> Rejected[Rejected]
  Approved --> Taken[Taken]
  Approved --> Cancelled[Cancelled]
  Approved --> BalanceUpdate[Balance updated]
  Taken --> BalanceUpdate
```

## Leave Approval Workflow

```mermaid
stateDiagram-v2
  [*] --> PendingApproval
  PendingApproval --> Scheduled: approve future leave
  PendingApproval --> Taken: approve past/current leave
  PendingApproval --> Rejected: reject
  Scheduled --> Cancelled: cancel
  Taken --> Cancelled: admin correction
  Rejected --> [*]
  Cancelled --> [*]
  Taken --> [*]
```

## Attendance Workflow

```mermaid
flowchart TD
  Start[Employee starts work] --> PunchIn[Punch in]
  PunchIn --> Working[Work session open]
  Working --> PunchOut[Punch out]
  PunchOut --> Record[Attendance record complete]
  Record --> Review[Employee or HR review]
  Review --> Adjustment{Adjustment needed?}
  Adjustment -->|Yes| Manage[Manager or HR adjusts]
  Adjustment -->|No| Closed[Record retained]
  Manage --> Closed
```

Attendance records time presence. They are not the same as project or activity work allocation.

## Timesheet Workflow

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Submitted: submit
  Submitted --> Approved: supervisor approves
  Submitted --> Rejected: supervisor rejects
  Rejected --> Draft: employee revises
  Approved --> [*]
```

Timesheets capture work effort by period, project, and activity. They remain separate from attendance punch records.

## Recruitment Workflow

```mermaid
flowchart TD
  Need[Hiring need] --> Vacancy[Create vacancy]
  Vacancy --> Candidate[Capture candidate]
  Candidate --> Application[Create application]
  Application --> Screening[Screening]
  Screening --> Interview[Schedule interview]
  Interview --> Decision{Decision}
  Decision --> Hire[Hire]
  Decision --> Reject[Reject]
  Hire --> Employee[Create employee record]
```

## Candidate-To-Employee Workflow

```mermaid
flowchart TD
  Hired[Candidate marked hired] --> Validate[Validate required hiring data]
  Validate --> Employee[Create Employee]
  Employee --> Job[Assign job and department]
  Job --> Account{Needs login?}
  Account -->|Yes| User[Create user account]
  Account -->|No| Done[Onboarding complete]
  User --> Done
```

## Performance Review Workflow

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Activated: activate review
  Activated --> InProgress: employee or supervisor saves evaluation
  InProgress --> Completed: final rating and finalization
  Activated --> Cancelled
  InProgress --> Cancelled
  Completed --> [*]
  Cancelled --> [*]
```

KPIs are definitions, goals are target outcomes, performance reviews are evaluation events, and appraisals are finalized assessment records or cycles.
