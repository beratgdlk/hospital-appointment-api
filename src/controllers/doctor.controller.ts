import { Request, Response, NextFunction } from 'express';
import {
  getAllDoctorsService,
  getDoctorByIdService,
  createDoctorService,
  updateDoctorService,
  deleteDoctorService,
} from '../services/doctor.service';
import { AppError } from '../middlewares/error.middleware';

export const getAllDoctors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const doctors = await getAllDoctorsService();
    res.status(200).json({
      status: 'success',
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const doctor = await getDoctorByIdService(Number(id));
    if (!doctor) {
      throw new AppError('Doctor not found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newDoctor = await createDoctorService(req.body);
    res.status(201).json({
      status: 'success',
      data: newDoctor,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingDoctor = await getDoctorByIdService(Number(id));
    
    if (!existingDoctor) {
      throw new AppError('Doctor not found', 404);
    }

    const updatedDoctor = await updateDoctorService(Number(id), req.body);
    res.status(200).json({
      status: 'success',
      data: updatedDoctor,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingDoctor = await getDoctorByIdService(Number(id));
    
    if (!existingDoctor) {
      throw new AppError('Doctor not found', 404);
    }

    await deleteDoctorService(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 