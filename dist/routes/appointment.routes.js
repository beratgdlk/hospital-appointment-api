"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("../controllers/appointment.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const appointment_validation_1 = require("../validations/appointment.validation");
const router = express_1.default.Router();
router.get('/', appointment_controller_1.getAllAppointments);
router.get('/:id', appointment_controller_1.getAppointmentById);
router.get('/patient/:patientId', appointment_controller_1.getAppointmentsByPatientId);
router.get('/doctor/:doctorId', appointment_controller_1.getAppointmentsByDoctorId);
router.post('/', (0, validation_middleware_1.validate)(appointment_validation_1.appointmentSchema), appointment_controller_1.createAppointment);
router.put('/:id', (0, validation_middleware_1.validate)(appointment_validation_1.appointmentUpdateSchema), appointment_controller_1.updateAppointment);
router.delete('/:id', appointment_controller_1.deleteAppointment);
exports.default = router;
