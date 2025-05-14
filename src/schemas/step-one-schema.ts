import { z } from 'zod';

export const stepOneSchema = z.object({
  fullName: z.string().min(1, 'Please enter your name'),
  password: z.string().min(6, 'The password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'The password must be at least 6 characters long'),
  interests: z.array(z.string()).min(1, 'Please choose at least 1 interest').max(2, 'You can choose up to 2 interests'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});