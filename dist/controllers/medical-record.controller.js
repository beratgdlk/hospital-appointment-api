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
const schema_registry_1 = require("../schemas/schema.registry");
const medical_record_service_1 = require("../services/medical-record.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const getAllMedicalRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield (0, medical_record_service_1.getAllMedicalRecordsService)();
        res.status(200).json({
            status: 'success',
            data: {
                records
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllMedicalRecords = getAllMedicalRecords;
const getMedicalRecordById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const record = yield (0, medical_record_service_1.getMedicalRecordByIdService)(id);
        if (!record) {
            next(new error_middleware_1.AppError('Tıbbi kayıt bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                record
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMedicalRecordById = getMedicalRecordById;
const getMedicalRecordsByPatientId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = Number(req.params.patientId);
        const records = yield (0, medical_record_service_1.getMedicalRecordsByPatientIdService)(patientId);
        res.status(200).json({
            status: 'success',
            data: {
                records
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMedicalRecordsByPatientId = getMedicalRecordsByPatientId;
const createMedicalRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recordData = schema_registry_1.medicalRecordCreateSchema.parse(req.body);
        const record = yield (0, medical_record_service_1.createMedicalRecordService)(recordData);
        res.status(201).json({
            status: 'success',
            data: {
                record
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createMedicalRecord = createMedicalRecord;
const updateMedicalRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const recordData = schema_registry_1.medicalRecordUpdateSchema.parse(req.body);
        const record = yield (0, medical_record_service_1.updateMedicalRecordService)(id, recordData);
        if (!record) {
            next(new error_middleware_1.AppError('Tıbbi kayıt bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                record
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateMedicalRecord = updateMedicalRecord;
const deleteMedicalRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const record = yield (0, medical_record_service_1.deleteMedicalRecordService)(id);
        if (!record) {
            next(new error_middleware_1.AppError('Tıbbi kayıt bulunamadı', 404));
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
exports.deleteMedicalRecord = deleteMedicalRecord;
