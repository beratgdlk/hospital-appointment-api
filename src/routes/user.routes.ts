import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import validate from '../middlewares/validate';
import { userSchema } from '../validations/user.validation';

const router: Router = Router();

// Admin only routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validate(userSchema), createUser);
router.put('/:id', validate(userSchema), updateUser);
router.delete('/:id', deleteUser);

export default router; 