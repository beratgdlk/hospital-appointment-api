import express from 'express';
import {
  getAllMedicalRecords,
  getMedicalRecordById,
  getMedicalRecordsByPatientId,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from '../controllers/medical-record.controller';
import { validate } from '../middlewares/validation.middleware';
import { medicalRecordSchema, medicalRecordUpdateSchema } from '../validations/medical-record.validation';

const router = express.Router();

// Medical Record routes
router.get('/', getAllMedicalRecords);
router.get('/:id', getMedicalRecordById);
router.get('/patient/:patientId', getMedicalRecordsByPatientId);
router.post('/', validate(medicalRecordSchema), createMedicalRecord);
router.put('/:id', validate(medicalRecordUpdateSchema), updateMedicalRecord);
router.delete('/:id', deleteMedicalRecord);

export default router; 