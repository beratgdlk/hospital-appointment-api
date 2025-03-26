import express from 'express';
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from '../controllers/patient.controller';
import { validate } from '../middlewares/validation.middleware';
import { patientSchema, patientUpdateSchema } from '../validations/patient.validation';

const router = express.Router();

router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', validate(patientSchema), createPatient);
router.put('/:id', validate(patientUpdateSchema), updatePatient);
router.delete('/:id', deletePatient);

export default router;
