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
const appointment_service_1 = require("../services/appointment.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const getAllAppointments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointment_service_1.getAllAppointmentsService)();
        res.status(200).json({
            status: 'success',
            data: appointments,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield (0, appointment_service_1.getAppointmentByIdService)(Number(id));
        if (!appointment) {
            throw new error_middleware_1.AppError('Appointment not found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: appointment,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAppointmentById = getAppointmentById;
const getAppointmentsByPatientId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientId } = req.params;
        const appointments = yield (0, appointment_service_1.getAppointmentsByPatientIdService)(Number(patientId));
        res.status(200).json({
            status: 'success',
            data: appointments,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAppointmentsByPatientId = getAppointmentsByPatientId;
const getAppointmentsByDoctorId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorId } = req.params;
        const appointments = yield (0, appointment_service_1.getAppointmentsByDoctorIdService)(Number(doctorId));
        res.status(200).json({
            status: 'success',
            data: appointments,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAppointmentsByDoctorId = getAppointmentsByDoctorId;
const createAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = yield (0, appointment_service_1.createAppointmentService)(req.body);
        res.status(201).json({
            status: 'success',
            data: newAppointment,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createAppointment = createAppointment;
const updateAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingAppointment = yield (0, appointment_service_1.getAppointmentByIdService)(Number(id));
        if (!existingAppointment) {
            throw new error_middleware_1.AppError('Appointment not found', 404);
        }
        const updatedAppointment = yield (0, appointment_service_1.updateAppointmentService)(Number(id), req.body);
        res.status(200).json({
            status: 'success',
            data: updatedAppointment,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateAppointment = updateAppointment;
const deleteAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingAppointment = yield (0, appointment_service_1.getAppointmentByIdService)(Number(id));
        if (!existingAppointment) {
            throw new error_middleware_1.AppError('Appointment not found', 404);
        }
        yield (0, appointment_service_1.deleteAppointmentService)(Number(id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAppointment = deleteAppointment;
