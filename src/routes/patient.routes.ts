import { Router } from 'express';
import {
  getAllPatients,
  getPatientById,
  getPatientByEmail,
  createPatient,
  updatePatient,
  deletePatient,
} from '../controllers/patient.controller';
import validate from '../middlewares/validate';
import { patientCreateSchema, patientUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.get('/email/:email', getPatientByEmail);
router.post('/', validate(patientCreateSchema), createPatient);
router.put('/:id', validate(patientUpdateSchema), updatePatient);
router.delete('/:id', deletePatient);

export default router;
