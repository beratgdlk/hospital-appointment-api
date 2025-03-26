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
exports.deleteDepartment = exports.updateDepartment = exports.createDepartment = exports.getDepartmentById = exports.getAllDepartments = void 0;
const department_service_1 = require("../services/department.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const getAllDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield (0, department_service_1.getAllDepartmentsService)();
        res.status(200).json({
            status: 'success',
            data: departments,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllDepartments = getAllDepartments;
const getDepartmentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const department = yield (0, department_service_1.getDepartmentByIdService)(Number(id));
        if (!department) {
            throw new error_middleware_1.AppError('Department not found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: department,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getDepartmentById = getDepartmentById;
const createDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDepartment = yield (0, department_service_1.createDepartmentService)(req.body);
        res.status(201).json({
            status: 'success',
            data: newDepartment,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createDepartment = createDepartment;
const updateDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingDepartment = yield (0, department_service_1.getDepartmentByIdService)(Number(id));
        if (!existingDepartment) {
            throw new error_middleware_1.AppError('Department not found', 404);
        }
        const updatedDepartment = yield (0, department_service_1.updateDepartmentService)(Number(id), req.body);
        res.status(200).json({
            status: 'success',
            data: updatedDepartment,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateDepartment = updateDepartment;
const deleteDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingDepartment = yield (0, department_service_1.getDepartmentByIdService)(Number(id));
        if (!existingDepartment) {
            throw new error_middleware_1.AppError('Department not found', 404);
        }
        yield (0, department_service_1.deleteDepartmentService)(Number(id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteDepartment = deleteDepartment;
