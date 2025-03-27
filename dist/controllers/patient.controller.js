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
exports.deletePatient = exports.updatePatient = exports.createPatient = exports.getPatientByEmail = exports.getPatientById = exports.getAllPatients = void 0;
const schema_registry_1 = require("../schemas/schema.registry");
const patient_service_1 = require("../services/patient.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const getAllPatients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield (0, patient_service_1.getAllPatientsService)();
        res.status(200).json({
            status: 'success',
            data: {
                patients
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPatients = getAllPatients;
const getPatientById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const patient = yield (0, patient_service_1.getPatientByIdService)(id);
        if (!patient) {
            next(new error_middleware_1.AppError('Hasta bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                patient
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getPatientById = getPatientById;
const getPatientByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const patient = yield (0, patient_service_1.getPatientByEmailService)(email);
        if (!patient) {
            next(new error_middleware_1.AppError('Hasta bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                patient
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getPatientByEmail = getPatientByEmail;
const createPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientData = schema_registry_1.patientCreateSchema.parse(req.body);
        const patient = yield (0, patient_service_1.createPatientService)(patientData);
        res.status(201).json({
            status: 'success',
            data: {
                patient
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createPatient = createPatient;
const updatePatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const patientData = schema_registry_1.patientUpdateSchema.parse(req.body);
        const patient = yield (0, patient_service_1.updatePatientService)(id, patientData);
        if (!patient) {
            next(new error_middleware_1.AppError('Hasta bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                patient
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePatient = updatePatient;
const deletePatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const patient = yield (0, patient_service_1.deletePatientService)(id);
        if (!patient) {
            next(new error_middleware_1.AppError('Hasta bulunamadı', 404));
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
exports.deletePatient = deletePatient;
