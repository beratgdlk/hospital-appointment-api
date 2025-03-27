"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = require("../controllers/appointment.controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const schema_registry_1 = require("../schemas/schema.registry");
const router = (0, express_1.Router)();
router.get('/', appointment_controller_1.getAllAppointments);
router.get('/:id', appointment_controller_1.getAppointmentById);
router.get('/patient/:patientId', appointment_controller_1.getAppointmentsByPatientId);
router.get('/doctor/:doctorId', appointment_controller_1.getAppointmentsByDoctorId);
router.post('/', (0, validate_1.default)(schema_registry_1.appointmentCreateSchema), appointment_controller_1.createAppointment);
router.put('/:id', (0, validate_1.default)(schema_registry_1.appointmentUpdateSchema), appointment_controller_1.updateAppointment);
router.delete('/:id', appointment_controller_1.deleteAppointment);
exports.default = router;
