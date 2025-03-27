import { z } from 'zod';
import {
  baseUserSchema,
  baseDoctorSchema,
  baseDepartmentSchema,
  basePatientSchema,
  baseAppointmentSchema,
  baseMedicalRecordSchema,
  basePatientHistorySchema,
} from './base.schema';

import type {
  User,
  Doctor,
  Department,
  Patient,
  Appointment,
  MedicalRecord,
  PatientHistory
} from '../types/types';

// Type references
type Ref<T> = T;

// Base schemas for models - without relationships
export const userSchema = baseUserSchema;
export const doctorSchema = baseDoctorSchema;
export const departmentSchema = baseDepartmentSchema;
export const patientSchema = basePatientSchema;
export const appointmentSchema = baseAppointmentSchema;
export const medicalRecordSchema = baseMedicalRecordSchema;
export const patientHistorySchema = basePatientHistorySchema;

// Create and Update schemas
export const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
});

export const userUpdateSchema = userCreateSchema.partial();

export const patientCreateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  dateOfBirth: z.union([z.string(), z.date()]),
  gender: z.string(),
  address: z.string(),
});

export const patientUpdateSchema = patientCreateSchema.partial();

export const doctorCreateSchema = z.object({
  userId: z.number(),
  departmentId: z.number(),
  specialization: z.string(),
  licenseNumber: z.string(),
  experience: z.number(),
  education: z.string(),
  managedDepartmentId: z.number().optional(),
});

export const doctorUpdateSchema = doctorCreateSchema.partial();

export const departmentCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  location: z.string(),
});

export const departmentUpdateSchema = departmentCreateSchema.partial();

export const appointmentCreateSchema = z.object({
  date: z.date(),
  status: z.string().optional(),
  doctorId: z.number(),
  patientId: z.number(),
  notes: z.string().optional(),
});

export const appointmentUpdateSchema = appointmentCreateSchema.partial();

export const medicalRecordCreateSchema = z.object({
  diagnosis: z.string(),
  treatment: z.string(),
  prescription: z.string().optional(),
  notes: z.string().optional(),
  date: z.date(),
  patientId: z.number(),
  doctorId: z.number(),
});

export const medicalRecordUpdateSchema = medicalRecordCreateSchema.partial();

export const patientHistoryCreateSchema = z.object({
  patientId: z.number(),
  recordType: z.enum(['appointment', 'medical_record', 'prescription', 'test_result', 'other']),
  recordId: z.number(),
  action: z.enum(['created', 'updated', 'canceled', 'completed']),
  details: z.string().optional().nullable(),
  performedBy: z.number(),
  performedAt: z.date().optional().default(() => new Date()),
});

export const patientHistoryUpdateSchema = patientHistoryCreateSchema.partial();

// Export type definitions
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type PatientCreate = z.infer<typeof patientCreateSchema>;
export type PatientUpdate = z.infer<typeof patientUpdateSchema>;
export type DoctorCreate = z.infer<typeof doctorCreateSchema>;
export type DoctorUpdate = z.infer<typeof doctorUpdateSchema>;
export type DepartmentCreate = z.infer<typeof departmentCreateSchema>;
export type DepartmentUpdate = z.infer<typeof departmentUpdateSchema>;
export type AppointmentCreate = z.infer<typeof appointmentCreateSchema>;
export type AppointmentUpdate = z.infer<typeof appointmentUpdateSchema>;
export type MedicalRecordCreate = z.infer<typeof medicalRecordCreateSchema>;
export type MedicalRecordUpdate = z.infer<typeof medicalRecordUpdateSchema>;
export type PatientHistoryCreate = z.infer<typeof patientHistoryCreateSchema>;
export type PatientHistoryUpdate = z.infer<typeof patientHistoryUpdateSchema>; 