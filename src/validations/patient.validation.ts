import { z } from 'zod';

export const patientCreateSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid phone number (10 digits)'),
  dateOfBirth: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()) && parsedDate < new Date();
  }, 'Please enter a valid date of birth'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Please select a valid gender (male, female, other)' }),
  }),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

export const patientUpdateSchema = patientCreateSchema.partial();

export const validatePatient = (data: unknown) => patientCreateSchema.parse(data);
export const validatePatientUpdate = (data: unknown) => patientUpdateSchema.parse(data);
