import { Request, Response, NextFunction } from 'express';
import { userCreateSchema, userUpdateSchema } from '../schemas/schema.registry';
import {
  getAllUsersService,
  getUserByIdService,
  getUserByEmailService,
  createUserService,
  updateUserService,
  deleteUserService
} from '../services/user.service';
import { AppError } from '../middlewares/error.middleware';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await getAllUsersService();
    
    res.status(200).json({
      status: 'success',
      data: {
        users
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const user = await getUserByIdService(id);
    
    if (!user) {
      next(new AppError('Kullanıcı bulunamadı', 404));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.params.email;
    
    const user = await getUserByEmailService(email);
    
    if (!user) {
      next(new AppError('Kullanıcı bulunamadı', 404));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData = userCreateSchema.parse(req.body);
    
    const user = await createUserService(userData);
    
    res.status(201).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userData = userUpdateSchema.parse(req.body);
    
    const user = await updateUserService(id, userData);
    
    if (!user) {
      next(new AppError('Kullanıcı bulunamadı', 404));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const user = await deleteUserService(id);
    
    if (!user) {
      next(new AppError('Kullanıcı bulunamadı', 404));
      return;
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
}; 