"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserUpdate = exports.validateUser = exports.userUpdateSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    email: zod_1.z.string().email('Geçerli bir e-posta adresi giriniz'),
    password: zod_1.z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
    firstName: zod_1.z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
    lastName: zod_1.z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
    role: zod_1.z.enum(['admin', 'doctor', 'secretary'], {
        errorMap: () => ({ message: 'Geçerli bir rol seçiniz (admin, doctor, secretary)' }),
    }),
});
exports.userUpdateSchema = exports.userSchema.extend({
    password: zod_1.z.string().min(6, 'Şifre en az 6 karakter olmalıdır').optional(),
}).partial();
const validateUser = (data) => exports.userSchema.parse(data);
exports.validateUser = validateUser;
const validateUserUpdate = (data) => exports.userUpdateSchema.parse(data);
exports.validateUserUpdate = validateUserUpdate;
