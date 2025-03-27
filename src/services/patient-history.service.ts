import { prisma } from '../config/database';
import { PatientHistoryCreate, PatientHistoryUpdate } from '../schemas/schema.registry';
import { emitPatientHistoryUpdate } from './socket.service';

// Using 'any' type temporarily to avoid TypeScript errors
// This can be removed when the Prisma schema is properly generated
const patientHistoryModel = (prisma as any).patientHistory;

/**
 * Retrieves all patient history records
 * @returns Array of patient history records
 */
export const getAllPatientHistoryService = async () => {
  try {
    return await patientHistoryModel.findMany({
      include: {
        patient: true,
      },
    });
  } catch (error) {
    console.error('PatientHistory model not yet created in database:', error);
    return [];
  }
};

/**
 * Retrieves a specific patient history record by ID
 * @param id Patient history record ID
 * @returns Patient history record
 */
export const getPatientHistoryByIdService = async (id: number) => {
  try {
    return await patientHistoryModel.findUnique({
      where: { id },
      include: {
        patient: true,
      },
    });
  } catch (error) {
    console.error('PatientHistory model not yet created in database:', error);
    return null;
  }
};

/**
 * Retrieves all history records for a specific patient
 * @param patientId Patient ID
 * @returns Array of patient history records
 */
export const getPatientHistoryByPatientIdService = async (patientId: number) => {
  try {
    return await patientHistoryModel.findMany({
      where: { patientId },
      include: {
        patient: true,
      },
      orderBy: {
        performedAt: 'desc',
      },
    });
  } catch (error) {
    console.error('PatientHistory model not yet created in database:', error);
    return [];
  }
};

/**
 * Retrieves patient history records filtered by record type
 * @param patientId Patient ID
 * @param recordType Record type
 * @returns Array of patient history records
 */
export const getPatientHistoryByRecordTypeService = async (patientId: number, recordType: string) => {
  try {
    return await patientHistoryModel.findMany({
      where: { 
        patientId,
        recordType: recordType as any, 
      },
      include: {
        patient: true,
      },
      orderBy: {
        performedAt: 'desc',
      },
    });
  } catch (error) {
    console.error('PatientHistory model not yet created in database:', error);
    return [];
  }
};

/**
 * Creates a new patient history record
 * @param data Patient history data
 * @returns Created patient history record
 */
export const createPatientHistoryService = async (data: PatientHistoryCreate) => {
  try {
    const history = await patientHistoryModel.create({
      data,
      include: {
        patient: true,
      },
    });

    // Notify patients of history update via WebSocket
    emitPatientHistoryUpdate({
      patientId: history.patientId,
      recordId: history.id,
      action: 'added',
      timestamp: new Date(),
    });

    return history;
  } catch (error) {
    console.error('PatientHistory model not yet created in database:', error);
    // Return default object if creation fails
    return { 
      id: 0, 
      ...data, 
      createdAt: new Date(), 
      updatedAt: new Date(),
      patient: null
    };
  }
};

/**
 * Updates an existing patient history record
 * @param id Patient history record ID
 * @param data Update data
 * @returns Updated patient history record
 */
export const updatePatientHistoryService = async (id: number, data: PatientHistoryUpdate) => {
  try {
    const history = await patientHistoryModel.update({
      where: { id },
      data,
      include: {
        patient: true,
      },
    });

    // Notify patients of history update via WebSocket
    emitPatientHistoryUpdate({
      patientId: history.patientId,
      recordId: history.id,
      action: 'updated',
      timestamp: new Date(),
    });

    return history;
  } catch (error) {
    console.error('PatientHistory model not yet created in database:', error);
    return null;
  }
};

/**
 * Deletes a patient history record
 * @param id Patient history record ID
 * @returns Deleted patient history record
 */
export const deletePatientHistoryService = async (id: number) => {
  try {
    const history = await patientHistoryModel.delete({
      where: { id },
      include: {
        patient: true,
      },
    });

    // Notify patients of history update via WebSocket
    emitPatientHistoryUpdate({
      patientId: history.patientId,
      recordId: history.id,
      action: 'deleted',
      timestamp: new Date(),
    });

    return history;
  } catch (error) {
    console.error('PatientHistory model not yet created in database:', error);
    return null;
  }
}; 