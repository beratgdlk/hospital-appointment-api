import { z } from 'zod';

export const medicalRecordSchema = z.object({
  patientId: z.number().int().positive('Geçerli bir hasta ID\'si giriniz'),
  doctorId: z.number().int().positive('Geçerli bir doktor ID\'si giriniz'),
  diagnosis: z.string().min(3, 'Tanı en az 3 karakter olmalıdır'),
  treatment: z.string().min(3, 'Tedavi en az 3 karakter olmalıdır'),
  prescription: z.string().optional(),
  notes: z.string().optional(),
  visitDate: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Geçerli bir ziyaret tarihi giriniz'),
});

export const medicalRecordUpdateSchema = medicalRecordSchema.partial();

export const validateMedicalRecord = (data: unknown) => medicalRecordSchema.parse(data);
export const validateMedicalRecordUpdate = (data: unknown) => medicalRecordUpdateSchema.parse(data); 