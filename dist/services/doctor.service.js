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
exports.deleteDoctorService = exports.updateDoctorService = exports.createDoctorService = exports.getDoctorByIdService = exports.getAllDoctorsService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAllDoctorsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.doctor.findMany({
        include: {
            department: true,
            appointments: {
                include: {
                    patient: true,
                },
            },
        },
    });
});
exports.getAllDoctorsService = getAllDoctorsService;
const getDoctorByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.doctor.findUnique({
        where: { id },
        include: {
            department: true,
            appointments: {
                include: {
                    patient: true,
                },
            },
        },
    });
});
exports.getDoctorByIdService = getDoctorByIdService;
const createDoctorService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.doctor.create({
        data,
        include: {
            department: true,
        },
    });
});
exports.createDoctorService = createDoctorService;
const updateDoctorService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.doctor.update({
        where: { id },
        data,
        include: {
            department: true,
        },
    });
});
exports.updateDoctorService = updateDoctorService;
const deleteDoctorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.doctor.delete({
        where: { id },
    });
});
exports.deleteDoctorService = deleteDoctorService;
