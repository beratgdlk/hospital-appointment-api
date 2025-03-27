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
exports.deleteAppointment = exports.updateAppointment = exports.createAppointment = exports.getAppointmentsByDoctorId = exports.getAppointmentsByPatientId = exports.getAppointmentById = exports.getAllAppointments = void 0;
const schema_registry_1 = require("../schemas/schema.registry");
const appointment_service_1 = require("../services/appointment.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const getAllAppointments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointment_service_1.getAllAppointmentsService)();
        res.status(200).json({
            status: 'success',
            data: {
                appointments
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const appointment = yield (0, appointment_service_1.getAppointmentByIdService)(id);
        if (!appointment) {
            next(new error_middleware_1.AppError('Randevu bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                appointment
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAppointmentById = getAppointmentById;
const getAppointmentsByPatientId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = Number(req.params.patientId);
        const appointments = yield (0, appointment_service_1.getAppointmentsByPatientIdService)(patientId);
        res.status(200).json({
            status: 'success',
            data: {
                appointments
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAppointmentsByPatientId = getAppointmentsByPatientId;
const getAppointmentsByDoctorId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorId = Number(req.params.doctorId);
        const appointments = yield (0, appointment_service_1.getAppointmentsByDoctorIdService)(doctorId);
        res.status(200).json({
            status: 'success',
            data: {
                appointments
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAppointmentsByDoctorId = getAppointmentsByDoctorId;
const createAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentData = schema_registry_1.appointmentCreateSchema.parse(req.body);
        const appointment = yield (0, appointment_service_1.createAppointmentService)(appointmentData);
        res.status(201).json({
            status: 'success',
            data: {
                appointment
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createAppointment = createAppointment;
const updateAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const appointmentData = schema_registry_1.appointmentUpdateSchema.parse(req.body);
        const appointment = yield (0, appointment_service_1.updateAppointmentService)(id, appointmentData);
        if (!appointment) {
            next(new error_middleware_1.AppError('Randevu bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                appointment
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateAppointment = updateAppointment;
const deleteAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const appointment = yield (0, appointment_service_1.deleteAppointmentService)(id);
        if (!appointment) {
            next(new error_middleware_1.AppError('Randevu bulunamadı', 404));
            return;
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAppointment = deleteAppointment;
