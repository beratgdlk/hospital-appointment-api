import { Request, Response, NextFunction } from 'express';
import { patientHistoryCreateSchema, patientHistoryUpdateSchema } from '../schemas/schema.registry';
import {
  getAllPatientHistoryService,
  getPatientHistoryByIdService,
  getPatientHistoryByPatientIdService,
  getPatientHistoryByRecordTypeService,
  createPatientHistoryService,
  updatePatientHistoryService,
  deletePatientHistoryService
} from '../services/patient-history.service';
import { AppError } from '../middlewares/error.middleware';

/**
 * Retrieves all patient history records
 */
export const getAllPatientHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const records = await getAllPatientHistoryService();
    
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

/**
 * Retrieves a specific patient history record by ID
 */
export const getPatientHistoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const record = await getPatientHistoryByIdService(id);
    
    if (!record) {
      next(new AppError('Patient history record not found', 404, true));
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

/**
 * Retrieves all history records for a specific patient
 */
export const getPatientHistoryByPatientId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const patientId = Number(req.params.patientId);
    
    const records = await getPatientHistoryByPatientIdService(patientId);
    
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

/**
 * Retrieves patient history records filtered by record type
 */
export const getPatientHistoryByRecordType = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const patientId = Number(req.params.patientId);
    const recordType = req.params.recordType;
    
    const records = await getPatientHistoryByRecordTypeService(patientId, recordType);
    
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

/**
 * Creates a new patient history record
 */
export const createPatientHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const historyData = patientHistoryCreateSchema.parse(req.body);
    
    const record = await createPatientHistoryService(historyData);
    
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

/**
 * Updates an existing patient history record
 */
export const updatePatientHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const historyData = patientHistoryUpdateSchema.parse(req.body);
    
    const record = await updatePatientHistoryService(id, historyData);
    
    if (!record) {
      next(new AppError('Patient history record not found', 404, true));
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

/**
 * Deletes a patient history record
 */
export const deletePatientHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const record = await deletePatientHistoryService(id);
    
    if (!record) {
      next(new AppError('Patient history record not found', 404, true));
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