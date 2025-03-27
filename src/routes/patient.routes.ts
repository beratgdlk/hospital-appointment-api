import { Router } from 'express';
import {
  getAllPatients,
  getPatientById,
  getPatientByEmail,
  createPatient,
  updatePatient,
  deletePatient,
} from '../controllers/patient.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { patientCreateSchema, patientUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

// Routes for viewing patients - accessible to doctors, secretaries and admins
router.get('/', authenticate, authorize(['admin', 'doctor', 'secretary']), getAllPatients);
router.get('/:id', authenticate, authorize(['admin', 'doctor', 'secretary']), getPatientById);
router.get('/email/:email', authenticate, authorize(['admin', 'doctor', 'secretary']), getPatientByEmail);

// Routes for managing patients - accessible to secretaries and admins
router.post('/', authenticate, authorize(['admin', 'secretary']), validate(patientCreateSchema), createPatient);
router.put('/:id', authenticate, authorize(['admin', 'secretary']), validate(patientUpdateSchema), updatePatient);

// Routes for deleting patients - accessible to admins only
router.delete('/:id', authenticate, authorize(['admin']), deletePatient);

export default router;
