import { Router } from 'express';
import {
  getAllMedicalRecords,
  getMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecordsByPatientId,
} from '../controllers/medical-record.controller';
import validate from '../middlewares/validate';
import { medicalRecordCreateSchema, medicalRecordUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

// Medical Record routes
router.get('/', getAllMedicalRecords);
router.get('/:id', getMedicalRecordById);
router.get('/patient/:patientId', getMedicalRecordsByPatientId);
router.post('/', validate(medicalRecordCreateSchema), createMedicalRecord);
router.put('/:id', validate(medicalRecordUpdateSchema), updateMedicalRecord);
router.delete('/:id', deleteMedicalRecord);

export default router; 