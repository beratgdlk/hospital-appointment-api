import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  firstName: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  lastName: z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
  role: z.enum(['admin', 'doctor', 'secretary'], {
    errorMap: () => ({ message: 'Geçerli bir rol seçiniz (admin, doctor, secretary)' }),
  }),
});

export const userUpdateSchema = userSchema.partial().omit({ password: true });

export const validateUser = (data: unknown) => userSchema.parse(data);
export const validateUserUpdate = (data: unknown) => userUpdateSchema.parse(data); 