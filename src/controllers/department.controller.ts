import { Request, Response, NextFunction } from 'express';
import { departmentCreateSchema, departmentUpdateSchema } from '../schemas/schema.registry';
import {
  getAllDepartmentsService,
  getDepartmentByIdService,
  createDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
  assignHeadDoctorService,
  removeHeadDoctorService
} from '../services/department.service';
import { AppError } from '../middlewares/error.middleware';

export const getAllDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const departments = await getAllDepartmentsService();
    
    res.status(200).json({
      status: 'success',
      data: {
        departments
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const department = await getDepartmentByIdService(id);
    
    if (!department) {
      next(new AppError('Department not found', 404, true));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        department
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const departmentData = departmentCreateSchema.parse(req.body);
    
    const department = await createDepartmentService(departmentData);
    
    res.status(201).json({
      status: 'success',
      data: {
        department
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const departmentData = departmentUpdateSchema.parse(req.body);
    
    const department = await updateDepartmentService(id, departmentData);
    
    if (!department) {
      next(new AppError('Department not found', 404, true));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        department
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const department = await deleteDepartmentService(id);
    
    if (!department) {
      next(new AppError('Department not found', 404, true));
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

export const assignHeadDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const departmentId = Number(req.params.departmentId);
    const doctorId = Number(req.params.doctorId);
    
    const department = await assignHeadDoctorService(departmentId, doctorId);
    
    if (!department) {
      next(new AppError('Department or doctor not found', 404, true));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        department
      }
    });
  } catch (error) {
    next(error);
  }
};

export const removeHeadDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const departmentId = Number(req.params.departmentId);
    
    const department = await removeHeadDoctorService(departmentId);
    
    if (!department) {
      next(new AppError('Department not found', 404, true));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        department
      }
    });
  } catch (error) {
    next(error);
  }
}; 