import { Router } from 'express';
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controllers/department.controller';
import validate from '../middlewares/validate';
import { departmentCreateSchema, departmentUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);
router.post('/', validate(departmentCreateSchema), createDepartment);
router.put('/:id', validate(departmentUpdateSchema), updateDepartment);
router.delete('/:id', deleteDepartment);

export default router; 