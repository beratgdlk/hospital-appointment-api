import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import validate from '../middlewares/validate';
import { userCreateSchema, userUpdateSchema } from '../schemas/schema.registry';

const router: Router = Router();

// Admin only routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.post('/', validate(userCreateSchema), createUser);
router.put('/:id', validate(userUpdateSchema), updateUser);
router.delete('/:id', deleteUser);

export default router; 