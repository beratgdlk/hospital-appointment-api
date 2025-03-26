"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatientUpdate = exports.validatePatient = exports.patientUpdateSchema = exports.patientSchema = void 0;
const zod_1 = require("zod");
exports.patientSchema = zod_1.z.object({
    email: zod_1.z.string().email('Geçerli bir e-posta adresi giriniz'),
    firstName: zod_1.z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
    lastName: zod_1.z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
    phone: zod_1.z.string().regex(/^[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz (10 haneli)'),
    dateOfBirth: zod_1.z.string().refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }, 'Geçerli bir doğum tarihi giriniz'),
    gender: zod_1.z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'Geçerli bir cinsiyet seçiniz (male, female, other)' }),
    }),
    address: zod_1.z.string().min(5, 'Adres en az 5 karakter olmalıdır'),
});
exports.patientUpdateSchema = exports.patientSchema.partial();
const validatePatient = (data) => exports.patientSchema.parse(data);
exports.validatePatient = validatePatient;
const validatePatientUpdate = (data) => exports.patientUpdateSchema.parse(data);
exports.validatePatientUpdate = validatePatientUpdate;
