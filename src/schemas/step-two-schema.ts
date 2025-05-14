import { z } from 'zod';

export const stepTwoSchema = z.object({
  avatar: z
    .instanceof(File, { message: 'File is required' }) 
    .refine(
      (file) => ['image/jpeg', 'image/png'].includes(file.type),
      { message: 'Only JPEG or PNG images are allowed' }
    ),
});