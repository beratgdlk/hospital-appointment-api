import { Router } from 'express';
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctor.controller';
import validate from '../middlewares/validate';
import { doctorCreateSchema, doctorUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.post('/', validate(doctorCreateSchema), createDoctor);
router.put('/:id', validate(doctorUpdateSchema), updateDoctor);
router.delete('/:id', deleteDoctor);

export default router; 