import { Request, Response, NextFunction } from 'express';
import {
  getAllDepartmentsService,
  getDepartmentByIdService,
  createDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
} from '../services/department.service';
import { AppError } from '../middlewares/error.middleware';

export const getAllDepartments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const departments = await getAllDepartmentsService();
    res.status(200).json({
      status: 'success',
      data: departments,
    });
  } catch (error) {
    next(error);
  }
};

export const getDepartmentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const department = await getDepartmentByIdService(Number(id));
    if (!department) {
      throw new AppError('Department not found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const createDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newDepartment = await createDepartmentService(req.body);
    res.status(201).json({
      status: 'success',
      data: newDepartment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingDepartment = await getDepartmentByIdService(Number(id));
    
    if (!existingDepartment) {
      throw new AppError('Department not found', 404);
    }

    const updatedDepartment = await updateDepartmentService(Number(id), req.body);
    res.status(200).json({
      status: 'success',
      data: updatedDepartment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingDepartment = await getDepartmentByIdService(Number(id));
    
    if (!existingDepartment) {
      throw new AppError('Department not found', 404);
    }

    await deleteDepartmentService(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 