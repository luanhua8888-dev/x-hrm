# Hospital HRM Delivery Roadmap

**Spec:** `docs/superpowers/specs/2026-09-03-hospital-hrm-mvp-design.md`

The approved spec spans independently reviewable subsystems. Implement it as the following plans, in order. Each plan must leave the product runnable and tested.

1. **Backend foundation:** .NET solution, API conventions, tenant context, PostgreSQL wiring, audit primitives, health checks, OpenTelemetry, CI gates.
2. **Organization and employees:** hospitals, locations, departments, job titles, employee records, effective-dated assignments and professional credentials.
3. **Identity and authorization:** mandatory account provisioning, SSO/password entry points, MFA policy, RBAC, data scope and field-level authorization.
4. **Contracts and onboarding:** onboarding checklist, versioned contracts, private documents, paper-signing flow and account activation.
5. **Probation review:** employee self-review, manager review, HR approval, extension/failure outcomes and official-contract transition.
6. **Leave:** policies, entitlements, balances, requests, approval and recalculation events.
7. **Scheduling:** shifts, duties, multi-assignment conflicts, credential validation and schedule publication.
8. **Attendance:** device identity, idempotent ingestion, raw logs, calculation, exceptions, adjustments and dead-letter recovery.
9. **Timesheets:** aggregation, review, closing, immutable snapshots and payroll export.
10. **Digital signature:** provider-neutral contract, one licensed CA adapter, signed callbacks, replay protection and hybrid signing.
11. **Production hardening:** tenant isolation test suite, 60,000-employee load test, backup restore drill, ASVS verification and operational runbooks.

Do not start a later plan until the preceding plan's public interfaces and acceptance tests pass. Split deployment only when measured load or team ownership requires it.

