import { z } from 'zod';

export const appointmentCreateSchema = z.object({
  patientId: z.number().int().positive('Please enter a valid patient ID'),
  doctorId: z.number().int().positive('Please enter a valid doctor ID'),
  date: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
  }, 'Please enter a valid date in the future'),
  status: z.enum(['scheduled', 'completed', 'cancelled'], {
    errorMap: () => ({ message: 'Please select a valid status (scheduled, completed, cancelled)' }),
  }).optional(),
  notes: z.string().optional(),
});

export const appointmentUpdateSchema = appointmentCreateSchema.partial();

export const validateAppointment = (data: unknown) => appointmentCreateSchema.parse(data);
export const validateAppointmentUpdate = (data: unknown) => appointmentUpdateSchema.parse(data); 