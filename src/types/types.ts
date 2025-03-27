import { Prisma } from '@prisma/client';

// Prisma Error Types
export interface PrismaError extends Error {
    code?: string;
    meta?: {
        target?: string[];
    };
}

// Base Types from Prisma
export type User = {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    doctor?: Doctor | null;
};

export type Patient = {
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
    history: PatientHistory[];
};

export type Doctor = {
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
};

export type Department = {
    id: number;
    name: string;
    description: string | null;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    doctors: Doctor[];
    headDoctor: Doctor | null;
};

export type Appointment = {
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
};

export type MedicalRecord = {
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
};

export type PatientHistory = {
    id: number;
    patientId: number;
    recordType: 'appointment' | 'medical_record' | 'prescription' | 'test_result' | 'other';
    recordId: number;
    action: 'created' | 'updated' | 'canceled' | 'completed';
    details: string | null;
    performedBy: number;
    performedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    patient: Patient;
};

// Input Types
export type UserCreateInput = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
};

export type UserUpdateInput = Partial<UserCreateInput>;

export type PatientCreateInput = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string | Date;
    gender: string;
    address: string;
};

export type PatientUpdateInput = Partial<PatientCreateInput>;

export type DoctorCreateInput = {
    userId: number;
    departmentId: number;
    specialization: string;
    licenseNumber: string;
    experience: number;
    education: string;
    managedDepartmentId?: number;
};

export type DoctorUpdateInput = Partial<DoctorCreateInput>;

export type DepartmentCreateInput = {
    name: string;
    description?: string;
    location: string;
};

export type DepartmentUpdateInput = Partial<DepartmentCreateInput>;

export type AppointmentCreateInput = {
    date: Date;
    status?: string;
    doctorId: number;
    patientId: number;
    notes?: string;
};

export type AppointmentUpdateInput = Partial<AppointmentCreateInput>;

export type MedicalRecordCreateInput = {
    diagnosis: string;
    treatment: string;
    prescription?: string;
    notes?: string;
    date: Date;
    patientId: number;
    doctorId: number;
};

export type MedicalRecordUpdateInput = Partial<MedicalRecordCreateInput>; 