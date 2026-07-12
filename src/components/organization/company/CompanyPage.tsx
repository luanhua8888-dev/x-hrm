import { useLingui } from '@lingui/react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  Building2,
  ChevronRight,
  Edit3,
  MapPin,
  Network,
  Plus,
  Search,
  Trash2,
  Users,
} from 'lucide-react';
import { type FormEvent, type ReactNode, useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PopupCustom } from '@/components/ui/PopupCustom';
import { TableCustom } from '@/components/common/TableCustom';
import { getCompanyText, type CompanyTextKey } from '@/components/organization/company/CompanyText';
import {
  initialCompanies,
  initialDepartments,
} from '@/components/organization/company/CompanyData';
import type {
  Company,
  Department,
  PopupState,
} from '@/components/organization/company/CompanyTypes';

type Translate = (key: CompanyTextKey) => string;
export default function CompanyPage() {
  const { i18n } = useLingui();
  const tr: Translate = useCallback((key) => getCompanyText(i18n.locale, key), [i18n.locale]);
  const [companies, setCompanies] = useState(initialCompanies);
  const [departments, setDepartments] = useState(initialDepartments);
  const [selectedId, setSelectedId] = useState(initialCompanies[0].id);
  const [keyword, setKeyword] = useState('');
  const [popup, setPopup] = useState<PopupState>(null);
  const selected = companies.find((item) => item.id === selectedId) ?? companies[0];
  const companyDepartments = departments.filter((item) => item.companyId === selected?.id);
  const departmentColumns = useMemo<ColumnDef<Department>[]>(
    () => [
      {
        accessorKey: 'code',
        header: tr('code'),
        size: 80,
        cell: ({ row }) => (
          <span className="font-mono text-[11px] font-semibold text-primary">
            {row.original.code}
          </span>
        ),
      },
      { accessorKey: 'name', header: tr('department'), size: 250 },
      { accessorKey: 'owner', header: tr('manager'), size: 180 },
      { accessorKey: 'employees', header: tr('people'), size: 90 },
      {
        accessorKey: 'active',
        header: tr('status'),
        size: 110,
        cell: ({ row }) => (
          <Status
            active={row.original.active}
            label={row.original.active ? tr('active') : tr('inactive')}
          />
        ),
      },
      {
        id: 'actions',
        header: '',
        size: 60,
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="compact-icon"
            aria-label={tr('editDepartment')}
            onClick={() => setPopup({ type: 'department-edit', department: row.original })}
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Button>
        ),
      },
    ],
    [tr],
  );

  const saveCompany = (value: Omit<Company, 'id'>, id?: string) => {
    if (id)
      setCompanies((items) => items.map((item) => (item.id === id ? { ...value, id } : item)));
    else {
      const company = { ...value, id: `${value.code.toLowerCase()}-${Date.now()}` };
      setCompanies((items) => [...items, company]);
      setSelectedId(company.id);
    }
    setPopup(null);
  };

  const saveDepartment = (value: Omit<Department, 'id' | 'companyId'>, id?: string) => {
    if (!selected) return;
    if (id)
      setDepartments((items) =>
        items.map((item) => (item.id === id ? { ...item, ...value } : item)),
      );
    else
      setDepartments((items) => [
        ...items,
        {
          ...value,
          id: `${selected.id}-${value.code.toLowerCase()}-${Date.now()}`,
          companyId: selected.id,
        },
      ]);
    setPopup(null);
  };

  const deleteCompany = (company: Company) => {
    const remaining = companies.filter((item) => item.id !== company.id);
    setCompanies(remaining);
    setDepartments((items) => items.filter((item) => item.companyId !== company.id));
    if (selectedId === company.id) setSelectedId(remaining[0]?.id ?? '');
    setPopup(null);
  };

  const deleteDepartment = (department: Department) => {
    setDepartments((items) => items.filter((item) => item.id !== department.id));
    setPopup(null);
  };

  return (
    <div className="space-y-3">
      <header className="flex min-h-9 flex-col gap-2 border-b border-brand-border pb-2 sm:flex-row sm:items-center sm:justify-end">
        <Button
          size="sm"
          className="h-9 rounded-lg bg-primary text-xs hover:bg-primary-hover"
          onClick={() => setPopup({ type: 'company-create' })}
        >
          <Plus className="h-4 w-4" />
          {tr('addCompany')}
        </Button>
      </header>

      <section className="grid overflow-hidden rounded-xl border border-brand-border bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-brand-border bg-slate-50/60 xl:border-b-0 xl:border-r">
          <div className="border-b border-brand-border p-3">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{tr('groupName')}</p>
                <p className="mt-0.5 text-[11px] text-slate-500">{tr('parentGroup')}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <Summary value={String(companies.length)} label={tr('companies')} />
              <Summary
                value={String(companies.reduce((sum, item) => sum + item.employees, 0))}
                label={tr('employees')}
              />
            </div>
          </div>
          <div className="p-2" role="listbox" aria-label={tr('companyList')}>
            <p className="px-2 pb-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {tr('subsidiaries')}
            </p>
            <div className="grid gap-1 sm:grid-cols-2 xl:grid-cols-1">
              {companies.map((company) => {
                const active = company.id === selectedId;
                return (
                  <button
                    key={company.id}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => setSelectedId(company.id)}
                    className={`group flex min-h-14 w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors border border-transparent ${active ? 'bg-slate-50 border-slate-200/60 shadow-sm' : 'text-slate-700 hover:bg-white'}`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${active ? 'bg-white text-primary border border-slate-200 shadow-sm' : 'border border-slate-200 bg-white text-slate-600'}`}
                    >
                      {company.code}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-xs font-semibold ${active ? 'text-primary' : ''}`}
                      >
                        {company.name}
                      </span>
                      <span className={`mt-1 block text-[10px] text-slate-500`}>
                        {company.departments} {tr('departmentsLower')} · {company.employees}{' '}
                        {tr('peopleLower')}
                      </span>
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 ${active ? 'text-primary' : 'text-slate-300 group-hover:text-slate-500'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {selected ? (
          <div className="min-w-0">
            <div className="border-b border-brand-border p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="grid min-w-0 grid-cols-[40px_minmax(0,1fr)] items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-[11px] font-bold text-slate-700 shadow-sm">
                    {selected.code}
                  </div>
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <h2 className="truncate text-base font-semibold text-slate-900">
                        {selected.name}
                      </h2>
                      <Status
                        active={selected.active}
                        label={selected.active ? tr('currentlyActive') : tr('inactive')}
                      />
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5" />
                      {selected.location} · MST {selected.taxCode}
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 self-start rounded-lg text-xs"
                  onClick={() => setPopup({ type: 'company-edit', company: selected })}
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  {tr('edit')}
                </Button>
              </div>
              <dl className="mt-4 grid grid-cols-2 divide-x divide-slate-200 rounded-lg bg-slate-50 py-2.5 sm:grid-cols-4">
                <Metric
                  icon={<Users />}
                  value={String(selected.employees)}
                  label={tr('employees')}
                />
                <Metric
                  icon={<Network />}
                  value={String(selected.departments)}
                  label={tr('departments')}
                />
                <Metric icon={<MapPin />} value="3" label={tr('locations')} />
                <Metric icon={<Building2 />} value="12" label={tr('jobTitles')} />
              </dl>
            </div>

            <div className="p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {tr('directDepartments')}
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {tr('directDepartmentsDescription')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <label className="relative flex-1 sm:w-56">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={keyword}
                      onChange={(event) => setKeyword(event.target.value)}
                      placeholder={tr('searchDepartments')}
                      className="h-8 rounded-lg pl-8 text-xs"
                    />
                  </label>
                  <Button
                    size="sm"
                    className="h-8 shrink-0 rounded-lg bg-primary text-xs hover:bg-primary-hover"
                    onClick={() => setPopup({ type: 'department-create' })}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{tr('addDepartment')}</span>
                  </Button>
                </div>
              </div>
              <div className="mt-3">
                <TableCustom
                  columns={departmentColumns}
                  data={companyDepartments}
                  keyword={keyword}
                  showColumnFilters={false}
                  fixedLeft={['code', 'name']}
                  fixedRight={['actions']}
                  emptyTitle={tr('noDepartments')}
                  emptyDescription={tr('changeSearch')}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-80 items-center justify-center p-8 text-sm text-slate-500">
            {tr('noCompanies')}
          </div>
        )}
      </section>

      {popup?.type === 'company-create' && (
        <CompanyForm
          key="company-create"
          tr={tr}
          onClose={() => setPopup(null)}
          onSave={saveCompany}
        />
      )}
      {popup?.type === 'company-edit' && (
        <CompanyForm
          key={popup.company.id}
          tr={tr}
          company={popup.company}
          onClose={() => setPopup(null)}
          onSave={saveCompany}
          onDelete={() => setPopup({ type: 'company-delete', company: popup.company })}
        />
      )}
      {popup?.type === 'department-create' && (
        <DepartmentForm
          key="department-create"
          tr={tr}
          onClose={() => setPopup(null)}
          onSave={saveDepartment}
        />
      )}
      {popup?.type === 'department-edit' && (
        <DepartmentForm
          key={popup.department.id}
          tr={tr}
          department={popup.department}
          onClose={() => setPopup(null)}
          onSave={saveDepartment}
          onDelete={() => setPopup({ type: 'department-delete', department: popup.department })}
        />
      )}
      {popup?.type === 'company-delete' && (
        <DeletePopup
          tr={tr}
          entity={popup.company.name}
          detail={tr('deleteCompanyDetail')}
          onClose={() => setPopup(null)}
          onConfirm={() => deleteCompany(popup.company)}
        />
      )}
      {popup?.type === 'department-delete' && (
        <DeletePopup
          tr={tr}
          entity={popup.department.name}
          onClose={() => setPopup(null)}
          onConfirm={() => deleteDepartment(popup.department)}
        />
      )}
    </div>
  );
}

function CompanyForm({
  company,
  onClose,
  onDelete,
  onSave,
  tr,
}: {
  company?: Company;
  onClose: () => void;
  onDelete?: () => void;
  onSave: (value: Omit<Company, 'id'>, id?: string) => void;
  tr: Translate;
}) {
  const [form, setForm] = useState({
    code: company?.code ?? '',
    name: company?.name ?? '',
    location: company?.location ?? '',
    taxCode: company?.taxCode ?? '',
    employees: String(company?.employees ?? 0),
    departments: String(company?.departments ?? 0),
    active: company?.active ?? true,
  });
  const [error, setError] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.code.trim() || !form.name.trim() || !form.location.trim()) {
      setError(tr('companyRequiredError'));
      return;
    }
    onSave(
      {
        ...form,
        code: form.code.trim().toUpperCase(),
        name: form.name.trim(),
        location: form.location.trim(),
        taxCode: form.taxCode.trim(),
        employees: Math.max(0, Number(form.employees) || 0),
        departments: Math.max(0, Number(form.departments) || 0),
      },
      company?.id,
    );
  };
  return (
    <PopupCustom.Root open onClose={onClose} size="lg">
      <form onSubmit={submit}>
        <PopupCustom.Header
          icon={<Building2 className="h-4 w-4" />}
          description={company ? tr('updateCompanyDescription') : tr('createCompanyDescription')}
        >
          {company ? tr('editCompany') : tr('addCompany')}
        </PopupCustom.Header>
        <PopupCustom.Body>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={tr('companyCode')} required>
              <Input
                autoFocus
                value={form.code}
                maxLength={8}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder={tr('companyCodeExample')}
              />
            </Field>
            <Field label={tr('companyName')} required>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label={tr('location')} required>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder={tr('locationExample')}
              />
            </Field>
            <Field label={tr('taxCode')}>
              <Input
                value={form.taxCode}
                onChange={(e) => setForm({ ...form, taxCode: e.target.value })}
              />
            </Field>
            <Field label={tr('employeeCount')}>
              <Input
                type="number"
                min="0"
                value={form.employees}
                onChange={(e) => setForm({ ...form, employees: e.target.value })}
              />
            </Field>
            <Field label={tr('departmentCount')}>
              <Input
                type="number"
                min="0"
                value={form.departments}
                onChange={(e) => setForm({ ...form, departments: e.target.value })}
              />
            </Field>
            <Field label={tr('status')}>
              <Select
                value={form.active ? 'active' : 'inactive'}
                onChange={(value) => setForm({ ...form, active: value === 'active' })}
                tr={tr}
              />
            </Field>
          </div>
          {error && (
            <p role="alert" className="mt-4 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </p>
          )}
        </PopupCustom.Body>
        <PopupCustom.Footer>
          {onDelete && (
            <Button
              variant="ghost"
              className="mr-auto text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
              {tr('deleteCompany')}
            </Button>
          )}
          <PopupCustom.Close>{tr('cancel')}</PopupCustom.Close>
          <Button type="submit" className="bg-primary hover:bg-primary-hover">
            {company ? tr('saveChanges') : tr('createCompany')}
          </Button>
        </PopupCustom.Footer>
      </form>
    </PopupCustom.Root>
  );
}

function DepartmentForm({
  department,
  onClose,
  onDelete,
  onSave,
  tr,
}: {
  department?: Department;
  onClose: () => void;
  onDelete?: () => void;
  onSave: (value: Omit<Department, 'id' | 'companyId'>, id?: string) => void;
  tr: Translate;
}) {
  const [form, setForm] = useState({
    code: department?.code ?? '',
    name: department?.name ?? '',
    owner: department?.owner ?? '',
    employees: String(department?.employees ?? 0),
    active: department?.active ?? true,
  });
  const [error, setError] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.code.trim() || !form.name.trim()) {
      setError(tr('departmentRequiredError'));
      return;
    }
    onSave(
      {
        code: form.code.trim().toUpperCase(),
        name: form.name.trim(),
        owner: form.owner.trim() || tr('notAssigned'),
        employees: Math.max(0, Number(form.employees) || 0),
        active: form.active,
      },
      department?.id,
    );
  };
  return (
    <PopupCustom.Root open onClose={onClose}>
      <form onSubmit={submit}>
        <PopupCustom.Header
          icon={<Network className="h-4 w-4" />}
          description={
            department ? tr('updateDepartmentDescription') : tr('createDepartmentDescription')
          }
        >
          {department ? tr('editDepartment') : tr('addDepartment')}
        </PopupCustom.Header>
        <PopupCustom.Body>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={tr('departmentCode')} required>
              <Input
                autoFocus
                value={form.code}
                maxLength={8}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder={tr('departmentCodeExample')}
              />
            </Field>
            <Field label={tr('departmentName')} required>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label={tr('manager')}>
              <Input
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
              />
            </Field>
            <Field label={tr('employeeCount')}>
              <Input
                type="number"
                min="0"
                value={form.employees}
                onChange={(e) => setForm({ ...form, employees: e.target.value })}
              />
            </Field>
            <Field label={tr('status')}>
              <Select
                value={form.active ? 'active' : 'inactive'}
                onChange={(value) => setForm({ ...form, active: value === 'active' })}
                tr={tr}
              />
            </Field>
          </div>
          {error && (
            <p role="alert" className="mt-4 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </p>
          )}
        </PopupCustom.Body>
        <PopupCustom.Footer>
          {onDelete && (
            <Button
              variant="ghost"
              className="mr-auto text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
              {tr('deleteDepartment')}
            </Button>
          )}
          <PopupCustom.Close>{tr('cancel')}</PopupCustom.Close>
          <Button type="submit" className="bg-primary hover:bg-primary-hover">
            {department ? tr('saveChanges') : tr('createDepartment')}
          </Button>
        </PopupCustom.Footer>
      </form>
    </PopupCustom.Root>
  );
}

function DeletePopup({
  detail,
  entity,
  onClose,
  onConfirm,
  tr,
}: {
  detail?: string;
  entity: string;
  onClose: () => void;
  onConfirm: () => void;
  tr: Translate;
}) {
  return (
    <PopupCustom.Root open onClose={onClose} size="sm">
      <PopupCustom.Header
        icon={<Trash2 className="h-4 w-4 text-red-600" />}
        description={tr('irreversible')}
      >
        {tr('confirmDelete')}
      </PopupCustom.Header>
      <PopupCustom.Body>
        <p className="text-sm leading-6 text-slate-600">
          {tr('deleteQuestion')} <strong className="font-semibold text-slate-900">{entity}</strong>?
        </p>
        {detail && <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>}
      </PopupCustom.Body>
      <PopupCustom.Footer>
        <PopupCustom.Close>{tr('keep')}</PopupCustom.Close>
        <Button variant="danger" onClick={onConfirm}>
          {tr('delete')}
        </Button>
      </PopupCustom.Footer>
    </PopupCustom.Root>
  );
}

function Field({
  children,
  label,
  required,
}: {
  children: ReactNode;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
}
function Select({
  onChange,
  tr,
  value,
}: {
  onChange: (value: string) => void;
  tr: Translate;
  value: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
    >
      <option value="active">{tr('currentlyActive')}</option>
      <option value="inactive">{tr('inactive')}</option>
    </select>
  );
}
function Status({ active, label }: { active: boolean; label: string }) {
  return (
    <div className="flex h-6 w-fit items-center gap-1.5 px-1 text-[11px] font-medium text-slate-600">
      <span
        className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-400'}`}
        aria-hidden="true"
      />
      {label}
    </div>
  );
}
function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
      <strong className="block text-base text-slate-900">{value}</strong>
      <span className="text-slate-500">{label}</span>
    </div>
  );
}
function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-center gap-2 px-3 sm:px-4">
      <span className="text-slate-400 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <div>
        <dd className="text-sm font-semibold text-slate-900">{value}</dd>
        <dt className="text-[10px] text-slate-500">{label}</dt>
      </div>
    </div>
  );
}
