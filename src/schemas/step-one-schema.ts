import { z } from 'zod';

export const step1Schema = z.object({
  fullName: z.string().min(1, 'Името е задължително'),
  password: z.string().min(6, 'Минимум 6 символа'),
  confirmPassword: z.string().min(6, 'Потвърдете паролата'),
  interests: z.array(z.string()).min(1, 'Избери поне 1').max(2, 'Максимум 2 интереса'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Паролите не съвпадат',
  path: ['confirmPassword'],
});