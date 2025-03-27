"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointmentService = exports.updateAppointmentService = exports.createAppointmentService = exports.getAppointmentsByDoctorIdService = exports.getAppointmentsByPatientIdService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
/**
 * Tüm randevuları getirir
 * @returns Tüm randevular
 */
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient.appointment.findMany({
        include: {
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
            patient: true,
        },
    });
});
exports.getAllAppointmentsService = getAllAppointmentsService;
/**
 * ID'ye göre randevu getirir
 * @param id Randevu ID'si
 * @returns Randevu
 */
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient.appointment.findUnique({
        where: { id },
        include: {
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
            patient: true,
        },
    });
});
exports.getAppointmentByIdService = getAppointmentByIdService;
/**
 * Hasta ID'sine göre randevuları getirir
 * @param patientId Hasta ID'si
 * @returns Randevular
 */
const getAppointmentsByPatientIdService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient.appointment.findMany({
        where: { patientId },
        include: {
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
            patient: true,
        },
    });
});
exports.getAppointmentsByPatientIdService = getAppointmentsByPatientIdService;
/**
 * Doktor ID'sine göre randevuları getirir
 * @param doctorId Doktor ID'si
 * @returns Randevular
 */
const getAppointmentsByDoctorIdService = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient.appointment.findMany({
        where: { doctorId },
        include: {
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
            patient: true,
        },
    });
});
exports.getAppointmentsByDoctorIdService = getAppointmentsByDoctorIdService;
/**
 * Yeni randevu oluşturur
 * @param data Randevu verileri
 * @returns Oluşturulan randevu
 */
const createAppointmentService = (validatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient.appointment.create({
        data: {
            date: validatedData.date,
            status: validatedData.status ? validatedData.status : 'scheduled',
            doctorId: validatedData.doctorId,
            patientId: validatedData.patientId,
            notes: validatedData.notes || null,
        },
        include: {
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
            patient: true,
        },
    });
});
exports.createAppointmentService = createAppointmentService;
/**
 * Randevu günceller
 * @param id Randevu ID'si
 * @param data Güncelleme verileri
 * @returns Güncellenen randevu
 */
const updateAppointmentService = (id, validatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient.appointment.update({
        where: { id },
        data: {
            date: validatedData.date,
            status: validatedData.status ? validatedData.status : undefined,
            doctorId: validatedData.doctorId,
            patientId: validatedData.patientId,
            notes: validatedData.notes,
        },
        include: {
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
            patient: true,
        },
    });
});
exports.updateAppointmentService = updateAppointmentService;
/**
 * Randevu siler
 * @param id Randevu ID'si
 * @returns Silinen randevu
 */
const deleteAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient.appointment.delete({
        where: { id },
    });
});
exports.deleteAppointmentService = deleteAppointmentService;
