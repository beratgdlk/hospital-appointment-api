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
exports.deleteDoctorService = exports.updateDoctorService = exports.createDoctorService = exports.getDoctorByIdService = exports.getAllDoctorsService = void 0;
const database_1 = require("../config/database");
const schema_registry_1 = require("../schemas/schema.registry");
const getAllDoctorsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const doctors = yield database_1.prisma.doctor.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            department: true,
            appointments: {
                include: {
                    patient: true,
                },
            },
            medicalRecords: {
                include: {
                    patient: true,
                },
            },
            managedDepartment: true,
        },
    });
    return doctors.map(doctor => schema_registry_1.doctorSchema.parse(doctor));
});
exports.getAllDoctorsService = getAllDoctorsService;
const getDoctorByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield database_1.prisma.doctor.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            department: true,
            appointments: {
                include: {
                    patient: true,
                },
            },
            medicalRecords: {
                include: {
                    patient: true,
                },
            },
            managedDepartment: true,
        },
    });
    return doctor ? schema_registry_1.doctorSchema.parse(doctor) : null;
});
exports.getDoctorByIdService = getDoctorByIdService;
const createDoctorService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = schema_registry_1.doctorCreateSchema.parse(data);
    const createData = {
        user: {
            connect: { id: validatedData.userId },
        },
        department: {
            connect: { id: validatedData.departmentId },
        },
        specialization: validatedData.specialization,
        licenseNumber: validatedData.licenseNumber,
        experience: validatedData.experience,
        education: validatedData.education,
    };
    if (validatedData.managedDepartmentId) {
        createData.managedDepartment = {
            connect: { id: validatedData.managedDepartmentId },
        };
    }
    const doctor = yield database_1.prisma.doctor.create({
        data: createData,
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            department: true,
            appointments: {
                include: {
                    patient: true,
                },
            },
            medicalRecords: {
                include: {
                    patient: true,
                },
            },
            managedDepartment: true,
        },
    });
    return schema_registry_1.doctorSchema.parse(doctor);
});
exports.createDoctorService = createDoctorService;
const updateDoctorService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = schema_registry_1.doctorUpdateSchema.parse(data);
    const updateData = Object.assign({}, validatedData);
    if (validatedData.userId) {
        updateData.user = {
            connect: { id: validatedData.userId },
        };
        delete updateData.userId;
    }
    if (validatedData.departmentId) {
        updateData.department = {
            connect: { id: validatedData.departmentId },
        };
        delete updateData.departmentId;
    }
    if (validatedData.managedDepartmentId) {
        updateData.managedDepartment = {
            connect: { id: validatedData.managedDepartmentId },
        };
        delete updateData.managedDepartmentId;
    }
    const doctor = yield database_1.prisma.doctor.update({
        where: { id },
        data: updateData,
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            department: true,
            appointments: {
                include: {
                    patient: true,
                },
            },
            medicalRecords: {
                include: {
                    patient: true,
                },
            },
            managedDepartment: true,
        },
    });
    return schema_registry_1.doctorSchema.parse(doctor);
});
exports.updateDoctorService = updateDoctorService;
const deleteDoctorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield database_1.prisma.doctor.delete({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            department: true,
            appointments: {
                include: {
                    patient: true,
                },
            },
            medicalRecords: {
                include: {
                    patient: true,
                },
            },
            managedDepartment: true,
        },
    });
    return schema_registry_1.doctorSchema.parse(doctor);
});
exports.deleteDoctorService = deleteDoctorService;
