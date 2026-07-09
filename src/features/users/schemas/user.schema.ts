import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3, 'Username must contain at least 3 characters.'),
  email: z.email('Enter a valid email address.'),
  fullName: z.string().min(2, 'Full name is required.'),
  employeeId: z.string().optional(),
  password: z.string().min(8, 'Password must contain at least 8 characters.'),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
