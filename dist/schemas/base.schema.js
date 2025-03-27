"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientHistorySchema = exports.basePatientHistorySchema = exports.baseMedicalRecordSchema = exports.baseAppointmentSchema = exports.basePatientSchema = exports.baseDepartmentSchema = exports.baseDoctorSchema = exports.baseUserSchema = void 0;
const zod_1 = require("zod");
// Base schemas without relations
exports.baseUserSchema = zod_1.z.object({
    id: zod_1.z.number(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    role: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.baseDoctorSchema = zod_1.z.object({
    id: zod_1.z.number(),
    userId: zod_1.z.number(),
    departmentId: zod_1.z.number(),
    specialization: zod_1.z.string(),
    licenseNumber: zod_1.z.string(),
    experience: zod_1.z.number(),
    education: zod_1.z.string(),
    managedDepartmentId: zod_1.z.number().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.baseDepartmentSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    location: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.basePatientSchema = zod_1.z.object({
    id: zod_1.z.number(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    dateOfBirth: zod_1.z.date(),
    gender: zod_1.z.string(),
    address: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.baseAppointmentSchema = zod_1.z.object({
    id: zod_1.z.number(),
    date: zod_1.z.date(),
    status: zod_1.z.string(),
    doctorId: zod_1.z.number(),
    patientId: zod_1.z.number(),
    notes: zod_1.z.string().nullable(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.baseMedicalRecordSchema = zod_1.z.object({
    id: zod_1.z.number(),
    patientId: zod_1.z.number(),
    doctorId: zod_1.z.number(),
    diagnosis: zod_1.z.string(),
    treatment: zod_1.z.string(),
    prescription: zod_1.z.string().nullable(),
    notes: zod_1.z.string().nullable(),
    date: zod_1.z.date(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Yeni: Hasta geçmişi takibi için şema
exports.basePatientHistorySchema = zod_1.z.object({
    id: zod_1.z.number(),
    patientId: zod_1.z.number(),
    recordType: zod_1.z.enum(['appointment', 'medical_record', 'prescription', 'test_result', 'other']),
    recordId: zod_1.z.number(),
    action: zod_1.z.enum(['created', 'updated', 'canceled', 'completed']),
    details: zod_1.z.string().nullable(),
    performedBy: zod_1.z.number(), // Kullanıcı ID (doktor veya admin)
    performedAt: zod_1.z.date(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// New: Schema for patient history tracking
exports.patientHistorySchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    patientId: zod_1.z.number(),
    recordType: zod_1.z.string(),
    details: zod_1.z.string(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
    performedBy: zod_1.z.number(), // User ID (doctor or admin)
});
