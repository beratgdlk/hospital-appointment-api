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
const database_1 = require("../config/database");
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.appointment.findMany({
        include: {
            patient: true,
            doctor: true,
        },
    });
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.appointment.findUnique({
        where: { id },
        include: {
            patient: true,
            doctor: true,
        },
    });
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const getAppointmentsByPatientIdService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.appointment.findMany({
        where: { patientId },
        include: {
            patient: true,
            doctor: true,
        },
    });
});
exports.getAppointmentsByPatientIdService = getAppointmentsByPatientIdService;
const getAppointmentsByDoctorIdService = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.appointment.findMany({
        where: { doctorId },
        include: {
            patient: true,
            doctor: true,
        },
    });
});
exports.getAppointmentsByDoctorIdService = getAppointmentsByDoctorIdService;
const createAppointmentService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.appointment.create({
        data,
        include: {
            patient: true,
            doctor: true,
        },
    });
});
exports.createAppointmentService = createAppointmentService;
const updateAppointmentService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.appointment.update({
        where: { id },
        data,
        include: {
            patient: true,
            doctor: true,
        },
    });
});
exports.updateAppointmentService = updateAppointmentService;
const deleteAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.appointment.delete({
        where: { id },
    });
});
exports.deleteAppointmentService = deleteAppointmentService;
