"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_controller_1 = require("../controllers/patient.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const patient_validation_1 = require("../validations/patient.validation");
const router = express_1.default.Router();
router.get('/', patient_controller_1.getAllPatients);
router.get('/:id', patient_controller_1.getPatientById);
router.post('/', (0, validation_middleware_1.validate)(patient_validation_1.patientSchema), patient_controller_1.createPatient);
router.put('/:id', (0, validation_middleware_1.validate)(patient_validation_1.patientUpdateSchema), patient_controller_1.updatePatient);
router.delete('/:id', patient_controller_1.deletePatient);
exports.default = router;
