"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDoctorUpdate = exports.validateDoctor = exports.doctorUpdateSchema = exports.doctorSchema = void 0;
const zod_1 = require("zod");
exports.doctorSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive('Geçerli bir kullanıcı ID\'si giriniz'),
    departmentId: zod_1.z.number().int().positive('Geçerli bir departman ID\'si giriniz'),
    specialization: zod_1.z.string().min(3, 'Uzmanlık alanı en az 3 karakter olmalıdır'),
    licenseNumber: zod_1.z.string().min(5, 'Lisans numarası en az 5 karakter olmalıdır'),
    experience: zod_1.z.number().int().min(0, 'Deneyim yılı 0 veya daha büyük olmalıdır'),
    education: zod_1.z.string().min(5, 'Eğitim bilgisi en az 5 karakter olmalıdır'),
});
exports.doctorUpdateSchema = exports.doctorSchema.partial();
const validateDoctor = (data) => exports.doctorSchema.parse(data);
exports.validateDoctor = validateDoctor;
const validateDoctorUpdate = (data) => exports.doctorUpdateSchema.parse(data);
exports.validateDoctorUpdate = validateDoctorUpdate;
