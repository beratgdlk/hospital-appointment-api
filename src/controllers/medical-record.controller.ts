import { Request, Response, NextFunction } from 'express';
import {
  getAllMedicalRecordsService,
  getMedicalRecordByIdService,
  createMedicalRecordService,
  updateMedicalRecordService,
  deleteMedicalRecordService,
  getMedicalRecordsByPatientIdService,
} from '../services/medical-record.service';
import { AppError } from '../middlewares/error.middleware';

export const getAllMedicalRecords = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const medicalRecords = await getAllMedicalRecordsService();
    res.status(200).json({
      status: 'success',
      data: medicalRecords,
    });
  } catch (error) {
    next(error);
  }
};

export const getMedicalRecordById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const medicalRecord = await getMedicalRecordByIdService(Number(id));
    if (!medicalRecord) {
      throw new AppError('Medical record not found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: medicalRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const getMedicalRecordsByPatientId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientId } = req.params;
    const medicalRecords = await getMedicalRecordsByPatientIdService(Number(patientId));
    res.status(200).json({
      status: 'success',
      data: medicalRecords,
    });
  } catch (error) {
    next(error);
  }
};

export const createMedicalRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newMedicalRecord = await createMedicalRecordService(req.body);
    res.status(201).json({
      status: 'success',
      data: newMedicalRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMedicalRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingRecord = await getMedicalRecordByIdService(Number(id));
    
    if (!existingRecord) {
      throw new AppError('Medical record not found', 404);
    }

    const updatedMedicalRecord = await updateMedicalRecordService(Number(id), req.body);
    res.status(200).json({
      status: 'success',
      data: updatedMedicalRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMedicalRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingRecord = await getMedicalRecordByIdService(Number(id));
    
    if (!existingRecord) {
      throw new AppError('Medical record not found', 404);
    }

    await deleteMedicalRecordService(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 