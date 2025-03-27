import { z } from 'zod';

export const departmentCreateSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  location: z.string().min(2),
  headDoctorId: z.number().int().positive('Please enter a valid head doctor ID').optional(),
});

export const departmentUpdateSchema = departmentCreateSchema.partial();

export const validateDepartment = (data: unknown) => departmentCreateSchema.parse(data);
export const validateDepartmentUpdate = (data: unknown) => departmentUpdateSchema.parse(data); 