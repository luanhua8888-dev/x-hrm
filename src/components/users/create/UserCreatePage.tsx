import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ErrorState } from '@/components/feedback/ErrorState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateUserFormValues, createUserSchema } from '@/components/users/create/user.schema';
import { useCreateUser } from '@/queries/user.query';

export default function UserCreatePage() {
  const navigate = useNavigate();
  const createUser = useCreateUser();
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: '',
      email: '',
      fullName: '',
      employeeId: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    createUser.mutate(
      {
        ...values,
        employeeId: values.employeeId || undefined,
        roleIds: [],
      },
      {
        onSuccess: (user) => {
          void navigate(`/users/${user.id}`);
        },
      },
    );
  });

  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">New user</h1>
        <p className="text-sm text-slate-500">
          Create a login account. Link it to an employee only when access is required.
        </p>
      </div>

      {createUser.error ? (
        <ErrorState title="Unable to create user" error={createUser.error} />
      ) : null}

      <form
        className="space-y-4 rounded-md border border-slate-200 bg-white p-4"
        onSubmit={(event) => {
          void onSubmit(event);
        }}
      >
        {[
          { name: 'username', label: 'Username' },
          { name: 'fullName', label: 'Full name' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'employeeId', label: 'Employee ID', optional: true },
          { name: 'password', label: 'Password', type: 'password' },
        ].map((field) => {
          const fieldName = field.name as keyof CreateUserFormValues;
          return (
            <div key={field.name} className="space-y-1.5">
              <Label htmlFor={field.name}>
                {field.label}
                {field.optional ? (
                  <span className="font-normal text-slate-400"> optional</span>
                ) : null}
              </Label>
              <Input id={field.name} type={field.type} {...form.register(fieldName)} />
              {form.formState.errors[fieldName] ? (
                <p className="text-sm text-red-600">{form.formState.errors[fieldName]?.message}</p>
              ) : null}
            </div>
          );
        })}
        <div className="flex justify-end">
          <Button type="submit" disabled={createUser.isPending}>
            <Save className="h-4 w-4" />
            {createUser.isPending ? 'Saving...' : 'Save user'}
          </Button>
        </div>
      </form>
    </div>
  );
}
