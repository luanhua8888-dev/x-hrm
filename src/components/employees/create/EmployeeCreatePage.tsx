import { zodResolver } from '@hookform/resolvers/zod';
import { useLingui } from '@lingui/react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ErrorState } from '@/components/feedback/ErrorState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  type EmployeeCreateFormValues,
  employeeCreateSchema,
} from '@/components/employees/create/employee-create.schema';
import { employeeCreateText } from '@/components/employees/create/EmployeeCreateText';
import { useCreateEmployee } from '@/queries/employee.query';

const defaultValues: EmployeeCreateFormValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  preferredName: '',
  email: '',
  phone: '',
  gender: '',
  dateOfBirth: '',
  nationalId: '',
  maritalStatus: '',
  address: '',
  workType: '',
  employmentType: '',
  contractEndDate: '',
  jobTitle: '',
  department: '',
  location: '',
  supervisorName: '',
  joinedDate: '',
};

type TextKey = keyof typeof employeeCreateText.vi;
type FieldName = keyof EmployeeCreateFormValues;
type FieldConfig = {
  name: FieldName;
  label: TextKey;
  type?: string;
  required?: boolean;
  className?: string;
};

const personalFields: FieldConfig[] = [
  { name: 'lastName', label: 'lastName', required: true },
  { name: 'middleName', label: 'middleName' },
  { name: 'firstName', label: 'firstName', required: true },
  { name: 'preferredName', label: 'preferredName' },
  { name: 'dateOfBirth', label: 'dateOfBirth', type: 'date' },
  { name: 'nationalId', label: 'nationalId' },
];

const contactFields: FieldConfig[] = [
  { name: 'email', label: 'email', type: 'email' },
  { name: 'phone', label: 'phone', type: 'tel' },
  { name: 'address', label: 'address', className: 'lg:col-span-2' },
];

const employmentFields: FieldConfig[] = [
  { name: 'jobTitle', label: 'jobTitle' },
  { name: 'department', label: 'department' },
  { name: 'location', label: 'location' },
  { name: 'supervisorName', label: 'supervisorName' },
  { name: 'joinedDate', label: 'joinedDate', type: 'date' },
];

export default function EmployeeCreatePage() {
  const { i18n } = useLingui();
  const text = employeeCreateText[i18n.locale === 'en' ? 'en' : 'vi'];
  const navigate = useNavigate();
  const createEmployee = useCreateEmployee();
  const form = useForm<EmployeeCreateFormValues>({
    resolver: zodResolver(employeeCreateSchema),
    defaultValues,
  });
  const employmentType = useWatch({ control: form.control, name: 'employmentType' });
  const requiresContractEndDate = employmentType === 'FIXED_TERM' || employmentType === 'TEMPORARY';

  const onSubmit = form.handleSubmit((values) => {
    const optional = <T extends string>(value: T | '') => value || undefined;
    createEmployee.mutate(
      {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        middleName: optional(values.middleName),
        preferredName: optional(values.preferredName),
        email: optional(values.email),
        phone: optional(values.phone),
        gender: optional(values.gender),
        dateOfBirth: optional(values.dateOfBirth),
        nationalId: optional(values.nationalId),
        maritalStatus: optional(values.maritalStatus),
        address: optional(values.address),
        workType: optional(values.workType),
        employmentType: optional(values.employmentType),
        contractEndDate: requiresContractEndDate ? optional(values.contractEndDate) : undefined,
        jobTitle: optional(values.jobTitle),
        department: optional(values.department),
        location: optional(values.location),
        supervisorName: optional(values.supervisorName),
        joinedDate: optional(values.joinedDate),
      },
      { onSuccess: (employee) => void navigate(`/employees/${employee.id}`) },
    );
  });

  const renderFields = (fields: FieldConfig[]) =>
    fields.map((field) => {
      const error = form.formState.errors[field.name];
      return (
        <div key={field.name} className={`space-y-1.5 ${field.className ?? ''}`}>
          <Label htmlFor={field.name}>
            {text[field.label]}
            {field.required ? null : (
              <span className="ml-1 font-normal text-slate-400">({text.optional})</span>
            )}
          </Label>
          <Input
            id={field.name}
            type={field.type}
            aria-invalid={Boolean(error)}
            {...form.register(field.name)}
          />
          {error ? (
            <p className="text-sm text-red-600">
              {field.name === 'email' ? text.invalidEmail : text.required}
            </p>
          ) : null}
        </div>
      );
    });

  const selectClass =
    'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15';

  return (
    <div className="w-full space-y-3">
      {createEmployee.error ? (
        <ErrorState title={text.errorTitle} error={createEmployee.error} />
      ) : null}
      <form
        className="w-full rounded-lg border border-brand-border bg-white"
        onSubmit={(event) => void onSubmit(event)}
      >
        <div className="flex items-center justify-between border-b border-brand-border bg-slate-50/70 px-4 py-2.5">
          <span className="text-sm font-medium text-slate-600">{text.employeeNumber}</span>
          <span className="text-xs font-medium text-slate-400">{text.employeeNumberAuto}</span>
        </div>
        <FormSection title={text.personal}>
          {renderFields(personalFields)}
          <SelectField
            label={text.gender}
            optional={text.optional}
            className={selectClass}
            {...form.register('gender')}
            options={[
              [text.select, ''],
              [text.male, 'MALE'],
              [text.female, 'FEMALE'],
              [text.other, 'OTHER'],
            ]}
          />
          <SelectField
            label={text.maritalStatus}
            optional={text.optional}
            className={selectClass}
            {...form.register('maritalStatus')}
            options={[
              [text.select, ''],
              [text.single, 'SINGLE'],
              [text.married, 'MARRIED'],
              [text.divorced, 'DIVORCED'],
              [text.widowed, 'WIDOWED'],
            ]}
          />
        </FormSection>
        <FormSection title={text.contact}>{renderFields(contactFields)}</FormSection>
        <FormSection title={text.employment} isLast>
          {renderFields(employmentFields)}
          <SelectField
            label={text.workType}
            optional={text.optional}
            className={selectClass}
            {...form.register('workType')}
            options={[
              [text.select, ''],
              [text.fullTime, 'FULL_TIME'],
              [text.partTime, 'PART_TIME'],
              [text.contract, 'CONTRACT'],
              [text.intern, 'INTERN'],
            ]}
          />
          <SelectField
            label={text.employmentType}
            optional={text.optional}
            className={selectClass}
            {...form.register('employmentType')}
            options={[
              [text.select, ''],
              [text.permanent, 'PERMANENT'],
              [text.fixedTerm, 'FIXED_TERM'],
              [text.temporary, 'TEMPORARY'],
              [text.intern, 'INTERN'],
            ]}
          />
          {requiresContractEndDate
            ? renderFields([{ name: 'contractEndDate', label: 'contractEndDate', type: 'date' }])
            : null}
        </FormSection>
        <div className="flex justify-end gap-2 border-t border-brand-border bg-slate-50/50 px-4 py-3">
          <Button type="button" variant="secondary" onClick={() => void navigate('/employees')}>
            {text.cancel}
          </Button>
          <Button type="submit" disabled={createEmployee.isPending}>
            {createEmployee.isPending ? text.saving : text.save}
          </Button>
        </div>
      </form>
    </div>
  );
}

function FormSection({
  title,
  children,
  isLast = false,
}: {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <section className={`px-4 py-3.5 ${isLast ? '' : 'border-b border-brand-border'}`}>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
        {title}
      </h2>
      <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </section>
  );
}

function SelectField({
  label,
  optional,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  optional: string;
  options: readonly (readonly [string, string])[];
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        <span className="ml-1 font-normal text-slate-400">({optional})</span>
      </Label>
      <select {...props}>
        {options.map(([optionLabel, value]) => (
          <option key={value || 'empty'} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
