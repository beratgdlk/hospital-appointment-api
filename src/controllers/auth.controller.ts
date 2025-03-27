import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmailService, createUserService } from '../services/user.service';
import { AppError } from '../middlewares/error.middleware';
import { UserCreate } from '../schemas/schema.registry';

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: UserCreate = req.body;
    
    // Check if user already exists
    const existingUser = await getUserByEmailService(userData.email);
    if (existingUser) {
      return next(new AppError('User with this email already exists', 400, true));
    }
    
    // Create new user
    const newUser = await createUserService(userData);
    
    // Remove password from response
    const { password, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      status: 'success',
      data: {
        user: userWithoutPassword
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    // Check if email and password are provided
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400, true));
    }
    
    // Check if user exists
    const user = await getUserByEmailService(email);
    if (!user) {
      return next(new AppError('Incorrect email or password', 401, true));
    }
    
    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError('Incorrect email or password', 401, true));
    }
    
    // Generate JWT token
    const secretKey = process.env.JWT_SECRET || 'add-your-secret-key-here';
    const expiresIn = process.env.JWT_EXPIRES_IN || '90d';
    
    // Using any type to bypass TypeScript strict checking
    const token = jwt.sign(
      { id: user.id },
      secretKey as any,
      { expiresIn } as any
    );
    
    // Remove password from response
    const { password: userPassword, ...userWithoutPassword } = user;
    
    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 * @route GET /api/auth/me
 */
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // User is already added to req by auth middleware
    if (!req.user) {
      return next(new AppError('You are not logged in', 401, true));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    next(error);
  }
}; 