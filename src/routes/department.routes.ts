import express from 'express';
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controllers/department.controller';
import { validate } from '../middlewares/validation.middleware';
import { departmentSchema, departmentUpdateSchema } from '../validations/department.validation';

const router = express.Router();

router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);
router.post('/', validate(departmentSchema), createDepartment);
router.put('/:id', validate(departmentUpdateSchema), updateDepartment);
router.delete('/:id', deleteDepartment);

export default router; 