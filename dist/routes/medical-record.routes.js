"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medical_record_controller_1 = require("../controllers/medical-record.controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const schema_registry_1 = require("../schemas/schema.registry");
const router = (0, express_1.Router)();
// Medical Record routes
router.get('/', medical_record_controller_1.getAllMedicalRecords);
router.get('/:id', medical_record_controller_1.getMedicalRecordById);
router.get('/patient/:patientId', medical_record_controller_1.getMedicalRecordsByPatientId);
router.post('/', (0, validate_1.default)(schema_registry_1.medicalRecordCreateSchema), medical_record_controller_1.createMedicalRecord);
router.put('/:id', (0, validate_1.default)(schema_registry_1.medicalRecordUpdateSchema), medical_record_controller_1.updateMedicalRecord);
router.delete('/:id', medical_record_controller_1.deleteMedicalRecord);
exports.default = router;
