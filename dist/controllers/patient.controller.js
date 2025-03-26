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
exports.deletePatient = exports.updatePatient = exports.createPatient = exports.getPatientById = exports.getAllPatients = void 0;
const patient_service_1 = require("../services/patient.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const getAllPatients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield (0, patient_service_1.getAllPatientsService)();
        res.status(200).json({
            status: 'success',
            data: patients,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPatients = getAllPatients;
const getPatientById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const patient = yield (0, patient_service_1.getPatientByIdService)(Number(id));
        if (!patient) {
            throw new error_middleware_1.AppError('Patient not found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: patient,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getPatientById = getPatientById;
const createPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingPatient = yield (0, patient_service_1.getPatientByEmailService)(req.body.email);
        if (existingPatient) {
            throw new error_middleware_1.AppError('A patient with this email already exists', 400);
        }
        const newPatient = yield (0, patient_service_1.createPatientService)(req.body);
        res.status(201).json({
            status: 'success',
            data: newPatient,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createPatient = createPatient;
const updatePatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingPatient = yield (0, patient_service_1.getPatientByIdService)(Number(id));
        if (!existingPatient) {
            throw new error_middleware_1.AppError('Patient not found', 404);
        }
        if (req.body.email && req.body.email !== existingPatient.email) {
            const patientWithEmail = yield (0, patient_service_1.getPatientByEmailService)(req.body.email);
            if (patientWithEmail) {
                throw new error_middleware_1.AppError('A patient with this email already exists', 400);
            }
        }
        const updatedPatient = yield (0, patient_service_1.updatePatientService)(Number(id), req.body);
        res.status(200).json({
            status: 'success',
            data: updatedPatient,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePatient = updatePatient;
const deletePatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingPatient = yield (0, patient_service_1.getPatientByIdService)(Number(id));
        if (!existingPatient) {
            throw new error_middleware_1.AppError('Patient not found', 404);
        }
        yield (0, patient_service_1.deletePatientService)(Number(id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.deletePatient = deletePatient;
