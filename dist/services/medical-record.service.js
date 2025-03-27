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
exports.getDoctorMedicalRecordsService = exports.getPatientMedicalRecordsService = exports.deleteMedicalRecordService = exports.updateMedicalRecordService = exports.createMedicalRecordService = exports.getMedicalRecordsByPatientIdService = exports.getMedicalRecordByIdService = exports.getAllMedicalRecordsService = void 0;
const database_1 = require("../config/database");
const schema_registry_1 = require("../schemas/schema.registry");
const getAllMedicalRecordsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield database_1.prisma.medicalRecord.findMany({
        include: {
            patient: true,
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
        },
    });
    return records.map(record => schema_registry_1.medicalRecordSchema.parse(record));
});
exports.getAllMedicalRecordsService = getAllMedicalRecordsService;
const getMedicalRecordByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield database_1.prisma.medicalRecord.findUnique({
        where: { id },
        include: {
            patient: true,
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
        },
    });
    return record ? schema_registry_1.medicalRecordSchema.parse(record) : null;
});
exports.getMedicalRecordByIdService = getMedicalRecordByIdService;
const getMedicalRecordsByPatientIdService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield database_1.prisma.medicalRecord.findMany({
        where: { patientId },
        include: {
            patient: true,
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
        },
    });
    return records.map(record => schema_registry_1.medicalRecordSchema.parse(record));
});
exports.getMedicalRecordsByPatientIdService = getMedicalRecordsByPatientIdService;
const createMedicalRecordService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = schema_registry_1.medicalRecordCreateSchema.parse(data);
    const record = yield database_1.prisma.medicalRecord.create({
        data: {
            diagnosis: validatedData.diagnosis,
            treatment: validatedData.treatment,
            prescription: validatedData.prescription || null,
            notes: validatedData.notes || null,
            date: validatedData.date,
            patient: {
                connect: { id: validatedData.patientId },
            },
            doctor: {
                connect: { id: validatedData.doctorId },
            },
        },
        include: {
            patient: true,
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
        },
    });
    return schema_registry_1.medicalRecordSchema.parse(record);
});
exports.createMedicalRecordService = createMedicalRecordService;
const updateMedicalRecordService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = schema_registry_1.medicalRecordUpdateSchema.parse(data);
    const updateData = Object.assign({}, validatedData);
    if (validatedData.patientId) {
        updateData.patient = {
            connect: { id: validatedData.patientId },
        };
        delete updateData.patientId;
    }
    if (validatedData.doctorId) {
        updateData.doctor = {
            connect: { id: validatedData.doctorId },
        };
        delete updateData.doctorId;
    }
    const record = yield database_1.prisma.medicalRecord.update({
        where: { id },
        data: updateData,
        include: {
            patient: true,
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
        },
    });
    return schema_registry_1.medicalRecordSchema.parse(record);
});
exports.updateMedicalRecordService = updateMedicalRecordService;
const deleteMedicalRecordService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield database_1.prisma.medicalRecord.delete({
        where: { id },
        include: {
            patient: true,
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
        },
    });
    return schema_registry_1.medicalRecordSchema.parse(record);
});
exports.deleteMedicalRecordService = deleteMedicalRecordService;
const getPatientMedicalRecordsService = (patientId) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield database_1.prisma.medicalRecord.findMany({
        where: { patientId },
        include: {
            patient: true,
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
        },
    });
    return records.map(record => schema_registry_1.medicalRecordSchema.parse(record));
});
exports.getPatientMedicalRecordsService = getPatientMedicalRecordsService;
const getDoctorMedicalRecordsService = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    const records = yield database_1.prisma.medicalRecord.findMany({
        where: { doctorId },
        include: {
            patient: true,
            doctor: {
                include: {
                    user: true,
                    department: true,
                },
            },
        },
    });
    return records.map(record => schema_registry_1.medicalRecordSchema.parse(record));
});
exports.getDoctorMedicalRecordsService = getDoctorMedicalRecordsService;
