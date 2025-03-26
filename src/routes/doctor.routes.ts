import express from 'express';
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctor.controller';
import { validate } from '../middlewares/validation.middleware';
import { doctorSchema, doctorUpdateSchema } from '../validations/doctor.validation';

const router = express.Router();

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.post('/', validate(doctorSchema), createDoctor);
router.put('/:id', validate(doctorUpdateSchema), updateDoctor);
router.delete('/:id', deleteDoctor);

export default router; 