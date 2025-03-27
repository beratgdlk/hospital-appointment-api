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
import validate from '../middlewares/validate';
import { appointmentCreateSchema, appointmentUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

router.get('/', getAllAppointments);
router.get('/:id', getAppointmentById);
router.get('/patient/:patientId', getAppointmentsByPatientId);
router.get('/doctor/:doctorId', getAppointmentsByDoctorId);
router.post('/', validate(appointmentCreateSchema), createAppointment);
router.put('/:id', validate(appointmentUpdateSchema), updateAppointment);
router.delete('/:id', deleteAppointment);

export default router; 