import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'username_required'),
  password: z
    .string()
    .min(1, 'password_required')
    .refine((val) => !/\s/.test(val), {
      message: 'password_no_spaces',
    }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
