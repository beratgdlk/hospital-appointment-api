import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { userCreateSchema } from '../schemas/schema.registry';

const router: Router = Router();

// Public routes
router.post('/register', validate(userCreateSchema), register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticate, getMe);

export default router; 