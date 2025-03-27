import { Router } from 'express';
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctor.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { doctorCreateSchema, doctorUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

// Routes for viewing doctors - accessible to all authenticated users
router.get('/', authenticate, getAllDoctors);
router.get('/:id', authenticate, getDoctorById);

// Admin only routes for managing doctors
router.post('/', authenticate, authorize(['admin']), validate(doctorCreateSchema), createDoctor);
router.put('/:id', authenticate, authorize(['admin']), validate(doctorUpdateSchema), updateDoctor);
router.delete('/:id', authenticate, authorize(['admin']), deleteDoctor);

export default router; 