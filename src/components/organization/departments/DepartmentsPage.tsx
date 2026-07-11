import {
  OrganizationListPage,
  type OrganizationListConfig,
  type OrganizationRow,
} from '@/components/organization/common/OrganizationListPage';

const config: OrganizationListConfig = {
  title: ['Phòng ban', 'Departments'],
  description: [
    'Cơ cấu phòng ban, người phụ trách và quy mô nhân sự.',
    'Department structure, owners and workforce size.',
  ],
  addLabel: ['Thêm phòng ban', 'Add department'],
  search: ['Tìm theo mã, tên phòng ban...', 'Search code or department...'],
  detailHeader: ['Khối trực thuộc', 'Division'],
  countHeader: ['Nhân sự', 'Employees'],
  emptyTitle: ['Chưa có phòng ban', 'No departments yet'],
};
const rows: OrganizationRow[] = [
  {
    id: '1',
    code: 'BGH',
    name: 'Ban Giám hiệu',
    detail: 'Điều hành',
    owner: 'Nguyễn Minh Quân',
    count: 5,
    status: 'active',
  },
  {
    id: '2',
    code: 'PNS',
    name: 'Phòng Nhân sự',
    detail: 'Khối vận hành',
    owner: 'Trần Thu Hà',
    count: 12,
    status: 'active',
  },
  {
    id: '3',
    code: 'PTC',
    name: 'Phòng Tài chính',
    detail: 'Khối vận hành',
    owner: 'Lê Hoàng Nam',
    count: 9,
    status: 'active',
  },
  {
    id: '4',
    code: 'CNTT',
    name: 'Trung tâm Công nghệ thông tin',
    detail: 'Khối hỗ trợ',
    owner: 'Võ Thành Công',
    count: 21,
    status: 'active',
  },
  {
    id: '5',
    code: 'DAQT',
    name: 'Ban Dự án quốc tế',
    detail: 'Khối hợp tác',
    owner: 'Đang cập nhật',
    count: 0,
    status: 'inactive',
  },
];
export default function DepartmentsPage() {
  return <OrganizationListPage config={config} rows={rows} />;
}
