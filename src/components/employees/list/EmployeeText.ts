export const employeeText = {
  all: ['Tất cả', 'All'],
  active: ['Hoạt động', 'Active'],
  probation: ['Thử việc', 'Probation'],
  onLeave: ['Nghỉ phép', 'On leave'],
  terminated: ['Nghỉ việc', 'Terminated'],
  male: ['Nam', 'Male'],
  female: ['Nữ', 'Female'],
  otherGender: ['Khác', 'Other'],
  single: ['Độc thân', 'Single'],
  married: ['Đã kết hôn', 'Married'],
  divorced: ['Ly hôn', 'Divorced'],
  widowed: ['Góa', 'Widowed'],
  fullTime: ['Toàn thời gian', 'Full time'],
  partTime: ['Bán thời gian', 'Part time'],
  contract: ['Hợp đồng', 'Contract'],
  intern: ['Thực tập', 'Intern'],
  permanent: ['Không thời hạn', 'Permanent'],
  fixedTerm: ['Xác định thời hạn', 'Fixed term'],
  temporary: ['Tạm thời', 'Temporary'],
  actions: ['Thao tác', 'Actions'],
  viewDetail: ['Xem chi tiết', 'View detail'],
  delete: ['Xóa', 'Delete'],
  emptyValue: ['-', '-'],
  searchPlaceholder: ['Tìm nhân viên...', 'Search employees...'],
  pageTitle: ['Nhân viên', 'Employees'],
  pageDescription: [
    'Hồ sơ nhân viên và phân bổ tổ chức theo từng cột dữ liệu.',
    'Employee profiles and organizational assignments by column.',
  ],
  totalEmployees: ['Tổng hồ sơ', 'Total records'],
  currentPage: ['Trang hiện tại', 'Current page'],
  activeEmployees: ['Đang hoạt động', 'Active'],
  leaveEmployees: ['Đang nghỉ', 'On leave'],
  probationEmployees: ['Thử việc', 'Probation'],
  emptyTitle: ['Chưa có dữ liệu nhân viên', 'Employee list is empty'],
  emptyDescription: [
    'Kết nối API nhân viên và hiển thị danh sách nhiều cột ở đây.',
    'Connect the employee API and render the wide table here.',
  ],
  columns: {
    employeeNumber: ['Mã NV', 'Employee No.'],
    firstName: ['Tên', 'First name'],
    middleName: ['Tên đệm', 'Middle name'],
    lastName: ['Họ', 'Last name'],
    preferredName: ['Tên gọi', 'Preferred name'],
    email: ['Email', 'Email'],
    phone: ['Số điện thoại', 'Phone'],
    gender: ['Giới tính', 'Gender'],
    dateOfBirth: ['Ngày sinh', 'Date of birth'],
    nationalId: ['CCCD', 'National ID'],
    workType: ['Loại công việc', 'Work type'],
    employmentType: ['Loại hợp đồng', 'Employment type'],
    contractEndDate: ['Ngày hết hạn HĐ', 'Contract end'],
    maritalStatus: ['Tình trạng hôn nhân', 'Marital status'],
    address: ['Địa chỉ', 'Address'],
    status: ['Trạng thái', 'Status'],
    jobTitle: ['Chức danh', 'Job title'],
    department: ['Phòng ban', 'Department'],
    location: ['Địa điểm', 'Location'],
    supervisor: ['Quản lý', 'Supervisor'],
    joinedDate: ['Ngày vào', 'Joined date'],
  },
} as const;

export type EmployeeTextKey = Exclude<keyof typeof employeeText, 'columns'>;
export type EmployeeColumnKey = keyof typeof employeeText.columns;

export function getEmployeeText(locale: string, key: EmployeeTextKey) {
  return employeeText[key][locale === 'en' ? 1 : 0];
}

export function getEmployeeColumnText(locale: string, key: EmployeeColumnKey) {
  return employeeText.columns[key][locale === 'en' ? 1 : 0];
}

export function getEmployeeStatusText(locale: string, status?: string) {
  let key: EmployeeTextKey = 'emptyValue';

  if (status === 'ACTIVE') key = 'active';
  else if (status === 'ON_LEAVE') key = 'onLeave';
  else if (status === 'PROBATION') key = 'probation';
  else if (status === 'TERMINATED') key = 'terminated';

  return getEmployeeText(locale, key);
}

export function getEmployeeMetaText(locale: string, value?: string) {
  if (value === 'MALE') return getEmployeeText(locale, 'male');
  if (value === 'FEMALE') return getEmployeeText(locale, 'female');
  if (value === 'OTHER') return getEmployeeText(locale, 'otherGender');
  if (value === 'SINGLE') return getEmployeeText(locale, 'single');
  if (value === 'MARRIED') return getEmployeeText(locale, 'married');
  if (value === 'DIVORCED') return getEmployeeText(locale, 'divorced');
  if (value === 'WIDOWED') return getEmployeeText(locale, 'widowed');
  if (value === 'FULL_TIME') return getEmployeeText(locale, 'fullTime');
  if (value === 'PART_TIME') return getEmployeeText(locale, 'partTime');
  if (value === 'CONTRACT') return getEmployeeText(locale, 'contract');
  if (value === 'INTERN') return getEmployeeText(locale, 'intern');
  if (value === 'PERMANENT') return getEmployeeText(locale, 'permanent');
  if (value === 'FIXED_TERM') return getEmployeeText(locale, 'fixedTerm');
  if (value === 'TEMPORARY') return getEmployeeText(locale, 'temporary');
  return getEmployeeText(locale, 'emptyValue');
}
