import { z } from 'zod';
import {
  baseUserSchema,
  baseDoctorSchema,
  baseDepartmentSchema,
  basePatientSchema,
  baseAppointmentSchema,
  baseMedicalRecordSchema,
} from './base.schema';

// Tip referansları
type Ref<T> = T;

// Önceden tanımlı tipler
export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  doctor?: Doctor | null;
}

export interface Doctor {
  id: number;
  userId: number;
  departmentId: number;
  specialization: string;
  licenseNumber: string;
  experience: number;
  education: string;
  managedDepartmentId: number | null;
  createdAt: Date;
  updatedAt: Date;
  user: Omit<User, 'doctor'>;
  department: Department;
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  managedDepartment: Department | null;
}

export interface Department {
  id: number;
  name: string;
  description: string | null;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  doctors: Doctor[];
  headDoctor: Doctor | null;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  medicalRecords: MedicalRecord[];
  appointments: Appointment[];
}

export interface Appointment {
  id: number;
  date: Date;
  status: string;
  doctorId: number;
  patientId: number;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  doctor: Doctor;
  patient: Patient;
}

export interface MedicalRecord {
  id: number;
  patientId: number;
  doctorId: number;
  diagnosis: string;
  treatment: string;
  prescription: string | null;
  notes: string | null;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  patient: Patient;
  doctor: Doctor;
}

// Temel modeller için şemalar - ilişkisiz
export const userSchema = baseUserSchema;
export const doctorSchema = baseDoctorSchema;
export const departmentSchema = baseDepartmentSchema;
export const patientSchema = basePatientSchema;
export const appointmentSchema = baseAppointmentSchema;
export const medicalRecordSchema = baseMedicalRecordSchema;

// Create ve Update şemaları
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

// Export tip tanımlamaları
export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;

export type PatientCreateSchema = z.infer<typeof patientCreateSchema>;
export type PatientUpdateSchema = z.infer<typeof patientUpdateSchema>;

export type DoctorCreateSchema = z.infer<typeof doctorCreateSchema>;
export type DoctorUpdateSchema = z.infer<typeof doctorUpdateSchema>;

export type DepartmentCreateSchema = z.infer<typeof departmentCreateSchema>;
export type DepartmentUpdateSchema = z.infer<typeof departmentUpdateSchema>;

export type AppointmentCreateSchema = z.infer<typeof appointmentCreateSchema>;
export type AppointmentUpdateSchema = z.infer<typeof appointmentUpdateSchema>;

export type MedicalRecordCreateSchema = z.infer<typeof medicalRecordCreateSchema>;
export type MedicalRecordUpdateSchema = z.infer<typeof medicalRecordUpdateSchema>; 