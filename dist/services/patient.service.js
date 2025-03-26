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
exports.deletePatientService = exports.updatePatientService = exports.createPatientService = exports.getPatientByEmailService = exports.getPatientByIdService = exports.getAllPatientsService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAllPatientsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.patient.findMany({
        include: {
            appointments: true,
            medicalRecords: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
});
exports.getAllPatientsService = getAllPatientsService;
const getPatientByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.patient.findUnique({
        where: { id },
        include: {
            appointments: true,
            medicalRecords: true,
        },
    });
});
exports.getPatientByIdService = getPatientByIdService;
const getPatientByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.patient.findUnique({
        where: { email },
    });
});
exports.getPatientByEmailService = getPatientByEmailService;
const createPatientService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.patient.create({
        data,
        include: {
            appointments: true,
            medicalRecords: true,
        },
    });
});
exports.createPatientService = createPatientService;
const updatePatientService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.patient.update({
        where: { id },
        data,
        include: {
            appointments: true,
            medicalRecords: true,
        },
    });
});
exports.updatePatientService = updatePatientService;
const deletePatientService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.patient.delete({
        where: { id },
    });
});
exports.deletePatientService = deletePatientService;
