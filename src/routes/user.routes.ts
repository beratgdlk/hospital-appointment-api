import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { userCreateSchema, userUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

// Admin only routes - protected by authentication and authorization
router.get('/', authenticate, authorize(['admin']), getAllUsers);
router.get('/:id', authenticate, authorize(['admin']), getUserById);
router.get('/email/:email', authenticate, authorize(['admin']), getUserByEmail);
router.post('/', authenticate, authorize(['admin']), validate(userCreateSchema), createUser);
router.put('/:id', authenticate, authorize(['admin']), validate(userUpdateSchema), updateUser);
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

export default router; 