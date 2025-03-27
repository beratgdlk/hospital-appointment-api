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
import validate from '../middlewares/validate';
import { patientHistoryCreateSchema, patientHistoryUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

// Get all patient history records
router.get('/', getAllPatientHistory);

// Get patient history record by ID
router.get('/:id', getPatientHistoryById);

// Get history records by patient ID
router.get('/patient/:patientId', getPatientHistoryByPatientId);

// Get history records by patient ID and record type
router.get('/patient/:patientId/type/:recordType', getPatientHistoryByRecordType);

// Create new patient history record
router.post('/', validate(patientHistoryCreateSchema), createPatientHistory);

// Update patient history record
router.put('/:id', validate(patientHistoryUpdateSchema), updatePatientHistory);

// Delete patient history record
router.delete('/:id', deletePatientHistory);

export default router; 