# Hospital HRM MVP Design

**Ngày:** 2026-09-03  
**Trạng thái:** Đã thống nhất trong phiên thiết kế, chờ duyệt tài liệu  
**Phạm vi:** Organization → Employee → Contract & Probation → Leave → Schedule & Attendance → Timesheet

## 1. Mục tiêu và phạm vi

Xây dựng HRM cho một bệnh viện khoảng 30.000 nhân viên, sẵn sàng mở rộng trên 30.000 nhân viên và nhiều bệnh viện. MVP phục vụ nhân viên self-service, quản lý trực tiếp, HR và quản trị viên.

MVP phải hoàn chỉnh các hành trình:

1. Cấu hình tổ chức và phân công nhân viên.
2. Onboard, cấp tài khoản và ký hợp đồng thử việc.
3. Nhân viên tự đánh giá, quản lý đánh giá, HR phê duyệt và xử lý hợp đồng tiếp theo.
4. Xin phép, phê duyệt và cập nhật ngày công.
5. Phân ca, nhận log, tính công, xử lý ngoại lệ và chốt bảng công.

Payroll engine, tuyển dụng end-to-end, đánh giá định kỳ ngoài thử việc, mobile native và BI nâng cao không thuộc MVP. Timesheet chỉ xuất dữ liệu đầu vào có phiên bản cho payroll.

## 2. Nguyên tắc

- Mỗi dữ liệu có một domain làm nguồn sự thật duy nhất.
- Thay đổi tổ chức, hợp đồng, phân công và policy có ngày hiệu lực và lịch sử; không ghi đè quá khứ.
- Backend thực thi quyền; frontend chỉ hỗ trợ điều hướng và trải nghiệm.
- Raw attendance log, audit log, hợp đồng đã ký và payroll export là bất biến.
- Kết quả tính công truy được schedule version và policy version.
- Domain giao tiếp qua event/outbox, không ghi trực tiếp vào bảng của nhau.
- Multi-tenant từ đầu, vận hành ban đầu với một tenant và một bệnh viện.
- Không dùng microservices toàn phần khi chưa có nhu cầu đo được.

## 3. Nghiệp vụ lõi

### 3.1. Organization và Employee

- Quản lý tenant, bệnh viện, cơ sở, khoa/phòng và chức danh.
- Hồ sơ nhân viên tách khỏi tài khoản đăng nhập nhưng onboarding bắt buộc tạo cả hai và liên kết 1–1.
- Một nhân viên có một `PrimaryAssignment` xác định hợp đồng, quản lý và payroll chính; có thể có nhiều `SecondaryAssignment` để kiêm nhiệm hoặc trực hỗ trợ.
- Mỗi phân công có bệnh viện, khoa/phòng, chức danh, quản lý, tỷ lệ công việc và khoảng hiệu lực.
- Không cho tạo ca trùng giờ giữa các phân công.
- Quản lý bằng cấp, chứng chỉ hành nghề, chuyên khoa, ngày hiệu lực và ngày hết hạn. Chứng chỉ không hợp lệ chặn phân lịch vào vị trí yêu cầu.

Trạng thái tài khoản: `PENDING_ACTIVATION`, `ACTIVE`, `SUSPENDED`, `LOCKED`, `DISABLED`.

Trạng thái việc làm: `ONBOARDING`, `PROBATION`, `PROBATION_EXTENDED`, `ACTIVE`, `TERMINATED`.

### 3.2. Onboarding và hợp đồng thử việc

```text
DRAFT
→ WAITING_FOR_DOCUMENTS
→ CONTRACT_PREPARATION
→ PENDING_SIGNATURE
→ READY_TO_START
→ IN_PROGRESS
→ COMPLETED
```

- HR tạo hồ sơ, tài khoản, phân công chính và hợp đồng thử việc.
- Hợp đồng phải đủ chữ ký trước ngày hiệu lực.
- Đến ngày hiệu lực, employment chuyển `PROBATION` và tài khoản được kích hoạt theo chính sách.
- Onboarding chỉ hoàn tất khi đủ hồ sơ, hợp đồng đã ký, tài khoản đã kích hoạt, phân công và lịch làm việc đã có.
- Nếu đến ngày nhận việc mà hợp đồng chưa ký, hệ thống không kích hoạt employment và cảnh báo HR.

### 3.3. Đánh giá thử việc

```text
PROBATION
→ WAITING_EMPLOYEE_SELF_REVIEW
→ WAITING_MANAGER_REVIEW
→ WAITING_HR_APPROVAL
├─ PASSED   → OFFICIAL_CONTRACT_PREPARATION
├─ EXTENDED → PROBATION_EXTENSION
└─ FAILED   → EMPLOYMENT_TERMINATION
```

- Hệ thống mở kỳ đánh giá và nhắc trước ngày kết thúc thử việc.
- Nhân viên có một bản tự đánh giá chính cho mỗi kỳ, được lưu nháp trước khi gửi.
- Sau khi gửi, bản đánh giá bị khóa; quản lý chỉ có thể trả lại kèm lý do.
- Quản lý chấm theo tiêu chí, nhận xét và đề xuất `PASSED`, `EXTENDED` hoặc `FAILED`.
- HR phê duyệt kết luận cuối và làm thủ tục hợp đồng.
- `PASSED` chưa chuyển nhân viên sang `ACTIVE`. Chỉ hợp đồng chính thức đủ chữ ký và đến ngày hiệu lực mới thực hiện chuyển trạng thái.
- Gia hạn bắt buộc có căn cứ, thời hạn mới và tài liệu hợp lệ theo chính sách/pháp luật.

### 3.4. Quản lý hợp đồng

Loại hợp đồng: `PROBATION`, `FIXED_TERM`, `INDEFINITE` và loại bổ sung đã được pháp chế duyệt.

```text
DRAFT → PENDING_APPROVAL → PENDING_SIGNATURE
→ PARTIALLY_SIGNED → SIGNED → ACTIVE
→ EXPIRED | TERMINATED
```

Phương thức ký:

- `ELECTRONIC`: tích hợp nhà cung cấp chữ ký số được cấp phép; lưu transaction ID, bằng chứng xác thực, timestamp, hash và PDF hoàn tất.
- `PAPER`: HR tải bản scan, nhập ngày ký và xác nhận người ký.
- `HYBRID`: chỉ hoàn tất khi đủ bằng chứng của các bên.

Nội dung bị khóa khi bắt đầu ký. Thay đổi phải hủy quy trình hiện tại và phát hành phiên bản mới. HRM không lưu private key. Nền tảng tự quản lý mẫu, phiên bản, phê duyệt và audit; chứng thực được tích hợp qua `DigitalSignatureProvider`.

### 3.5. Leave

- Quản lý leave type, policy, entitlement, balance và request.
- Hỗ trợ phép theo ngày, nửa ngày hoặc giờ tùy policy.
- Nhân viên tạo/hủy; quản lý duyệt trong phạm vi; HR xử lý ngoại lệ.
- Người tạo không được tự duyệt.
- `LeaveApproved` yêu cầu Schedule và Attendance tính lại đúng nhân viên/ngày bị ảnh hưởng.

### 3.6. Schedule và Attendance

- Quản lý mẫu ca, ca qua đêm, trực/on-call, OT, lịch và phiên bản lịch công bố.
- Khi phân lịch, kiểm tra chứng chỉ, phân công, phép, xung đột, thời gian nghỉ tối thiểu và giới hạn OT.
- Thiết bị được xác thực riêng và gửi log tới ingestion endpoint.
- Raw log chỉ thêm mới, có khóa chống trùng và chịu được đồng bộ lại sau mất mạng.
- Worker ghép log và tạo daily attendance; dữ liệu lỗi vào dead-letter queue.
- Thay đổi lịch, phép hoặc adjustment chỉ tính lại phạm vi ảnh hưởng.
- Adjustment phải qua phê duyệt và audit.

### 3.7. Timesheet

```text
OPEN → REVIEWING → APPROVED → LOCKED
```

- Tổng hợp Attendance, Leave, Duty và OT theo kỳ.
- Nhân viên xem, quản lý rà soát, HR phê duyệt và chốt.
- Không chốt khi còn blocking exception.
- Kỳ khóa là bất biến. Mở lại cần quyền riêng, lý do, step-up authentication và audit.
- `TimesheetLocked` tạo payroll export có version và hash.
- Batch closing có checkpoint; lỗi một nhân viên không làm hỏng cả kỳ.

## 4. Multi-tenancy

```text
Platform
└── Tenant / Hospital Group
    └── Hospital
        └── Location
            └── Department
```

- `Tenant` là ranh giới dữ liệu của một khách hàng/tập đoàn; hiện tại là HIU.
- Bảng nghiệp vụ có `tenant_id`; dữ liệu phụ thuộc bệnh viện có `hospital_id`.
- Tenant context lấy từ phiên đăng nhập, không lấy từ request body.
- Foreign key, index, cache key, object path, background job và message giữ tenant context.
- PostgreSQL Row-Level Security là lớp phòng vệ bổ sung.
- Cấu hình bệnh viện gồm múi giờ, ngày lễ, policy, mẫu hợp đồng, approval flow, thiết bị, chữ ký, payroll và branding.
- Tenant cần cô lập cao có thể chuyển sang database riêng qua `TenantResolver` mà không đổi domain API.

## 5. Kiến trúc kỹ thuật

```text
React Web/PWA
      ↓ HTTPS
WAF / Load Balancer
      ↓
Core HR API (stateless, scale ngang)
      ↓
PostgreSQL HA + Private Object Storage
      ↓ Transactional Outbox
Message Broker / Workers
├─ Attendance Ingestion & Calculation
├─ Document & Signature
├─ Notification
└─ Reporting Projection
```

Core backend là modular monolith gồm Identity, Organization, Employee, Contract, Probation Review, Leave, Schedule, Attendance, Timesheet, Document, Notification và Audit. Attendance workload và reporting projection được tách sớm để scale độc lập; chỉ tách thêm service khi tải hoặc ranh giới đội ngũ chứng minh nhu cầu.

- PostgreSQL primary/standby, connection pooling và point-in-time recovery.
- Partition raw attendance, audit và notification theo thời gian.
- Read replica hoặc projection cho báo cáo; dashboard không chạy truy vấn nặng trên transaction tables.
- Object storage riêng tư lưu file; database lưu metadata, version, hash và quyền.
- Outbox bảo đảm event đi cùng giao dịch đã commit; consumer idempotent, retry giới hạn và có dead-letter queue.
- Redis chỉ dùng cho rate limit/cache/coordination khi có nhu cầu đo được; không là nguồn sự thật.
- REST + OpenAPI; CQRS chỉ dùng cho read model tổng hợp.
- Optimistic concurrency bằng `version`.

Frontend giữ React 19, TypeScript, Vite, TanStack Query, React Hook Form và Zod; tổ chức theo feature/domain, lazy-load theo route. Zustand chỉ giữ auth và UI preference. API client phải typed theo OpenAPI hoặc được kiểm tra tương đương trong CI.

## 6. API conventions

API version tại `/api/v1`, chia theo organizations, employees, contracts, probation-reviews, leave-requests, shifts, schedules, attendance, timesheets, documents, signatures và audit-events.

- Error thống nhất: `code`, `message`, `fieldErrors`, `traceId`.
- Cursor pagination cho raw log/audit; page-number cho danh mục nhỏ.
- Idempotency key cho tạo hợp đồng, ký, webhook và import log.
- Chuyển trạng thái qua action rõ nghĩa như `submit`, `approve`, `reject`, `sign`, `publish`, `lock`; client không cập nhật state machine tùy ý.
- Provider callback kiểm tra chữ ký webhook, timestamp, nonce và chống replay.
- Request có correlation ID và tenant/data scope lấy từ danh tính đã xác thực.

## 7. Bảo mật và quyền riêng tư

- MFA bắt buộc cho HR, quản lý, admin và người ký; ưu tiên passkey/WebAuthn hoặc SSO.
- Mật khẩu băm Argon2id; access token ngắn hạn, refresh token xoay vòng và thu hồi được.
- RBAC kết hợp data scope: self, assignment, hospital, tenant.
- Field-level authorization cho lương, định danh, ngân hàng, sức khỏe và tài liệu.
- Step-up authentication cho ký, mở kỳ công, export hàng loạt và đổi quyền.
- HTTPS/HSTS, secure cookies; mã hóa database, backup, object storage và trường nhạy cảm.
- Khóa/secret trong KMS/Vault, không nằm trong source hoặc frontend.
- Upload kiểm tra kích thước, MIME thật và malware; download qua signed URL ngắn hạn sau authorization.
- Mỗi tài liệu có SHA-256; tài liệu đã ký không ghi đè.
- Audit bất biến cho truy cập/xuất dữ liệu nhạy cảm, hợp đồng, lương, trạng thái việc làm, approval, closing, quyền và cấu hình.
- Log không chứa mật khẩu, token, private key hoặc đầy đủ dữ liệu định danh nhạy cảm.
- Có data inventory, mục đích xử lý, retention, xóa/ẩn danh, yêu cầu chủ thể và đánh giá tác động dữ liệu.
- Pháp chế đối chiếu Luật 91/2025/QH15, Nghị định 356/2025/NĐ-CP và quy định hợp đồng lao động điện tử hiện hành.
- OWASP ASVS 5.0 Level 2 là baseline; luồng admin, chữ ký và dữ liệu đặc biệt nhạy cảm dùng kiểm soát tăng cường.

## 8. Observability và reliability

- OpenTelemetry cung cấp trace, metric và structured log có correlation.
- SLI: availability, API latency/error, ingestion lag, calculation lag, queue depth, signing failure và closing duration.
- Mục tiêu đầu: uptime 99,9%; API thường p95 < 500 ms; ingestion p95 < 300 ms; log xuất hiện trong bảng công sơ bộ trong 1–5 phút.
- RPO ≤ 15 phút, RTO ≤ 1 giờ; hợp đồng và raw attendance dùng mức bền vững cao hơn khi hạ tầng cho phép.
- Backup mã hóa, restore drill định kỳ; dev/staging/production tách biệt và dev không dùng dữ liệu thật.
- CI/CD có SAST, dependency scan, secret scan, migration checks và rollback.

## 9. Xử lý lỗi

- Không phát hành hợp đồng thiếu dữ liệu.
- Ký lỗi giữ trạng thái hợp lệ trước và retry an toàn.
- Notification lỗi không rollback nghiệp vụ.
- Không cho tự duyệt hoặc vượt data scope.
- Mọi override cần lý do, quyền riêng và audit.
- Batch cô lập lỗi theo item và tiếp tục từ checkpoint.

## 10. Kiểm thử

- Unit test cho state machine, policy, quyền, hợp đồng, phép và tính công.
- Integration test với PostgreSQL thật.
- Authorization matrix và field-level tests; tenant isolation là quality gate.
- Contract test frontend/backend và HRM/signature provider.
- E2E cho onboarding, hợp đồng thử việc, đánh giá, hợp đồng chính thức, phép, chấm công, adjustment, closing và đa bệnh viện.
- Load test tối thiểu 60.000 nhân viên, đặc biệt burst đầu/cuối ca và closing.
- Security test theo ASVS và penetration test trước production.
- Test webhook trùng/sai thứ tự, worker restart, thiết bị offline và restore backup.

## 11. Thứ tự phát hành

1. Tenant, identity, authorization, audit và observability.
2. Organization, Employee, Assignment và professional credentials.
3. Onboarding, account provisioning, contract/document và ký giấy.
4. Probation review và chuyển tiếp hợp đồng chính thức.
5. Leave policy, entitlement, request và approval.
6. Shift, schedule, kiểm tra đa phân công và công bố lịch.
7. Attendance ingestion, calculation, exception và adjustment.
8. Timesheet review, closing và payroll export.
9. External digital-signature provider và production hardening.

Ký giấy hoàn thiện trước để không chặn nghiệp vụ. Interface chữ ký được định nghĩa cùng Contract; tích hợp CA thực hiện sau khi chọn nhà cung cấp và pháp chế duyệt.

## 12. Tiêu chí hoàn thành MVP

- HR onboard được nhân viên, tạo tài khoản bắt buộc và hợp đồng thử việc.
- Hợp đồng hỗ trợ giấy, điện tử hoặc kết hợp và chỉ có hiệu lực khi đủ điều kiện.
- Nhân viên tự đánh giá, quản lý đánh giá, HR phê duyệt và hệ thống tạo đúng luồng tiếp theo.
- Employee chỉ chuyển `ACTIVE` sau khi hợp đồng chính thức đủ chữ ký và đến ngày hiệu lực.
- Cơ cấu/phân công bảo toàn lịch sử, hỗ trợ một phân công chính và nhiều phân công phụ.
- Chứng chỉ hết hạn chặn phân lịch vào vị trí yêu cầu.
- Phép đã duyệt tác động đúng Schedule/Attendance/Timesheet.
- Raw log không trùng/mất khi gửi lại và truy vết được.
- Kết quả công giải thích được bằng input, schedule version và policy version.
- Closing tạo snapshot và payroll export bất biến.
- Không truy cập chéo tenant, hospital hoặc data scope.
- Audit trả lời được ai làm, khi nào, dữ liệu trước/sau và lý do.
- Đạt SLO, load test 60.000 nhân viên, ASVS gate và restore test.

## 13. Rủi ro và quyết định hoãn

- Nội dung pháp lý phải được pháp chế duyệt và template/policy phải có version.
- Ingestion phải chịu được thiết bị không đồng đều và dữ liệu đến muộn.
- Microservices toàn phần, Kubernetes, Kafka, event sourcing và payroll engine chưa thuộc MVP.
- Nhà cung cấp chữ ký chưa được chọn; domain chỉ phụ thuộc interface.
- Retention chi tiết, số thiết bị và tải burst thực tế phải được thu thập trước production sizing.
