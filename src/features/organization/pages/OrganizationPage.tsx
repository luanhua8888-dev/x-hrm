import type { ColumnDef } from '@tanstack/react-table';
import { useLingui } from '@lingui/react';
import {
  Building2,
  Edit3,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Save,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterCustom, type FilterField } from '@/features/common/components/FilterCustom';
import { TableCustom } from '@/features/common/components/TableCustom';

interface OrganizationRow {
  id: string;
  code: string;
  name: string;
  detail: string;
  owner: string;
  count: number;
  status: 'active' | 'inactive';
}

const pageConfig = {
  departments: {
    title: ['Phòng ban', 'Departments'],
    description: [
      'Quản lý cơ cấu phòng ban, người phụ trách và quy mô nhân sự.',
      'Manage departments, owners and workforce size.',
    ],
    addLabel: ['Thêm phòng ban', 'Add department'],
    search: ['Tìm theo mã, tên phòng ban...', 'Search code or department...'],
    detailHeader: ['Khối trực thuộc', 'Division'],
    countHeader: ['Nhân sự', 'Employees'],
  },
  locations: {
    title: ['Địa điểm làm việc', 'Work locations'],
    description: [
      'Theo dõi văn phòng, chi nhánh và địa điểm làm việc của tổ chức.',
      'Manage offices, branches and work locations.',
    ],
    addLabel: ['Thêm địa điểm', 'Add location'],
    search: ['Tìm theo mã, tên, địa chỉ...', 'Search code, name or address...'],
    detailHeader: ['Địa chỉ', 'Address'],
    countHeader: ['Nhân sự', 'Employees'],
  },
  'job-titles': {
    title: ['Chức danh', 'Job titles'],
    description: [
      'Chuẩn hóa chức danh, cấp bậc và phạm vi áp dụng trong tổ chức.',
      'Standardize job titles, levels and scope.',
    ],
    addLabel: ['Thêm chức danh', 'Add job title'],
    search: ['Tìm theo mã, tên chức danh...', 'Search code or job title...'],
    detailHeader: ['Cấp bậc', 'Level'],
    countHeader: ['Đang sử dụng', 'In use'],
  },
} as const satisfies Record<string, Record<string, readonly [string, string]>>;

const rows: Record<keyof typeof pageConfig, OrganizationRow[]> = {
  departments: [
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
      code: 'PKT',
      name: 'Phòng Khảo thí',
      detail: 'Khối đào tạo',
      owner: 'Phạm Ngọc Anh',
      count: 16,
      status: 'active',
    },
    {
      id: '5',
      code: 'CNTT',
      name: 'Trung tâm Công nghệ thông tin',
      detail: 'Khối hỗ trợ',
      owner: 'Võ Thành Công',
      count: 21,
      status: 'active',
    },
    {
      id: '6',
      code: 'DAQT',
      name: 'Ban Dự án quốc tế',
      detail: 'Khối hợp tác',
      owner: 'Đang cập nhật',
      count: 0,
      status: 'inactive',
    },
  ],
  locations: [
    {
      id: '1',
      code: 'CS-D2',
      name: 'Cơ sở Điện Biên Phủ',
      detail: '215 Điện Biên Phủ, Bình Thạnh, TP.HCM',
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
  ],
  'job-titles': [
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
  ],
};

function CompanyPage() {
  const { i18n } = useLingui();
  const en = i18n.locale === 'en';
  const tr = (vi: string, english: string) => (en ? english : vi);
  const [editing, setEditing] = useState(false);

  return (
    <div className="space-y-4">
      <PageHeading
        title={tr('Thông tin công ty', 'Company information')}
        description={tr(
          'Thông tin pháp lý và liên hệ chính được sử dụng trên toàn hệ thống.',
          'Legal and primary contact information used across the system.',
        )}
        action={
          <Button
            size="sm"
            className="h-9 rounded-lg bg-primary text-xs hover:bg-primary-hover"
            onClick={() => setEditing((value) => !value)}
          >
            {editing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            {editing ? tr('Lưu thay đổi', 'Save changes') : tr('Chỉnh sửa', 'Edit')}
          </Button>
        }
      />

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-xl border border-brand-border bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="mb-5 flex items-center gap-4 border-b border-slate-100 pb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Trường Đại học Quốc tế Hồng Bàng
              </h2>
              <p className="mt-1 text-xs text-slate-500">Hong Bang International University</p>
            </div>
          </div>
          <div className="grid gap-x-5 gap-y-4 md:grid-cols-2">
            <CompanyField
              label={tr('Tên pháp lý', 'Legal name')}
              value="Trường Đại học Quốc tế Hồng Bàng"
              disabled={!editing}
            />
            <CompanyField
              label={tr('Mã số thuế', 'Tax ID')}
              value="0303857068"
              disabled={!editing}
            />
            <CompanyField
              label={tr('Tên viết tắt', 'Abbreviation')}
              value="HIU"
              disabled={!editing}
            />
            <CompanyField
              label={tr('Lĩnh vực', 'Industry')}
              value={tr('Giáo dục và đào tạo', 'Education and training')}
              disabled={!editing}
            />
            <CompanyField label="Email" value="info@hiu.vn" disabled={!editing} />
            <CompanyField
              label={tr('Điện thoại', 'Phone')}
              value="(028) 7308 3456"
              disabled={!editing}
            />
            <div className="md:col-span-2">
              <CompanyField
                label={tr('Địa chỉ trụ sở', 'Head office address')}
                value="215 Điện Biên Phủ, Phường Gia Định, TP.HCM"
                disabled={!editing}
              />
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-brand-border bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {tr('Tổng quan tổ chức', 'Organization overview')}
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <Metric icon={<Users />} label={tr('Nhân sự', 'Employees')} value="487" />
              <Metric icon={<Building2 />} label={tr('Phòng ban', 'Departments')} value="18" />
              <Metric icon={<MapPin />} label={tr('Địa điểm', 'Locations')} value="4" />
              <Metric icon={<Edit3 />} label={tr('Chức danh', 'Job titles')} value="32" />
            </dl>
          </div>
          <div className="rounded-xl border border-brand-border bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {tr('Liên hệ chính', 'Primary contact')}
            </h2>
            <div className="mt-3 space-y-3 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" /> info@hiu.vn
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" /> (028) 7308 3456
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" /> 215 Điện Biên Phủ,
                TP.HCM
              </p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function CompanyField({
  label,
  value,
  disabled,
}: {
  label: string;
  value: string;
  disabled: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-700">{label}</span>
      <Input
        defaultValue={value}
        disabled={disabled}
        className="h-9 rounded-lg text-[13px] disabled:bg-slate-50 disabled:text-slate-600 disabled:opacity-100"
      />
    </label>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-primary shadow-sm [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </div>
      <dd className="mt-2 text-lg font-semibold text-slate-900">{value}</dd>
      <dt className="text-[11px] text-slate-500">{label}</dt>
    </div>
  );
}

function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-3 border-b border-brand-border pb-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
      {action}
    </header>
  );
}

function ListPage({ type }: { type: keyof typeof pageConfig }) {
  const { i18n } = useLingui();
  const languageIndex = i18n.locale === 'en' ? 1 : 0;
  const tr = (value: readonly [string, string]) => value[languageIndex];
  const config = pageConfig[type];
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({ status: '' });
  const data = useMemo(
    () => rows[type].filter((row) => !filters.status || row.status === filters.status),
    [filters.status, type],
  );
  const statusFields: FilterField[] = [
    {
      key: 'status',
      label: languageIndex ? 'Status' : 'Trạng thái',
      options: [
        { label: languageIndex ? 'All statuses' : 'Tất cả trạng thái', value: '' },
        { label: languageIndex ? 'Active' : 'Đang hoạt động', value: 'active' },
        { label: languageIndex ? 'Inactive' : 'Ngừng hoạt động', value: 'inactive' },
      ],
    },
  ];
  const columns = useMemo<ColumnDef<OrganizationRow>[]>(
    () => [
      {
        accessorKey: 'code',
        header: languageIndex ? 'Code' : 'Mã',
        size: 110,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-primary">{row.original.code}</span>
        ),
      },
      {
        accessorKey: 'name',
        header: languageIndex ? 'Name' : 'Tên',
        size: 230,
        cell: ({ row }) => <span className="font-medium text-slate-900">{row.original.name}</span>,
      },
      { accessorKey: 'detail', header: config.detailHeader[languageIndex], size: 280 },
      { accessorKey: 'owner', header: languageIndex ? 'Owner' : 'Phụ trách', size: 180 },
      { accessorKey: 'count', header: config.countHeader[languageIndex], size: 120 },
      {
        accessorKey: 'status',
        header: languageIndex ? 'Status' : 'Trạng thái',
        size: 150,
        cell: ({ row }) => (
          <Badge
            className={
              row.original.status === 'active'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-slate-100 text-slate-500'
            }
          >
            {row.original.status === 'active'
              ? languageIndex
                ? 'Active'
                : 'Hoạt động'
              : languageIndex
                ? 'Inactive'
                : 'Ngừng hoạt động'}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: '',
        enableSorting: false,
        cell: () => (
          <Button variant="ghost" size="compact-icon" aria-label="Tùy chọn">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        ),
      },
    ],
    [config.countHeader, config.detailHeader, languageIndex],
  );

  return (
    <div className="space-y-4">
      <PageHeading
        title={tr(config.title)}
        description={tr(config.description)}
        action={
          <Button size="sm" className="h-9 rounded-lg bg-primary text-xs hover:bg-primary-hover">
            <Plus className="h-4 w-4" />
            {tr(config.addLabel)}
          </Button>
        }
      />
      <FilterCustom
        keyword={keyword}
        onKeywordChange={setKeyword}
        fields={statusFields}
        values={filters}
        onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
        onReset={() => {
          setKeyword('');
          setFilters({ status: '' });
        }}
        placeholder={tr(config.search)}
      />
      <TableCustom
        columns={columns}
        data={data}
        keyword={keyword}
        fixedLeft={['code', 'name']}
        fixedRight={['actions']}
        emptyTitle={
          languageIndex
            ? `No ${tr(config.title).toLowerCase()} yet`
            : `Chưa có ${tr(config.title).toLowerCase()}`
        }
        emptyDescription={
          languageIndex
            ? 'Add the first record to begin managing.'
            : 'Thêm bản ghi đầu tiên để bắt đầu quản lý.'
        }
      />
    </div>
  );
}

export default function OrganizationPage() {
  const pathname = useLocation().pathname;
  if (pathname === '/organization') return <Navigate to="/organization/company" replace />;
  if (pathname.endsWith('/company')) return <CompanyPage />;
  const type = pathname.split('/').at(-1);
  if (type === 'departments' || type === 'locations' || type === 'job-titles')
    return <ListPage type={type} />;
  return <Navigate to="/organization/company" replace />;
}
