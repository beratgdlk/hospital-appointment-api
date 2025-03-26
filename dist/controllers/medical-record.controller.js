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
exports.deleteMedicalRecord = exports.updateMedicalRecord = exports.createMedicalRecord = exports.getMedicalRecordsByPatientId = exports.getMedicalRecordById = exports.getAllMedicalRecords = void 0;
const medical_record_service_1 = require("../services/medical-record.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const getAllMedicalRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medicalRecords = yield (0, medical_record_service_1.getAllMedicalRecordsService)();
        res.status(200).json({
            status: 'success',
            data: medicalRecords,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllMedicalRecords = getAllMedicalRecords;
const getMedicalRecordById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const medicalRecord = yield (0, medical_record_service_1.getMedicalRecordByIdService)(Number(id));
        if (!medicalRecord) {
            throw new error_middleware_1.AppError('Medical record not found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: medicalRecord,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMedicalRecordById = getMedicalRecordById;
const getMedicalRecordsByPatientId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientId } = req.params;
        const medicalRecords = yield (0, medical_record_service_1.getMedicalRecordsByPatientIdService)(Number(patientId));
        res.status(200).json({
            status: 'success',
            data: medicalRecords,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMedicalRecordsByPatientId = getMedicalRecordsByPatientId;
const createMedicalRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMedicalRecord = yield (0, medical_record_service_1.createMedicalRecordService)(req.body);
        res.status(201).json({
            status: 'success',
            data: newMedicalRecord,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createMedicalRecord = createMedicalRecord;
const updateMedicalRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingRecord = yield (0, medical_record_service_1.getMedicalRecordByIdService)(Number(id));
        if (!existingRecord) {
            throw new error_middleware_1.AppError('Medical record not found', 404);
        }
        const updatedMedicalRecord = yield (0, medical_record_service_1.updateMedicalRecordService)(Number(id), req.body);
        res.status(200).json({
            status: 'success',
            data: updatedMedicalRecord,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateMedicalRecord = updateMedicalRecord;
const deleteMedicalRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingRecord = yield (0, medical_record_service_1.getMedicalRecordByIdService)(Number(id));
        if (!existingRecord) {
            throw new error_middleware_1.AppError('Medical record not found', 404);
        }
        yield (0, medical_record_service_1.deleteMedicalRecordService)(Number(id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteMedicalRecord = deleteMedicalRecord;
