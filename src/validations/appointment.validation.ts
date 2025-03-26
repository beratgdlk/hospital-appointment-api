import { z } from 'zod';

export const appointmentSchema = z.object({
  patientId: z.number().int().positive('Geçerli bir hasta ID\'si giriniz'),
  doctorId: z.number().int().positive('Geçerli bir doktor ID\'si giriniz'),
  appointmentDate: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
  }, 'Geçerli ve gelecek bir tarih giriniz'),
  status: z.enum(['scheduled', 'completed', 'cancelled'], {
    errorMap: () => ({ message: 'Geçerli bir durum seçiniz (scheduled, completed, cancelled)' }),
  }),
  notes: z.string().optional(),
});

export const appointmentUpdateSchema = appointmentSchema.partial();

export const validateAppointment = (data: unknown) => appointmentSchema.parse(data);
export const validateAppointmentUpdate = (data: unknown) => appointmentUpdateSchema.parse(data); 