import { z } from 'zod';

export const doctorSchema = z.object({
  userId: z.number().int().positive('Geçerli bir kullanıcı ID\'si giriniz'),
  departmentId: z.number().int().positive('Geçerli bir departman ID\'si giriniz'),
  specialization: z.string().min(3, 'Uzmanlık alanı en az 3 karakter olmalıdır'),
  licenseNumber: z.string().min(5, 'Lisans numarası en az 5 karakter olmalıdır'),
  experience: z.number().int().min(0, 'Deneyim yılı 0 veya daha büyük olmalıdır'),
  education: z.string().min(5, 'Eğitim bilgisi en az 5 karakter olmalıdır'),
});

export const doctorUpdateSchema = doctorSchema.partial();

export const validateDoctor = (data: unknown) => doctorSchema.parse(data);
export const validateDoctorUpdate = (data: unknown) => doctorUpdateSchema.parse(data); 