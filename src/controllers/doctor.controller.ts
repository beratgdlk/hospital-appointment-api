import { Request, Response, NextFunction } from 'express';
import { doctorCreateSchema, doctorUpdateSchema } from '../schemas/schema.registry';
import {
  getAllDoctorsService,
  getDoctorByIdService,
  createDoctorService,
  updateDoctorService,
  deleteDoctorService
} from '../services/doctor.service';
import { AppError } from '../middlewares/error.middleware';

export const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctors = await getAllDoctorsService();
    
    res.status(200).json({
      status: 'success',
      data: {
        doctors
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const doctor = await getDoctorByIdService(id);
    
    if (!doctor) {
      next(new AppError('Doktor bulunamadı', 404));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        doctor
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctorData = doctorCreateSchema.parse(req.body);
    
    const doctor = await createDoctorService(doctorData);
    
    res.status(201).json({
      status: 'success',
      data: {
        doctor
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const doctorData = doctorUpdateSchema.parse(req.body);
    
    const doctor = await updateDoctorService(id, doctorData);
    
    if (!doctor) {
      next(new AppError('Doktor bulunamadı', 404));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        doctor
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const doctor = await deleteDoctorService(id);
    
    if (!doctor) {
      next(new AppError('Doktor bulunamadı', 404));
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