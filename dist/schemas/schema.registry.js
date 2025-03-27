"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientHistoryUpdateSchema = exports.patientHistoryCreateSchema = exports.medicalRecordUpdateSchema = exports.medicalRecordCreateSchema = exports.appointmentUpdateSchema = exports.appointmentCreateSchema = exports.departmentUpdateSchema = exports.departmentCreateSchema = exports.doctorUpdateSchema = exports.doctorCreateSchema = exports.patientUpdateSchema = exports.patientCreateSchema = exports.userUpdateSchema = exports.userCreateSchema = exports.patientHistorySchema = exports.medicalRecordSchema = exports.appointmentSchema = exports.patientSchema = exports.departmentSchema = exports.doctorSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const base_schema_1 = require("./base.schema");
// Base schemas for models - without relationships
exports.userSchema = base_schema_1.baseUserSchema;
exports.doctorSchema = base_schema_1.baseDoctorSchema;
exports.departmentSchema = base_schema_1.baseDepartmentSchema;
exports.patientSchema = base_schema_1.basePatientSchema;
exports.appointmentSchema = base_schema_1.baseAppointmentSchema;
exports.medicalRecordSchema = base_schema_1.baseMedicalRecordSchema;
exports.patientHistorySchema = base_schema_1.basePatientHistorySchema;
// Create and Update schemas
exports.userCreateSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    role: zod_1.z.string(),
});
exports.userUpdateSchema = exports.userCreateSchema.partial();
exports.patientCreateSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    dateOfBirth: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]),
    gender: zod_1.z.string(),
    address: zod_1.z.string(),
});
exports.patientUpdateSchema = exports.patientCreateSchema.partial();
exports.doctorCreateSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    departmentId: zod_1.z.number(),
    specialization: zod_1.z.string(),
    licenseNumber: zod_1.z.string(),
    experience: zod_1.z.number(),
    education: zod_1.z.string(),
    managedDepartmentId: zod_1.z.number().optional(),
});
exports.doctorUpdateSchema = exports.doctorCreateSchema.partial();
exports.departmentCreateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    location: zod_1.z.string(),
});
exports.departmentUpdateSchema = exports.departmentCreateSchema.partial();
exports.appointmentCreateSchema = zod_1.z.object({
    date: zod_1.z.date(),
    status: zod_1.z.string().optional(),
    doctorId: zod_1.z.number(),
    patientId: zod_1.z.number(),
    notes: zod_1.z.string().optional(),
});
exports.appointmentUpdateSchema = exports.appointmentCreateSchema.partial();
exports.medicalRecordCreateSchema = zod_1.z.object({
    diagnosis: zod_1.z.string(),
    treatment: zod_1.z.string(),
    prescription: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
    date: zod_1.z.date(),
    patientId: zod_1.z.number(),
    doctorId: zod_1.z.number(),
});
exports.medicalRecordUpdateSchema = exports.medicalRecordCreateSchema.partial();
exports.patientHistoryCreateSchema = zod_1.z.object({
    patientId: zod_1.z.number(),
    recordType: zod_1.z.enum(['appointment', 'medical_record', 'prescription', 'test_result', 'other']),
    recordId: zod_1.z.number(),
    action: zod_1.z.enum(['created', 'updated', 'canceled', 'completed']),
    details: zod_1.z.string().optional().nullable(),
    performedBy: zod_1.z.number(),
    performedAt: zod_1.z.date().optional().default(() => new Date()),
});
exports.patientHistoryUpdateSchema = exports.patientHistoryCreateSchema.partial();
