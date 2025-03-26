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
exports.deleteDepartmentService = exports.updateDepartmentService = exports.createDepartmentService = exports.getDepartmentByIdService = exports.getAllDepartmentsService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAllDepartmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.department.findMany({
        include: {
            doctors: true,
        },
    });
});
exports.getAllDepartmentsService = getAllDepartmentsService;
const getDepartmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.department.findUnique({
        where: { id },
        include: {
            doctors: true,
        },
    });
});
exports.getDepartmentByIdService = getDepartmentByIdService;
const createDepartmentService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.department.create({
        data,
        include: {
            doctors: true,
        },
    });
});
exports.createDepartmentService = createDepartmentService;
const updateDepartmentService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.department.update({
        where: { id },
        data,
        include: {
            doctors: true,
        },
    });
});
exports.updateDepartmentService = updateDepartmentService;
const deleteDepartmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.department.delete({
        where: { id },
    });
});
exports.deleteDepartmentService = deleteDepartmentService;
