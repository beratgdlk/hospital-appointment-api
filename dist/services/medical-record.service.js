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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedicalRecordService = exports.updateMedicalRecordService = exports.createMedicalRecordService = exports.getMedicalRecordsByPatientIdService = exports.getMedicalRecordByIdService = exports.getAllMedicalRecordsService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAllMedicalRecordsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.medicalRecord.findMany({
        include: {
            patient: true,
            doctor: true,
        },
    });
});
exports.getAllMedicalRecordsService = getAllMedicalRecordsService;
const getMedicalRecordByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.medicalRecord.findUnique({
        where: { id },
        include: {
            patient: true,
            doctor: true,
        },
    });
});
exports.getMedicalRecordByIdService = getMedicalRecordByIdService;
const getMedicalRecordsByPatientIdService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.medicalRecord.findMany({
        where: { patientId },
        include: {
            patient: true,
            doctor: true,
        },
        orderBy: {
            date: 'desc',
        },
    });
});
exports.getMedicalRecordsByPatientIdService = getMedicalRecordsByPatientIdService;
const createMedicalRecordService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.medicalRecord.create({
        data,
        include: {
            patient: true,
            doctor: true,
        },
    });
});
exports.createMedicalRecordService = createMedicalRecordService;
const updateMedicalRecordService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.medicalRecord.update({
        where: { id },
        data,
        include: {
            patient: true,
            doctor: true,
        },
    });
});
exports.updateMedicalRecordService = updateMedicalRecordService;
const deleteMedicalRecordService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.medicalRecord.delete({
        where: { id },
    });
});
exports.deleteMedicalRecordService = deleteMedicalRecordService;
