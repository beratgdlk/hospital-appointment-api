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
exports.deletePatientHistoryService = exports.updatePatientHistoryService = exports.createPatientHistoryService = exports.getPatientHistoryByRecordTypeService = exports.getPatientHistoryByPatientIdService = exports.getPatientHistoryByIdService = exports.getAllPatientHistoryService = void 0;
const client_1 = require("@prisma/client");
const socket_service_1 = require("./socket.service");
const prisma = new client_1.PrismaClient();
// Using 'any' type temporarily to avoid TypeScript errors
// This can be removed when the Prisma schema is properly generated
const patientHistoryModel = prisma.patientHistory;
/**
 * Retrieves all patient history records
 * @returns Array of patient history records
 */
const getAllPatientHistoryService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield patientHistoryModel.findMany({
            include: {
                patient: true,
            },
        });
    }
    catch (error) {
        console.error('PatientHistory model not yet created in database:', error);
        return [];
    }
});
exports.getAllPatientHistoryService = getAllPatientHistoryService;
/**
 * Retrieves a specific patient history record by ID
 * @param id Patient history record ID
 * @returns Patient history record
 */
const getPatientHistoryByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield patientHistoryModel.findUnique({
            where: { id },
            include: {
                patient: true,
            },
        });
    }
    catch (error) {
        console.error('PatientHistory model not yet created in database:', error);
        return null;
    }
});
exports.getPatientHistoryByIdService = getPatientHistoryByIdService;
/**
 * Retrieves all history records for a specific patient
 * @param patientId Patient ID
 * @returns Array of patient history records
 */
const getPatientHistoryByPatientIdService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield patientHistoryModel.findMany({
            where: { patientId },
            include: {
                patient: true,
            },
            orderBy: {
                performedAt: 'desc',
            },
        });
    }
    catch (error) {
        console.error('PatientHistory model not yet created in database:', error);
        return [];
    }
});
exports.getPatientHistoryByPatientIdService = getPatientHistoryByPatientIdService;
/**
 * Retrieves patient history records filtered by record type
 * @param patientId Patient ID
 * @param recordType Record type
 * @returns Array of patient history records
 */
const getPatientHistoryByRecordTypeService = (patientId, recordType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield patientHistoryModel.findMany({
            where: {
                patientId,
                recordType: recordType,
            },
            include: {
                patient: true,
            },
            orderBy: {
                performedAt: 'desc',
            },
        });
    }
    catch (error) {
        console.error('PatientHistory model not yet created in database:', error);
        return [];
    }
});
exports.getPatientHistoryByRecordTypeService = getPatientHistoryByRecordTypeService;
/**
 * Creates a new patient history record
 * @param data Patient history data
 * @returns Created patient history record
 */
const createPatientHistoryService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield patientHistoryModel.create({
            data,
            include: {
                patient: true,
            },
        });
        // Notify patients of history update via WebSocket
        (0, socket_service_1.emitPatientHistoryUpdate)({
            patientId: history.patientId,
            recordId: history.id,
            action: 'added',
            timestamp: new Date(),
        });
        return history;
    }
    catch (error) {
        console.error('PatientHistory model not yet created in database:', error);
        // Return default object if creation fails
        return Object.assign(Object.assign({ id: 0 }, data), { createdAt: new Date(), updatedAt: new Date(), patient: null });
    }
});
exports.createPatientHistoryService = createPatientHistoryService;
/**
 * Updates an existing patient history record
 * @param id Patient history record ID
 * @param data Update data
 * @returns Updated patient history record
 */
const updatePatientHistoryService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield patientHistoryModel.update({
            where: { id },
            data,
            include: {
                patient: true,
            },
        });
        // Notify patients of history update via WebSocket
        (0, socket_service_1.emitPatientHistoryUpdate)({
            patientId: history.patientId,
            recordId: history.id,
            action: 'updated',
            timestamp: new Date(),
        });
        return history;
    }
    catch (error) {
        console.error('PatientHistory model not yet created in database:', error);
        return null;
    }
});
exports.updatePatientHistoryService = updatePatientHistoryService;
/**
 * Deletes a patient history record
 * @param id Patient history record ID
 * @returns Deleted patient history record
 */
const deletePatientHistoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield patientHistoryModel.delete({
            where: { id },
            include: {
                patient: true,
            },
        });
        // Notify patients of history update via WebSocket
        (0, socket_service_1.emitPatientHistoryUpdate)({
            patientId: history.patientId,
            recordId: history.id,
            action: 'deleted',
            timestamp: new Date(),
        });
        return history;
    }
    catch (error) {
        console.error('PatientHistory model not yet created in database:', error);
        return null;
    }
});
exports.deletePatientHistoryService = deletePatientHistoryService;
