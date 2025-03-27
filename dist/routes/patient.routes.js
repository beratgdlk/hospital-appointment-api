"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_controller_1 = require("../controllers/patient.controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const schema_registry_1 = require("../schemas/schema.registry");
const router = (0, express_1.Router)();
router.get('/', patient_controller_1.getAllPatients);
router.get('/:id', patient_controller_1.getPatientById);
router.get('/email/:email', patient_controller_1.getPatientByEmail);
router.post('/', (0, validate_1.default)(schema_registry_1.patientCreateSchema), patient_controller_1.createPatient);
router.put('/:id', (0, validate_1.default)(schema_registry_1.patientUpdateSchema), patient_controller_1.updatePatient);
router.delete('/:id', patient_controller_1.deletePatient);
exports.default = router;
