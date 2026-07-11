import {
  OrganizationListPage,
  type OrganizationListConfig,
  type OrganizationRow,
} from '@/components/organization/common/OrganizationListPage';

const config: OrganizationListConfig = {
  title: ['Địa điểm làm việc', 'Work locations'],
  description: [
    'Văn phòng, chi nhánh và địa điểm làm việc.',
    'Offices, branches and work locations.',
  ],
  addLabel: ['Thêm địa điểm', 'Add location'],
  search: ['Tìm theo mã, tên, địa chỉ...', 'Search code, name or address...'],
  detailHeader: ['Địa chỉ', 'Address'],
  countHeader: ['Nhân sự', 'Employees'],
  emptyTitle: ['Chưa có địa điểm', 'No locations yet'],
};
const rows: OrganizationRow[] = [
  {
    id: '1',
    code: 'CS-D2',
    name: 'Cơ sở Điện Biên Phủ',
    detail: '215 Điện Biên Phủ, TP.HCM',
    owner: 'Trần Quốc Bảo',
    count: 384,
    status: 'active',
  },
  {
    id: '2',
    code: 'CS-UVK',
    name: 'Cơ sở Ung Văn Khiêm',
    detail: '120 Hoàng Minh Thảo, TP.HCM',
    owner: 'Lâm Gia Hân',
    count: 226,
    status: 'active',
  },
  {
    id: '3',
    code: 'VP-Q1',
    name: 'Văn phòng Quận 1',
    detail: '35 Nguyễn Huệ, Quận 1, TP.HCM',
    owner: 'Ngô Minh Tuấn',
    count: 42,
    status: 'active',
  },
  {
    id: '4',
    code: 'KHO-TD',
    name: 'Kho Thủ Đức',
    detail: 'Khu Công nghệ cao, TP. Thủ Đức',
    owner: 'Đỗ Văn Phúc',
    count: 8,
    status: 'inactive',
  },
];
export default function LocationsPage() {
  return <OrganizationListPage config={config} rows={rows} />;
}
