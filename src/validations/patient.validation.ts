import { z } from 'zod';

export const patientSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  firstName: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  lastName: z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz (10 haneli)'),
  dateOfBirth: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Geçerli bir doğum tarihi giriniz'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Geçerli bir cinsiyet seçiniz (male, female, other)' }),
  }),
  address: z.string().min(5, 'Adres en az 5 karakter olmalıdır'),
});

export const patientUpdateSchema = patientSchema.partial();

export const validatePatient = (data: unknown) => patientSchema.parse(data);
export const validatePatientUpdate = (data: unknown) => patientUpdateSchema.parse(data);
