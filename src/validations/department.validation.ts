import { z } from 'zod';

export const departmentSchema = z.object({
  name: z.string().min(3, 'Departman adı en az 3 karakter olmalıdır'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalıdır'),
  location: z.string().min(5, 'Konum en az 5 karakter olmalıdır'),
  headDoctorId: z.number().int().positive('Geçerli bir başhekim ID\'si giriniz').optional(),
});

export const departmentUpdateSchema = departmentSchema.partial();

export const validateDepartment = (data: unknown) => departmentSchema.parse(data);
export const validateDepartmentUpdate = (data: unknown) => departmentUpdateSchema.parse(data); 