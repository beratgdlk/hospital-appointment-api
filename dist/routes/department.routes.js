"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_controller_1 = require("../controllers/department.controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const schema_registry_1 = require("../schemas/schema.registry");
const router = (0, express_1.Router)();
router.get('/', department_controller_1.getAllDepartments);
router.get('/:id', department_controller_1.getDepartmentById);
router.post('/', (0, validate_1.default)(schema_registry_1.departmentCreateSchema), department_controller_1.createDepartment);
router.put('/:id', (0, validate_1.default)(schema_registry_1.departmentUpdateSchema), department_controller_1.updateDepartment);
router.delete('/:id', department_controller_1.deleteDepartment);
exports.default = router;
