import { z } from 'zod';

export const doctorCreateSchema = z.object({
  userId: z.number().int().positive('Please enter a valid user ID'),
  departmentId: z.number().int().positive('Please enter a valid department ID'),
  specialization: z.string().min(3, 'Specialization must be at least 3 characters'),
  licenseNumber: z.string().min(5, 'License number must be at least 5 characters'),
  experience: z.number().int().min(0, 'Experience must be 0 or greater'),
  education: z.string().min(5, 'Education must be at least 5 characters'),
  managedDepartmentId: z.number().int().positive().optional(),
});

export const doctorUpdateSchema = doctorCreateSchema.partial();

export const validateDoctor = (data: unknown) => doctorCreateSchema.parse(data);
export const validateDoctorUpdate = (data: unknown) => doctorUpdateSchema.parse(data); 