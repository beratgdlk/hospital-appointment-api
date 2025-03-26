import { Request, Response, NextFunction } from 'express';
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
  getUserByEmailService,
} from '../services/user.service';
import { AppError } from '../middlewares/error.middleware';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(Number(id));
    if (!user) {
      throw new AppError('User not found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existingUser = await getUserByEmailService(req.body.email);
    if (existingUser) {
      throw new AppError('A user with this email already exists', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = { ...req.body, password: hashedPassword };

    const newUser = await createUserService(userData);
    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingUser = await getUserByIdService(Number(id));
    
    if (!existingUser) {
      throw new AppError('User not found', 404);
    }

    if (req.body.email && req.body.email !== existingUser.email) {
      const userWithEmail = await getUserByEmailService(req.body.email);
      if (userWithEmail) {
        throw new AppError('A user with this email already exists', 400);
      }
    }

    // Hash password if it's being updated
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await updateUserService(Number(id), req.body);
    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingUser = await getUserByIdService(Number(id));
    
    if (!existingUser) {
      throw new AppError('User not found', 404);
    }

    await deleteUserService(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 