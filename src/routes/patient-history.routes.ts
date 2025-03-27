import { Router } from 'express';
import {
  getAllPatientHistory,
  getPatientHistoryById,
  getPatientHistoryByPatientId,
  getPatientHistoryByRecordType,
  createPatientHistory,
  updatePatientHistory,
  deletePatientHistory
} from '../controllers/patient-history.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { patientHistoryCreateSchema, patientHistoryUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

// Routes for viewing patient history - accessible to doctors and admins
// Get all patient history records
router.get('/', authenticate, authorize(['admin', 'doctor']), getAllPatientHistory);

// Get patient history record by ID
router.get('/:id', authenticate, authorize(['admin', 'doctor']), getPatientHistoryById);

// Get history records by patient ID
router.get('/patient/:patientId', authenticate, authorize(['admin', 'doctor']), getPatientHistoryByPatientId);

// Get history records by patient ID and record type
router.get('/patient/:patientId/type/:recordType', authenticate, authorize(['admin', 'doctor']), getPatientHistoryByRecordType);

// Create new patient history record - accessible to doctors only
router.post('/', authenticate, authorize(['doctor']), validate(patientHistoryCreateSchema), createPatientHistory);

// Update patient history record - accessible to doctors only
router.put('/:id', authenticate, authorize(['doctor']), validate(patientHistoryUpdateSchema), updatePatientHistory);

// Delete patient history record - accessible to admins only
router.delete('/:id', authenticate, authorize(['admin']), deletePatientHistory);

export default router; 