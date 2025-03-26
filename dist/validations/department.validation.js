"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDepartmentUpdate = exports.validateDepartment = exports.departmentUpdateSchema = exports.departmentSchema = void 0;
const zod_1 = require("zod");
exports.departmentSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'Departman adı en az 3 karakter olmalıdır'),
    description: zod_1.z.string().min(10, 'Açıklama en az 10 karakter olmalıdır'),
    location: zod_1.z.string().min(5, 'Konum en az 5 karakter olmalıdır'),
    headDoctorId: zod_1.z.number().int().positive('Geçerli bir başhekim ID\'si giriniz').optional(),
});
exports.departmentUpdateSchema = exports.departmentSchema.partial();
const validateDepartment = (data) => exports.departmentSchema.parse(data);
exports.validateDepartment = validateDepartment;
const validateDepartmentUpdate = (data) => exports.departmentUpdateSchema.parse(data);
exports.validateDepartmentUpdate = validateDepartmentUpdate;
