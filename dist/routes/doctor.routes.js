"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctor_controller_1 = require("../controllers/doctor.controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const schema_registry_1 = require("../schemas/schema.registry");
const router = (0, express_1.Router)();
router.get('/', doctor_controller_1.getAllDoctors);
router.get('/:id', doctor_controller_1.getDoctorById);
router.post('/', (0, validate_1.default)(schema_registry_1.doctorCreateSchema), doctor_controller_1.createDoctor);
router.put('/:id', (0, validate_1.default)(schema_registry_1.doctorUpdateSchema), doctor_controller_1.updateDoctor);
router.delete('/:id', doctor_controller_1.deleteDoctor);
exports.default = router;
