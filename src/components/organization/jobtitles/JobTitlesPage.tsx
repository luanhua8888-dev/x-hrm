import {
  OrganizationListPage,
  type OrganizationListConfig,
  type OrganizationRow,
} from '@/components/organization/common/OrganizationListPage';

const config: OrganizationListConfig = {
  title: ['Chức danh', 'Job titles'],
  description: [
    'Chức danh, cấp bậc và phạm vi áp dụng.',
    'Job titles, levels and organizational scope.',
  ],
  addLabel: ['Thêm chức danh', 'Add job title'],
  search: ['Tìm theo mã, tên chức danh...', 'Search code or job title...'],
  detailHeader: ['Cấp bậc', 'Level'],
  countHeader: ['Đang sử dụng', 'In use'],
  emptyTitle: ['Chưa có chức danh', 'No job titles yet'],
};
const rows: OrganizationRow[] = [
  {
    id: '1',
    code: 'GV-01',
    name: 'Giảng viên',
    detail: 'Chuyên viên',
    owner: 'Khối đào tạo',
    count: 184,
    status: 'active',
  },
  {
    id: '2',
    code: 'GVCC',
    name: 'Giảng viên cao cấp',
    detail: 'Chuyên gia',
    owner: 'Khối đào tạo',
    count: 28,
    status: 'active',
  },
  {
    id: '3',
    code: 'TP-01',
    name: 'Trưởng phòng',
    detail: 'Quản lý',
    owner: 'Toàn tổ chức',
    count: 14,
    status: 'active',
  },
  {
    id: '4',
    code: 'CV-02',
    name: 'Chuyên viên',
    detail: 'Chuyên viên',
    owner: 'Khối vận hành',
    count: 96,
    status: 'active',
  },
  {
    id: '5',
    code: 'CTV',
    name: 'Cộng tác viên',
    detail: 'Hỗ trợ',
    owner: 'Toàn tổ chức',
    count: 17,
    status: 'inactive',
  },
];
export default function JobTitlesPage() {
  return <OrganizationListPage config={config} rows={rows} />;
}
