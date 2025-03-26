"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAppointmentUpdate = exports.validateAppointment = exports.appointmentUpdateSchema = exports.appointmentSchema = void 0;
const zod_1 = require("zod");
exports.appointmentSchema = zod_1.z.object({
    patientId: zod_1.z.number().int().positive('Geçerli bir hasta ID\'si giriniz'),
    doctorId: zod_1.z.number().int().positive('Geçerli bir doktor ID\'si giriniz'),
    appointmentDate: zod_1.z.string().refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
    }, 'Geçerli ve gelecek bir tarih giriniz'),
    status: zod_1.z.enum(['scheduled', 'completed', 'cancelled'], {
        errorMap: () => ({ message: 'Geçerli bir durum seçiniz (scheduled, completed, cancelled)' }),
    }),
    notes: zod_1.z.string().optional(),
});
exports.appointmentUpdateSchema = exports.appointmentSchema.partial();
const validateAppointment = (data) => exports.appointmentSchema.parse(data);
exports.validateAppointment = validateAppointment;
const validateAppointmentUpdate = (data) => exports.appointmentUpdateSchema.parse(data);
exports.validateAppointmentUpdate = validateAppointmentUpdate;
