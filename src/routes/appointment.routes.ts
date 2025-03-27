import { Router } from 'express';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
} from '../controllers/appointment.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { appointmentCreateSchema, appointmentUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

// Routes for all authenticated users
router.get('/', authenticate, authorize(['admin', 'doctor', 'secretary']), getAllAppointments);
router.get('/:id', authenticate, authorize(['admin', 'doctor', 'secretary']), getAppointmentById);
router.get('/patient/:patientId', authenticate, authorize(['admin', 'doctor', 'secretary']), getAppointmentsByPatientId);
router.get('/doctor/:doctorId', authenticate, authorize(['admin', 'doctor', 'secretary']), getAppointmentsByDoctorId);

// Routes for admin and secretary
router.post('/', authenticate, authorize(['admin', 'secretary']), validate(appointmentCreateSchema), createAppointment);
router.put('/:id', authenticate, authorize(['admin', 'secretary']), validate(appointmentUpdateSchema), updateAppointment);
router.delete('/:id', authenticate, authorize(['admin']), deleteAppointment);

export default router; 