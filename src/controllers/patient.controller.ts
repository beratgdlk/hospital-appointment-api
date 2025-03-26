import { Request, Response, NextFunction } from 'express';
import {
  getAllPatientsService,
  getPatientByIdService,
  getPatientByEmailService,
  createPatientService,
  updatePatientService,
  deletePatientService,
} from '../services/patient.service';
import { AppError } from '../middlewares/error.middleware';

export const getAllPatients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const patients = await getAllPatientsService();
    res.status(200).json({
      status: 'success',
      data: patients,
    });
  } catch (error) {
    next(error);
  }
};

export const getPatientById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const patient = await getPatientByIdService(Number(id));
    if (!patient) {
      throw new AppError('Patient not found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

export const createPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existingPatient = await getPatientByEmailService(req.body.email);
    if (existingPatient) {
      throw new AppError('A patient with this email already exists', 400);
    }

    const newPatient = await createPatientService(req.body);
    res.status(201).json({
      status: 'success',
      data: newPatient,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingPatient = await getPatientByIdService(Number(id));
    
    if (!existingPatient) {
      throw new AppError('Patient not found', 404);
    }

    if (req.body.email && req.body.email !== existingPatient.email) {
      const patientWithEmail = await getPatientByEmailService(req.body.email);
      if (patientWithEmail) {
        throw new AppError('A patient with this email already exists', 400);
      }
    }

    const updatedPatient = await updatePatientService(Number(id), req.body);
    res.status(200).json({
      status: 'success',
      data: updatedPatient,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingPatient = await getPatientByIdService(Number(id));
    
    if (!existingPatient) {
      throw new AppError('Patient not found', 404);
    }

    await deletePatientService(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
