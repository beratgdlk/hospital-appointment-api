import { Router } from 'express';
import {
  getAllMedicalRecords,
  getMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecordsByPatientId,
} from '../controllers/medical-record.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { medicalRecordCreateSchema, medicalRecordUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

// Medical Record routes - accessible to doctors and admins
router.get('/', authenticate, authorize(['admin', 'doctor']), getAllMedicalRecords);
router.get('/:id', authenticate, authorize(['admin', 'doctor']), getMedicalRecordById);
router.get('/patient/:patientId', authenticate, authorize(['admin', 'doctor']), getMedicalRecordsByPatientId);

// Routes for creating and updating medical records - doctors only
router.post('/', authenticate, authorize(['doctor']), validate(medicalRecordCreateSchema), createMedicalRecord);
router.put('/:id', authenticate, authorize(['doctor']), validate(medicalRecordUpdateSchema), updateMedicalRecord);

// Admin only routes
router.delete('/:id', authenticate, authorize(['admin']), deleteMedicalRecord);

export default router; 