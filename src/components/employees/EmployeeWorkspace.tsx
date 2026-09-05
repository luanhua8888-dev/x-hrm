import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  FileText,
  FolderOpen,
  MapPin,
  Plus,
  ShieldCheck,
  UserRound,
  UserRoundPlus,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { employeeMockData } from '@/components/employees/list/EmployeeData';
import EmployeeListPage from '@/components/employees/list/EmployeeListPage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/cn';
import {
  profileTabs,
  resolveEmployeeWorkspace,
  type EmployeeWorkspace,
  type ProfileTab,
} from '@/components/employees/employee-workspace';

export default function EmployeeWorkspacePage() {
  const workspace = resolveEmployeeWorkspace(useLocation().pathname);

  if (workspace.kind === 'onboarding') return <EmployeeOnboarding />;
  if (workspace.kind === 'profile') return <EmployeeProfile {...workspace} />;
  return <EmployeeDirectory />;
}

function EmployeeDirectory() {
  return (
    <div className="space-y-4">
      <header className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-slate-900">Nhân viên</p>
          <p className="mt-1 text-sm text-slate-500">
            Theo dõi hồ sơ, phân công và tiến độ onboarding của nhân sự.
          </p>
        </div>
        <Link
          to="/employees/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
        >
          <UserRoundPlus className="h-4 w-4" />
          Tạo nhân viên
        </Link>
      </header>
      <EmployeeListPage />
    </div>
  );
}

function EmployeeOnboarding() {
  const [step, setStep] = useState(0);
  const steps = ['Hồ sơ', 'Phân công', 'Tài khoản & hợp đồng'];

  return (
    <div className="w-full space-y-3">
      <Link
        to="/employees"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Danh sách nhân viên
      </Link>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-3 sm:px-6">
          <p className="text-sm font-semibold text-primary">Onboarding nhân viên</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
            Tạo hồ sơ trước ngày nhận việc
          </h1>
          <p className="mt-1 max-w-3xl text-sm leading-5 text-slate-500">
            Hoàn tất hồ sơ, phân công chính và điều kiện tài khoản để chuyển nhân viên sang trạng
            thái thử việc.
          </p>
        </div>

        <ol className="grid border-b border-slate-100 sm:grid-cols-3">
          {steps.map((label, index) => {
            const isCurrent = index === step;
            const isComplete = index < step;
            return (
              <li
                key={label}
                className={cn(
                  'flex items-center gap-2.5 px-4 py-2.5 text-sm',
                  index > 0 && 'sm:border-l sm:border-slate-100',
                )}
              >
                <span
                  className={cn(
                    'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                    isComplete && 'border-emerald-600 bg-emerald-600 text-white',
                    isCurrent && 'border-primary bg-primary text-white',
                    !isCurrent && !isComplete && 'border-slate-200 bg-slate-50 text-slate-400',
                  )}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                </span>
                <span className={isCurrent ? 'font-semibold text-slate-900' : 'text-slate-500'}>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="p-4 sm:px-6 sm:py-4">
          {step === 0 ? <PersonalDetailsForm /> : null}
          {step === 1 ? <PrimaryAssignmentForm /> : null}
          {step === 2 ? <AccountAndContractForm /> : null}
        </div>

        <footer className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-4 py-2.5 sm:px-6">
          <Button
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep((current) => Math.max(0, current - 1))}
          >
            Quay lại
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}>
              Tiếp tục <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button>
              <Check className="h-4 w-4" /> Lưu hồ sơ nháp
            </Button>
          )}
        </footer>
      </section>
    </div>
  );
}

function PersonalDetailsForm() {
  return (
    <div className="space-y-4">
      <FormSection
        icon={UserRound}
        title="Thông tin cá nhân"
        description="Các trường có dấu * là bắt buộc."
      />
      <div className="grid gap-3 md:grid-cols-2">
        <FormField label="Họ và tên đệm *" placeholder="Nguyễn Văn" />
        <FormField label="Tên *" placeholder="An" />
        <FormField label="Email công việc *" placeholder="an.nguyen@hiu.edu.vn" type="email" />
        <FormField label="Số điện thoại" placeholder="0901 234 567" type="tel" />
        <FormField label="Ngày sinh" type="date" />
        <FormField label="Số CCCD" placeholder="0790 0000 0000" />
      </div>
    </div>
  );
}

function PrimaryAssignmentForm() {
  return (
    <div className="space-y-4">
      <FormSection
        icon={BriefcaseBusiness}
        title="Phân công chính"
        description="Phân công này xác định quản lý trực tiếp, lịch làm việc và hợp đồng chính."
      />
      <div className="grid gap-3 md:grid-cols-2">
        <SelectField label="Bệnh viện *" value="HIU Hospital" />
        <SelectField label="Khoa/phòng *" value="Nhân sự" />
        <SelectField label="Chức danh *" value="Chuyên viên nhân sự" />
        <SelectField label="Quản lý trực tiếp *" value="Trần Thị Mai" />
        <FormField label="Ngày hiệu lực *" type="date" />
        <FormField label="Tỷ lệ công việc" placeholder="100%" />
      </div>
      <aside className="flex gap-3 rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm leading-6 text-sky-900">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        Hệ thống sẽ kiểm tra chứng chỉ bắt buộc và xung đột với các phân công đang có trước khi phát
        hành lịch làm việc.
      </aside>
    </div>
  );
}

function AccountAndContractForm() {
  return (
    <div className="space-y-4">
      <FormSection
        icon={FileText}
        title="Tài khoản và hợp đồng thử việc"
        description="Hồ sơ chỉ sẵn sàng nhận việc khi tài khoản, hợp đồng và lịch làm việc đã có."
      />
      <div className="grid gap-3 md:grid-cols-2">
        <FormField label="Tên đăng nhập *" placeholder="an.nguyen" />
        <SelectField label="Vai trò khởi tạo" value="Nhân viên" />
        <FormField label="Ngày bắt đầu thử việc *" type="date" />
        <FormField label="Ngày kết thúc thử việc *" type="date" />
      </div>
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
        <div className="flex items-start gap-3">
          <FolderOpen className="mt-0.5 h-5 w-5 text-slate-500" />
          <div>
            <p className="text-sm font-semibold text-slate-800">Hợp đồng thử việc</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Tải mẫu hợp đồng hoặc tạo sau khi lưu hồ sơ. Bản ký được quản lý theo phiên bản.
            </p>
            <Button variant="secondary" size="sm" className="mt-3">
              <Plus className="h-4 w-4" /> Thêm tài liệu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmployeeProfile({ employeeId, tab }: Extract<EmployeeWorkspace, { kind: 'profile' }>) {
  const employee = useMemo(
    () => employeeMockData.find((candidate) => candidate.id === employeeId),
    [employeeId],
  );

  if (!employee) return <Navigate to="/employees" replace />;

  const fullName = [employee.firstName, employee.middleName, employee.lastName]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <Link
        to="/employees"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Danh sách nhân viên
      </Link>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-7">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-lg font-bold text-primary">
              {employee.firstName.slice(0, 1)}
              {employee.lastName.slice(0, 1)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{fullName}</h1>
                <EmployeeStatusBadge status={employee.status} />
              </div>
              <p className="mt-1 font-mono text-xs font-semibold tracking-wide text-primary">
                {employee.employeeNumber}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {employee.jobTitle}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {employee.department}
                </span>
              </div>
            </div>
          </div>
          <Button variant="secondary">Chỉnh sửa hồ sơ</Button>
        </div>

        <nav
          aria-label="Hồ sơ nhân viên"
          className="flex gap-1 overflow-x-auto border-t border-slate-100 px-3"
        >
          {profileTabs.map((item) => (
            <Link
              key={item}
              to={
                item === 'personal'
                  ? `/employees/${employee.id}`
                  : `/employees/${employee.id}/${item}`
              }
              className={cn(
                'shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition-colors',
                tab === item
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-900',
              )}
            >
              {profileTabLabel(item)}
            </Link>
          ))}
        </nav>
      </section>

      <ProfilePanel employee={employee} tab={tab} />
    </div>
  );
}

function ProfilePanel({
  employee,
  tab,
}: {
  employee: (typeof employeeMockData)[number];
  tab: ProfileTab;
}) {
  if (tab === 'documents') return <DocumentsPanel />;
  if (tab === 'employment-history') return <HistoryPanel employee={employee} />;
  if (tab === 'job') return <JobPanel employee={employee} />;

  const isContact = tab === 'contact';
  const rows: Array<[string, string | undefined]> = isContact
    ? [
        ['Email công việc', employee.email],
        ['Số điện thoại', employee.phone],
        ['Địa chỉ', employee.address],
      ]
    : [
        [
          'Họ và tên',
          [employee.firstName, employee.middleName, employee.lastName].filter(Boolean).join(' '),
        ],
        ['Tên gọi', employee.preferredName],
        ['Ngày sinh', employee.dateOfBirth],
        ['CCCD', employee.nationalId],
      ];

  return <DetailsCard title={isContact ? 'Thông tin liên hệ' : 'Thông tin cá nhân'} rows={rows} />;
}

function JobPanel({ employee }: { employee: (typeof employeeMockData)[number] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
      <DetailsCard
        title="Phân công chính"
        rows={[
          ['Chức danh', employee.jobTitle],
          ['Khoa/phòng', employee.department],
          ['Địa điểm', employee.location],
          ['Quản lý trực tiếp', employee.supervisorName],
        ]}
      />
      <aside className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
        <BadgeCheck className="h-5 w-5 text-primary" />
        <p className="mt-3 text-sm font-semibold text-slate-900">Phân công hợp lệ</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Không có xung đột lịch hoặc chứng chỉ cần xử lý trong dữ liệu demo.
        </p>
      </aside>
    </div>
  );
}

function DocumentsPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-slate-900">Tài liệu nhân sự</h2>
          <p className="mt-1 text-sm text-slate-500">
            Tài liệu ký được lưu theo phiên bản và không ghi đè.
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4" /> Tải tài liệu
        </Button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <DocumentRow name="Hợp đồng thử việc.pdf" detail="PDF · phiên bản 1 · đã ký" />
        <DocumentRow name="Chứng chỉ hành nghề.pdf" detail="PDF · hiệu lực đến 31/12/2027" />
      </div>
    </section>
  );
}

function HistoryPanel({ employee }: { employee: (typeof employeeMockData)[number] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-slate-900">Lịch sử việc làm</h2>
      <ol className="mt-5 space-y-5 border-l-2 border-slate-100 pl-5">
        <li className="relative">
          <span className="absolute -left-[1.73rem] top-1 h-3 w-3 rounded-full border-2 border-white bg-primary" />
          <p className="text-sm font-semibold text-slate-900">Phân công hiện tại</p>
          <p className="mt-1 text-sm text-slate-500">
            {employee.jobTitle} · {employee.department} · từ {employee.joinedDate}
          </p>
        </li>
        <li className="relative">
          <span className="absolute -left-[1.73rem] top-1 h-3 w-3 rounded-full border-2 border-white bg-slate-300" />
          <p className="text-sm font-semibold text-slate-900">Hồ sơ được tạo</p>
          <p className="mt-1 text-sm text-slate-500">
            Nguồn dữ liệu demo, có lịch sử hiệu lực theo ngày.
          </p>
        </li>
      </ol>
    </section>
  );
}

function DetailsCard({
  title,
  rows,
}: {
  title: string;
  rows: Array<[string, string | undefined]>;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="border-b border-slate-100 pb-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
            <dd className="mt-1 text-sm font-medium text-slate-800">{value || 'Chưa cập nhật'}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function DocumentRow({ name, detail }: { name: string; detail: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
      <FileText className="h-5 w-5 text-primary" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-900">{name}</p>
        <p className="mt-0.5 text-xs text-slate-500">{detail}</p>
      </div>
    </div>
  );
}

function EmployeeStatusBadge({ status }: { status: string }) {
  const styles =
    status === 'ACTIVE'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : status === 'PROBATION'
        ? 'border-amber-200 bg-amber-50 text-amber-700'
        : 'border-slate-200 bg-slate-50 text-slate-600';
  const label =
    status === 'ACTIVE' ? 'Đang làm việc' : status === 'PROBATION' ? 'Thử việc' : status;
  return <Badge className={styles}>{label}</Badge>;
}

function FormSection({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h2 className="font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function FormField({ label, ...props }: { label: string } & React.ComponentProps<typeof Input>) {
  const id = label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  );
}

function SelectField({ label, value }: { label: string; value: string }) {
  const id = label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        defaultValue={value}
        className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
      >
        <option>{value}</option>
      </select>
    </div>
  );
}

function profileTabLabel(tab: ProfileTab) {
  const labels: Record<ProfileTab, string> = {
    personal: 'Cá nhân',
    contact: 'Liên hệ',
    job: 'Công việc',
    documents: 'Tài liệu',
    'employment-history': 'Lịch sử',
  };
  return labels[tab];
}
