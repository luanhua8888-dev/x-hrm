import { z } from 'zod';

export const employeeCreateSchema = z.object({
  firstName: z.string().trim().min(1),
  middleName: z.string(),
  lastName: z.string().trim().min(1),
  preferredName: z.string(),
  email: z.union([z.literal(''), z.email()]),
  phone: z.string(),
  gender: z.enum(['', 'MALE', 'FEMALE', 'OTHER']),
  dateOfBirth: z.string(),
  nationalId: z.string(),
  maritalStatus: z.enum(['', 'SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']),
  address: z.string(),
  workType: z.enum(['', 'FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN']),
  employmentType: z.enum(['', 'PERMANENT', 'FIXED_TERM', 'TEMPORARY', 'INTERN']),
  contractEndDate: z.string(),
  jobTitle: z.string(),
  department: z.string(),
  location: z.string(),
  supervisorName: z.string(),
  joinedDate: z.string(),
});

export type EmployeeCreateFormValues = z.infer<typeof employeeCreateSchema>;
