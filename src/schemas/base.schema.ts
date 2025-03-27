import { z } from 'zod';

// Base schemas without relations
export const baseUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const baseDoctorSchema = z.object({
  id: z.number(),
  userId: z.number(),
  departmentId: z.number(),
  specialization: z.string(),
  licenseNumber: z.string(),
  experience: z.number(),
  education: z.string(),
  managedDepartmentId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const baseDepartmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  location: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const basePatientSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  dateOfBirth: z.date(),
  gender: z.string(),
  address: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const baseAppointmentSchema = z.object({
  id: z.number(),
  date: z.date(),
  status: z.string(),
  doctorId: z.number(),
  patientId: z.number(),
  notes: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const baseMedicalRecordSchema = z.object({
  id: z.number(),
  patientId: z.number(),
  doctorId: z.number(),
  diagnosis: z.string(),
  treatment: z.string(),
  prescription: z.string().nullable(),
  notes: z.string().nullable(),
  date: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
}); 