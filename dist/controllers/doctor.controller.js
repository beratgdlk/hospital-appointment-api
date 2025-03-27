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
exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.getDoctorById = exports.getAllDoctors = void 0;
const schema_registry_1 = require("../schemas/schema.registry");
const doctor_service_1 = require("../services/doctor.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const getAllDoctors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield (0, doctor_service_1.getAllDoctorsService)();
        res.status(200).json({
            status: 'success',
            data: {
                doctors
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllDoctors = getAllDoctors;
const getDoctorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const doctor = yield (0, doctor_service_1.getDoctorByIdService)(id);
        if (!doctor) {
            next(new error_middleware_1.AppError('Doktor bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                doctor
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getDoctorById = getDoctorById;
const createDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorData = schema_registry_1.doctorCreateSchema.parse(req.body);
        const doctor = yield (0, doctor_service_1.createDoctorService)(doctorData);
        res.status(201).json({
            status: 'success',
            data: {
                doctor
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createDoctor = createDoctor;
const updateDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const doctorData = schema_registry_1.doctorUpdateSchema.parse(req.body);
        const doctor = yield (0, doctor_service_1.updateDoctorService)(id, doctorData);
        if (!doctor) {
            next(new error_middleware_1.AppError('Doktor bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                doctor
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateDoctor = updateDoctor;
const deleteDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const doctor = yield (0, doctor_service_1.deleteDoctorService)(id);
        if (!doctor) {
            next(new error_middleware_1.AppError('Doktor bulunamadı', 404));
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
exports.deleteDoctor = deleteDoctor;
