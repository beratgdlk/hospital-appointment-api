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
exports.removeHeadDoctorService = exports.assignHeadDoctorService = exports.deleteDepartmentService = exports.updateDepartmentService = exports.createDepartmentService = exports.getDepartmentByIdService = exports.getAllDepartmentsService = void 0;
const database_1 = require("../config/database");
const schema_registry_1 = require("../schemas/schema.registry");
const getAllDepartmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const departments = yield database_1.prisma.department.findMany({
        include: {
            doctors: {
                include: {
                    user: true,
                },
            },
            headDoctor: {
                include: {
                    user: true,
                },
            },
        },
    });
    return departments.map(department => schema_registry_1.departmentSchema.parse(department));
});
exports.getAllDepartmentsService = getAllDepartmentsService;
const getDepartmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield database_1.prisma.department.findUnique({
        where: { id },
        include: {
            doctors: {
                include: {
                    user: true,
                },
            },
            headDoctor: {
                include: {
                    user: true,
                },
            },
        },
    });
    return department ? schema_registry_1.departmentSchema.parse(department) : null;
});
exports.getDepartmentByIdService = getDepartmentByIdService;
const createDepartmentService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = schema_registry_1.departmentCreateSchema.parse(data);
    const department = yield database_1.prisma.department.create({
        data: validatedData,
        include: {
            doctors: {
                include: {
                    user: true,
                },
            },
            headDoctor: {
                include: {
                    user: true,
                },
            },
        },
    });
    return schema_registry_1.departmentSchema.parse(department);
});
exports.createDepartmentService = createDepartmentService;
const updateDepartmentService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = schema_registry_1.departmentUpdateSchema.parse(data);
    const department = yield database_1.prisma.department.update({
        where: { id },
        data: validatedData,
        include: {
            doctors: {
                include: {
                    user: true,
                },
            },
            headDoctor: {
                include: {
                    user: true,
                },
            },
        },
    });
    return schema_registry_1.departmentSchema.parse(department);
});
exports.updateDepartmentService = updateDepartmentService;
const deleteDepartmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield database_1.prisma.department.delete({
        where: { id },
        include: {
            doctors: {
                include: {
                    user: true,
                },
            },
            headDoctor: {
                include: {
                    user: true,
                },
            },
        },
    });
    return schema_registry_1.departmentSchema.parse(department);
});
exports.deleteDepartmentService = deleteDepartmentService;
const assignHeadDoctorService = (departmentId, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify that the doctor belongs to the department
    const doctor = yield database_1.prisma.doctor.findUnique({
        where: { id: doctorId },
        select: { departmentId: true }
    });
    if (!doctor) {
        throw new Error(`Doktor ID ${doctorId} bulunamadı.`);
    }
    // If the doctor doesn't belong to this department, first update their department
    if (doctor.departmentId !== departmentId) {
        yield database_1.prisma.doctor.update({
            where: { id: doctorId },
            data: { departmentId },
        });
    }
    // Update the doctor as the head of department
    const department = yield database_1.prisma.department.update({
        where: { id: departmentId },
        data: {
            headDoctor: {
                connect: { id: doctorId },
            },
        },
        include: {
            doctors: {
                include: {
                    user: true,
                },
            },
            headDoctor: {
                include: {
                    user: true,
                },
            },
        },
    });
    return schema_registry_1.departmentSchema.parse(department);
});
exports.assignHeadDoctorService = assignHeadDoctorService;
const removeHeadDoctorService = (departmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield database_1.prisma.department.update({
        where: { id: departmentId },
        data: {
            headDoctor: {
                disconnect: true,
            },
        },
        include: {
            doctors: {
                include: {
                    user: true,
                },
            },
            headDoctor: {
                include: {
                    user: true,
                },
            },
        },
    });
    return schema_registry_1.departmentSchema.parse(department);
});
exports.removeHeadDoctorService = removeHeadDoctorService;
