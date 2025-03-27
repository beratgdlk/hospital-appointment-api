import { z } from 'zod';

export const medicalRecordCreateSchema = z.object({
  patientId: z.number().int().positive('Please enter a valid patient ID'),
  doctorId: z.number().int().positive('Please enter a valid doctor ID'),
  diagnosis: z.string().min(3, 'Diagnosis must be at least 3 characters long'),
  treatment: z.string().min(3, 'Treatment must be at least 3 characters long'),
  prescription: z.string().optional(),
  notes: z.string().optional(),
  date: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Please enter a valid date'),
});

export const medicalRecordUpdateSchema = medicalRecordCreateSchema.partial();

export const validateMedicalRecord = (data: unknown) => medicalRecordCreateSchema.parse(data);
export const validateMedicalRecordUpdate = (data: unknown) => medicalRecordUpdateSchema.parse(data); 