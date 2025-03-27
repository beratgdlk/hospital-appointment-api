import { z } from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  role: z.enum(['admin', 'doctor', 'secretary'], {
    errorMap: () => ({ message: 'Please select a valid role (admin, doctor, secretary)' }),
  }),
});

export const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  role: z.enum(['admin', 'doctor', 'secretary']).optional(),
});

export const validateUser = (data: unknown) => userCreateSchema.parse(data);
export const validateUserUpdate = (data: unknown) => userUpdateSchema.parse(data); 