import { Request, Response, NextFunction } from 'express';
import { patientCreateSchema, patientUpdateSchema } from '../schemas/schema.registry';
import {
  getAllPatientsService,
  getPatientByIdService,
  getPatientByEmailService,
  createPatientService,
  updatePatientService,
  deletePatientService
} from '../services/patient.service';
import { AppError } from '../middlewares/error.middleware';

export const getAllPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const patients = await getAllPatientsService();
    
    res.status(200).json({
      status: 'success',
      data: {
        patients
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const patient = await getPatientByIdService(id);
    
    if (!patient) {
      next(new AppError('Patient not found', 404, true));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        patient
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPatientByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.params.email;
    
    const patient = await getPatientByEmailService(email);
    
    if (!patient) {
      next(new AppError('Patient not found', 404, true));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        patient
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const patientData = patientCreateSchema.parse(req.body);
    
    const patient = await createPatientService(patientData);
    
    res.status(201).json({
      status: 'success',
      data: {
        patient
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const patientData = patientUpdateSchema.parse(req.body);
    
    const patient = await updatePatientService(id, patientData);
    
    if (!patient) {
      next(new AppError('Patient not found', 404, true));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        patient
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const patient = await deletePatientService(id);
    
    if (!patient) {
      next(new AppError('Patient not found', 404, true));
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
