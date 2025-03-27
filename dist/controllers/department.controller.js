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
exports.removeHeadDoctor = exports.assignHeadDoctor = exports.deleteDepartment = exports.updateDepartment = exports.createDepartment = exports.getDepartmentById = exports.getAllDepartments = void 0;
const schema_registry_1 = require("../schemas/schema.registry");
const department_service_1 = require("../services/department.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const getAllDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield (0, department_service_1.getAllDepartmentsService)();
        res.status(200).json({
            status: 'success',
            data: {
                departments
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllDepartments = getAllDepartments;
const getDepartmentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const department = yield (0, department_service_1.getDepartmentByIdService)(id);
        if (!department) {
            next(new error_middleware_1.AppError('Departman bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                department
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getDepartmentById = getDepartmentById;
const createDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentData = schema_registry_1.departmentCreateSchema.parse(req.body);
        const department = yield (0, department_service_1.createDepartmentService)(departmentData);
        res.status(201).json({
            status: 'success',
            data: {
                department
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createDepartment = createDepartment;
const updateDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const departmentData = schema_registry_1.departmentUpdateSchema.parse(req.body);
        const department = yield (0, department_service_1.updateDepartmentService)(id, departmentData);
        if (!department) {
            next(new error_middleware_1.AppError('Departman bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                department
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateDepartment = updateDepartment;
const deleteDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const department = yield (0, department_service_1.deleteDepartmentService)(id);
        if (!department) {
            next(new error_middleware_1.AppError('Departman bulunamadı', 404));
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
exports.deleteDepartment = deleteDepartment;
const assignHeadDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentId = Number(req.params.departmentId);
        const doctorId = Number(req.params.doctorId);
        const department = yield (0, department_service_1.assignHeadDoctorService)(departmentId, doctorId);
        if (!department) {
            next(new error_middleware_1.AppError('Departman veya doktor bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                department
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.assignHeadDoctor = assignHeadDoctor;
const removeHeadDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentId = Number(req.params.departmentId);
        const department = yield (0, department_service_1.removeHeadDoctorService)(departmentId);
        if (!department) {
            next(new error_middleware_1.AppError('Departman bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                department
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.removeHeadDoctor = removeHeadDoctor;
