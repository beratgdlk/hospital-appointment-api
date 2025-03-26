"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_controller_1 = require("../controllers/doctor.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const doctor_validation_1 = require("../validations/doctor.validation");
const router = express_1.default.Router();
router.get('/', doctor_controller_1.getAllDoctors);
router.get('/:id', doctor_controller_1.getDoctorById);
router.post('/', (0, validation_middleware_1.validate)(doctor_validation_1.doctorSchema), doctor_controller_1.createDoctor);
router.put('/:id', (0, validation_middleware_1.validate)(doctor_validation_1.doctorUpdateSchema), doctor_controller_1.updateDoctor);
router.delete('/:id', doctor_controller_1.deleteDoctor);
exports.default = router;
