export type LeaveTypeGroupId =
  'balance' | 'personal-paid' | 'personal-unpaid' | 'benefit' | 'company';

export interface LeaveTypeDefinition {
  id: string;
  name: string;
  groupId: LeaveTypeGroupId;
  description: string;
  requiresApproval: boolean;
  requiresDocument?: boolean;
  usesBalance?: boolean;
}

export interface LeaveTypeGroup {
  id: LeaveTypeGroupId;
  name: string;
  description: string;
  types: LeaveTypeDefinition[];
}

const leaveTypeGroups: LeaveTypeGroup[] = [
  {
    id: 'balance',
    name: 'Phép có số dư',
    description: 'Được kiểm tra và khấu trừ từ số dư phép của bạn.',
    types: [
      {
        id: 'annual',
        name: 'Phép năm',
        groupId: 'balance',
        description: 'Sử dụng số ngày phép năm còn lại.',
        requiresApproval: true,
        usesBalance: true,
      },
      {
        id: 'compensatory',
        name: 'Nghỉ bù',
        groupId: 'balance',
        description: 'Sử dụng số giờ hoặc ngày nghỉ bù đã được xác nhận.',
        requiresApproval: true,
        usesBalance: true,
      },
    ],
  },
  {
    id: 'personal-paid',
    name: 'Việc riêng hưởng lương',
    description: 'Theo chính sách và quy định lao động áp dụng.',
    types: [
      {
        id: 'own-marriage',
        name: 'Kết hôn',
        groupId: 'personal-paid',
        description: 'Nghỉ việc riêng hưởng lương khi bản thân kết hôn.',
        requiresApproval: false,
      },
      {
        id: 'child-marriage',
        name: 'Con kết hôn',
        groupId: 'personal-paid',
        description: 'Nghỉ việc riêng hưởng lương khi con kết hôn.',
        requiresApproval: false,
      },
      {
        id: 'family-bereavement',
        name: 'Tang thân nhân',
        groupId: 'personal-paid',
        description: 'Nghỉ việc riêng hưởng lương đối với thân nhân thuộc diện áp dụng.',
        requiresApproval: false,
      },
    ],
  },
  {
    id: 'personal-unpaid',
    name: 'Việc riêng không hưởng lương',
    description: 'Không khấu trừ phép năm; yêu cầu được kiểm tra theo chính sách.',
    types: [
      {
        id: 'family-event-unpaid',
        name: 'Sự kiện gia đình',
        groupId: 'personal-unpaid',
        description: 'Việc riêng trong nhóm thân nhân hoặc sự kiện gia đình.',
        requiresApproval: false,
      },
      {
        id: 'unpaid-personal',
        name: 'Nghỉ không lương',
        groupId: 'personal-unpaid',
        description: 'Nghỉ vì lý do cá nhân theo thỏa thuận với đơn vị.',
        requiresApproval: true,
      },
    ],
  },
  {
    id: 'benefit',
    name: 'Nghỉ chế độ / BHXH',
    description: 'Cần chứng từ để HR xử lý theo chế độ phù hợp.',
    types: [
      {
        id: 'sick',
        name: 'Ốm đau',
        groupId: 'benefit',
        description: 'Nghỉ do bản thân ốm đau hoặc điều trị.',
        requiresApproval: true,
        requiresDocument: true,
      },
      {
        id: 'child-sick',
        name: 'Chăm con ốm',
        groupId: 'benefit',
        description: 'Nghỉ để chăm sóc con ốm theo điều kiện áp dụng.',
        requiresApproval: true,
        requiresDocument: true,
      },
      {
        id: 'maternity',
        name: 'Thai sản',
        groupId: 'benefit',
        description: 'Bao gồm các trường hợp thai sản được doanh nghiệp áp dụng.',
        requiresApproval: true,
        requiresDocument: true,
      },
    ],
  },
  {
    id: 'company',
    name: 'Chính sách nội bộ',
    description: 'Áp dụng khi đơn vị đã kích hoạt chính sách tương ứng.',
    types: [
      {
        id: 'study',
        name: 'Học tập / đào tạo',
        groupId: 'company',
        description: 'Tham gia hoạt động học tập hoặc đào tạo được phê duyệt.',
        requiresApproval: true,
      },
      {
        id: 'special-leave',
        name: 'Nghỉ đặc biệt',
        groupId: 'company',
        description: 'Loại nghỉ mở rộng theo chính sách của đơn vị.',
        requiresApproval: true,
      },
    ],
  },
];

export function getLeaveTypeGroups() {
  return leaveTypeGroups;
}

export function getLeaveTypeById(id: string) {
  return leaveTypeGroups.flatMap((group) => group.types).find((type) => type.id === id);
}
