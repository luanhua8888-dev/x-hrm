export type EntityStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type ShiftType = 'NORMAL' | 'MORNING' | 'AFTERNOON' | 'NIGHT' | 'OVERNIGHT' | 'FLEXIBLE';
export type DutyType = 'ON_SITE_DUTY' | 'ON_CALL' | 'CALL_BACK';
export type AttendanceStatus =
  | 'PRESENT'
  | 'LATE'
  | 'EARLY_LEAVE'
  | 'ABSENT'
  | 'MISSING_CHECK_IN'
  | 'MISSING_CHECK_OUT'
  | 'ON_LEAVE'
  | 'ON_DUTY';
export type AttendanceSource =
  'BIOMETRIC' | 'FACE' | 'RFID' | 'MOBILE' | 'WEB' | 'MANUAL' | 'API' | 'IMPORT';
export type ExceptionType =
  | 'MISSING_CHECK_IN'
  | 'MISSING_CHECK_OUT'
  | 'LATE'
  | 'EARLY_LEAVE'
  | 'UNSCHEDULED_ATTENDANCE'
  | 'WRONG_LOCATION'
  | 'SHIFT_CONFLICT'
  | 'EXCESSIVE_WORKING_HOURS'
  | 'INVALID_LOG_PAIR';
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ApprovalStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
export type OvertimeType = 'NORMAL_DAY' | 'WEEKEND' | 'HOLIDAY' | 'NIGHT';
export type ClosingStatus =
  'OPEN' | 'PROCESSING' | 'MANAGER_REVIEWED' | 'HR_REVIEWED' | 'LOCKED' | 'SENT_TO_PAYROLL';
export type DeviceType = 'BIOMETRIC' | 'FACE_RECOGNITION' | 'RFID' | 'MOBILE' | 'API';
export type AllowanceType =
  | 'NIGHT_SHIFT'
  | 'ON_SITE_DUTY'
  | 'ON_CALL'
  | 'CALL_BACK'
  | 'HOLIDAY_DUTY'
  | 'SPECIAL_DEPARTMENT'
  | 'SURGERY'
  | 'PROCEDURE'
  | 'OTHER';

export interface WorkforceQueryParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  branchId?: string;
  departmentId?: string;
  employeeId?: string;
  date?: string;
  month?: string;
  status?: string;
}
export interface EmployeeRef {
  id: string;
  code: string;
  name: string;
  department: string;
  position: string;
  branch: string;
  initials: string;
}
export interface ShiftTemplate {
  id: string;
  code: string;
  name: string;
  type: ShiftType;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  standardWorkingMinutes: number;
  isNightShift: boolean;
  isOvernight: boolean;
  policyName: string;
  status: EntityStatus;
}
export interface ShiftAssignment {
  id: string;
  employee: EmployeeRef;
  date: string;
  shift: ShiftTemplate;
  source: 'MANUAL' | 'ROTATION' | 'SWAP';
  version: number;
  publishedAt?: string;
}
export interface DutyAssignment {
  id: string;
  employee: EmployeeRef;
  department: string;
  type: DutyType;
  startDateTime: string;
  endDateTime: string;
  location: string;
  status: ApprovalStatus;
  parentOnCallId?: string;
}
export interface AttendanceLog {
  id: string;
  employee: EmployeeRef;
  timestamp: string;
  direction: 'IN' | 'OUT';
  source: AttendanceSource;
  device: string;
  location: string;
  ip?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
}
export interface AttendancePair {
  inLog?: AttendanceLog;
  outLog?: AttendanceLog;
  workedMinutes: number;
  status: 'PAIRED' | 'OPEN' | 'INVALID';
}
export interface AttendanceDailySummary {
  id: string;
  employee: EmployeeRef;
  date: string;
  shiftCode: string;
  checkIn?: string;
  checkOut?: string;
  workedMinutes: number;
  lateMinutes: number;
  earlyLeaveMinutes: number;
  overtimeMinutes: number;
  nightMinutes: number;
  status: AttendanceStatus;
  pairs: AttendancePair[];
  locked: boolean;
}
export interface AttendanceException {
  id: string;
  employee: EmployeeRef;
  date: string;
  shiftCode: string;
  type: ExceptionType;
  severity: Severity;
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'IGNORED';
  assignedTo: string;
  createdAt: string;
}
export interface ApprovalStep {
  id: string;
  stage: 'EMPLOYEE' | 'MANAGER' | 'HR';
  actor: string;
  status: ApprovalStatus;
  actedAt?: string;
  note?: string;
}
export interface AdjustmentRequest {
  id: string;
  employee: EmployeeRef;
  date: string;
  requestType: string;
  originalValue: string;
  requestedValue: string;
  reason: string;
  status: ApprovalStatus;
  approver: string;
  workflow: ApprovalStep[];
}
export interface OvertimeRequest {
  id: string;
  employee: EmployeeRef;
  date: string;
  shiftCode: string;
  startDateTime: string;
  endDateTime: string;
  requestedMinutes: number;
  actualMinutes?: number;
  type: OvertimeType;
  status: ApprovalStatus;
}
export interface ShiftSwapRequest {
  id: string;
  requester: EmployeeRef;
  currentShift: string;
  swapEmployee: EmployeeRef;
  targetShift: string;
  date: string;
  reason: string;
  employeeAcceptance: ApprovalStatus;
  managerApproval: ApprovalStatus;
  status: ApprovalStatus;
}
export interface AttendancePolicy {
  id: string;
  name: string;
  employeeGroup: string;
  gracePeriodMinutes: number;
  overtimePolicy: string;
  nightPolicy: string;
  status: EntityStatus;
  effectiveFrom: string;
  effectiveTo?: string;
}
export interface AttendanceDevice {
  id: string;
  name: string;
  code: string;
  type: DeviceType;
  branch: string;
  location: string;
  ipAddress: string;
  connectionStatus: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  lastSync: string;
  status: EntityStatus;
}
export interface TimesheetRecord {
  id: string;
  employee: EmployeeRef;
  month: string;
  regularMinutes: number;
  workingDays: number;
  paidLeaveDays: number;
  unpaidLeaveDays: number;
  lateMinutes: number;
  earlyLeaveMinutes: number;
  overtimeNormalMinutes: number;
  overtimeWeekendMinutes: number;
  overtimeHolidayMinutes: number;
  nightMinutes: number;
  dutySessions: number;
  status: ClosingStatus;
}
export interface ClosingPeriod {
  id: string;
  month: string;
  status: ClosingStatus;
  totalEmployees: number;
  completedTimesheets: number;
  pendingExceptions: number;
  pendingAdjustments: number;
  pendingOvertime: number;
  pendingApprovals: number;
  criticalExceptions: number;
}
export interface AllowanceRule {
  id: string;
  name: string;
  type: AllowanceType;
  employeeGroup: string;
  department: string;
  branch: string;
  dayType: 'NORMAL_DAY' | 'WEEKEND' | 'HOLIDAY';
  calculationType: 'FIXED_AMOUNT' | 'PER_HOUR' | 'PER_SHIFT' | 'PER_SESSION' | 'MULTIPLIER';
  effectiveFrom: string;
  effectiveTo?: string;
  priority: number;
  status: EntityStatus;
}

export type CreateShiftPayload = Omit<ShiftTemplate, 'id'>;
export type UpdateShiftPayload = Partial<CreateShiftPayload>;
export interface CreateAttendanceAdjustmentPayload {
  employeeId: string;
  attendanceDate: string;
  requestType: string;
  requestedCheckIn?: string;
  requestedCheckOut?: string;
  reason: string;
  attachmentId?: string;
}
