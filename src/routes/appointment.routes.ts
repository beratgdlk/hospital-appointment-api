import express from 'express';
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
import { appointmentSchema, appointmentUpdateSchema } from '../validations/appointment.validation';

const router = express.Router();

router.get('/', getAllAppointments);
router.get('/:id', getAppointmentById);
router.get('/patient/:patientId', getAppointmentsByPatientId);
router.get('/doctor/:doctorId', getAppointmentsByDoctorId);
router.post('/', validate(appointmentSchema), createAppointment);
router.put('/:id', validate(appointmentUpdateSchema), updateAppointment);
router.delete('/:id', deleteAppointment);

export default router; 