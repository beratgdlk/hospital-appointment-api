import { Request, Response, NextFunction } from 'express';
import { medicalRecordCreateSchema, medicalRecordUpdateSchema } from '../schemas/schema.registry';
import {
  getAllMedicalRecordsService,
  getMedicalRecordByIdService,
  getMedicalRecordsByPatientIdService,
  createMedicalRecordService,
  updateMedicalRecordService,
  deleteMedicalRecordService
} from '../services/medical-record.service';
import { AppError } from '../middlewares/error.middleware';

export const getAllMedicalRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const records = await getAllMedicalRecordsService();
    
    res.status(200).json({
      status: 'success',
      data: {
        records
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMedicalRecordById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const record = await getMedicalRecordByIdService(id);
    
    if (!record) {
      next(new AppError('Tıbbi kayıt bulunamadı', 404));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        record
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMedicalRecordsByPatientId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const patientId = Number(req.params.patientId);
    
    const records = await getMedicalRecordsByPatientIdService(patientId);
    
    res.status(200).json({
      status: 'success',
      data: {
        records
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createMedicalRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const recordData = medicalRecordCreateSchema.parse(req.body);
    
    const record = await createMedicalRecordService(recordData);
    
    res.status(201).json({
      status: 'success',
      data: {
        record
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateMedicalRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const recordData = medicalRecordUpdateSchema.parse(req.body);
    
    const record = await updateMedicalRecordService(id, recordData);
    
    if (!record) {
      next(new AppError('Tıbbi kayıt bulunamadı', 404));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        record
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMedicalRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const record = await deleteMedicalRecordService(id);
    
    if (!record) {
      next(new AppError('Tıbbi kayıt bulunamadı', 404));
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