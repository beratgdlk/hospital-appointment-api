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
exports.deletePatientHistory = exports.updatePatientHistory = exports.createPatientHistory = exports.getPatientHistoryByRecordType = exports.getPatientHistoryByPatientId = exports.getPatientHistoryById = exports.getAllPatientHistory = void 0;
const schema_registry_1 = require("../schemas/schema.registry");
const patient_history_service_1 = require("../services/patient-history.service");
const error_middleware_1 = require("../middlewares/error.middleware");
/**
 * Retrieves all patient history records
 */
const getAllPatientHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield (0, patient_history_service_1.getAllPatientHistoryService)();
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
exports.getAllPatientHistory = getAllPatientHistory;
/**
 * Retrieves a specific patient history record by ID
 */
const getPatientHistoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const record = yield (0, patient_history_service_1.getPatientHistoryByIdService)(id);
        if (!record) {
            next(new error_middleware_1.AppError('Patient history record not found', 404));
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
exports.getPatientHistoryById = getPatientHistoryById;
/**
 * Retrieves all history records for a specific patient
 */
const getPatientHistoryByPatientId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = Number(req.params.patientId);
        const records = yield (0, patient_history_service_1.getPatientHistoryByPatientIdService)(patientId);
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
exports.getPatientHistoryByPatientId = getPatientHistoryByPatientId;
/**
 * Retrieves patient history records filtered by record type
 */
const getPatientHistoryByRecordType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = Number(req.params.patientId);
        const recordType = req.params.recordType;
        const records = yield (0, patient_history_service_1.getPatientHistoryByRecordTypeService)(patientId, recordType);
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
exports.getPatientHistoryByRecordType = getPatientHistoryByRecordType;
/**
 * Creates a new patient history record
 */
const createPatientHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historyData = schema_registry_1.patientHistoryCreateSchema.parse(req.body);
        const record = yield (0, patient_history_service_1.createPatientHistoryService)(historyData);
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
exports.createPatientHistory = createPatientHistory;
/**
 * Updates an existing patient history record
 */
const updatePatientHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const historyData = schema_registry_1.patientHistoryUpdateSchema.parse(req.body);
        const record = yield (0, patient_history_service_1.updatePatientHistoryService)(id, historyData);
        if (!record) {
            next(new error_middleware_1.AppError('Patient history record not found', 404));
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
exports.updatePatientHistory = updatePatientHistory;
/**
 * Deletes a patient history record
 */
const deletePatientHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const record = yield (0, patient_history_service_1.deletePatientHistoryService)(id);
        if (!record) {
            next(new error_middleware_1.AppError('Patient history record not found', 404));
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
exports.deletePatientHistory = deletePatientHistory;
