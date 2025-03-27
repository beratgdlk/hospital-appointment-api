import { Router } from 'express';
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controllers/department.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { departmentCreateSchema, departmentUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

// Public routes for viewing departments
router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);

// Admin only routes for managing departments
router.post('/', authenticate, authorize(['admin']), validate(departmentCreateSchema), createDepartment);
router.put('/:id', authenticate, authorize(['admin']), validate(departmentUpdateSchema), updateDepartment);
router.delete('/:id', authenticate, authorize(['admin']), deleteDepartment);

export default router; 