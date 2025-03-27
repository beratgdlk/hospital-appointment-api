"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_history_controller_1 = require("../controllers/patient-history.controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const schema_registry_1 = require("../schemas/schema.registry");
const router = (0, express_1.Router)();
// Get all patient history records
router.get('/', patient_history_controller_1.getAllPatientHistory);
// Get patient history record by ID
router.get('/:id', patient_history_controller_1.getPatientHistoryById);
// Get history records by patient ID
router.get('/patient/:patientId', patient_history_controller_1.getPatientHistoryByPatientId);
// Get history records by patient ID and record type
router.get('/patient/:patientId/type/:recordType', patient_history_controller_1.getPatientHistoryByRecordType);
// Create new patient history record
router.post('/', (0, validate_1.default)(schema_registry_1.patientHistoryCreateSchema), patient_history_controller_1.createPatientHistory);
// Update patient history record
router.put('/:id', (0, validate_1.default)(schema_registry_1.patientHistoryUpdateSchema), patient_history_controller_1.updatePatientHistory);
// Delete patient history record
router.delete('/:id', patient_history_controller_1.deletePatientHistory);
exports.default = router;
