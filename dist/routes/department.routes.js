"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const department_controller_1 = require("../controllers/department.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const department_validation_1 = require("../validations/department.validation");
const router = express_1.default.Router();
router.get('/', department_controller_1.getAllDepartments);
router.get('/:id', department_controller_1.getDepartmentById);
router.post('/', (0, validation_middleware_1.validate)(department_validation_1.departmentSchema), department_controller_1.createDepartment);
router.put('/:id', (0, validation_middleware_1.validate)(department_validation_1.departmentUpdateSchema), department_controller_1.updateDepartment);
router.delete('/:id', department_controller_1.deleteDepartment);
exports.default = router;
