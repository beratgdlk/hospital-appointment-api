"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medical_record_controller_1 = require("../controllers/medical-record.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const medical_record_validation_1 = require("../validations/medical-record.validation");
const router = express_1.default.Router();
// Medical Record routes
router.get('/', medical_record_controller_1.getAllMedicalRecords);
router.get('/:id', medical_record_controller_1.getMedicalRecordById);
router.get('/patient/:patientId', medical_record_controller_1.getMedicalRecordsByPatientId);
router.post('/', (0, validation_middleware_1.validate)(medical_record_validation_1.medicalRecordSchema), medical_record_controller_1.createMedicalRecord);
router.put('/:id', (0, validation_middleware_1.validate)(medical_record_validation_1.medicalRecordUpdateSchema), medical_record_controller_1.updateMedicalRecord);
router.delete('/:id', medical_record_controller_1.deleteMedicalRecord);
exports.default = router;
