"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMedicalRecordUpdate = exports.validateMedicalRecord = exports.medicalRecordUpdateSchema = exports.medicalRecordSchema = void 0;
const zod_1 = require("zod");
exports.medicalRecordSchema = zod_1.z.object({
    patientId: zod_1.z.number().int().positive('Geçerli bir hasta ID\'si giriniz'),
    doctorId: zod_1.z.number().int().positive('Geçerli bir doktor ID\'si giriniz'),
    diagnosis: zod_1.z.string().min(3, 'Tanı en az 3 karakter olmalıdır'),
    treatment: zod_1.z.string().min(3, 'Tedavi en az 3 karakter olmalıdır'),
    prescription: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
    visitDate: zod_1.z.string().refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }, 'Geçerli bir ziyaret tarihi giriniz'),
});
exports.medicalRecordUpdateSchema = exports.medicalRecordSchema.partial();
const validateMedicalRecord = (data) => exports.medicalRecordSchema.parse(data);
exports.validateMedicalRecord = validateMedicalRecord;
const validateMedicalRecordUpdate = (data) => exports.medicalRecordUpdateSchema.parse(data);
exports.validateMedicalRecordUpdate = validateMedicalRecordUpdate;
