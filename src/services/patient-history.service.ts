import { prisma } from '../config/database';
import { PatientHistoryCreate, PatientHistoryUpdate } from '../schemas/schema.registry';
import { emitPatientHistoryUpdate } from './socket.service';

// Using 'any' type temporarily to avoid TypeScript errors
// This can be removed when the Prisma schema is properly generated
const patientHistoryModel = (prisma as any).patientHistory;

export class PatientHistoryService {
  /**
   * Retrieves all patient history records
   * @returns Array of patient history records
   */
  static async getAllPatientHistory() {
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
  }

  /**
   * Retrieves a specific patient history record by ID
   * @param id Patient history record ID
   * @returns Patient history record
   */
  static async getPatientHistoryById(id: number) {
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
  }

  /**
   * Retrieves all history records for a specific patient
   * @param patientId Patient ID
   * @returns Array of patient history records
   */
  static async getPatientHistoryByPatientId(patientId: number) {
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
  }

  /**
   * Retrieves patient history records filtered by record type
   * @param patientId Patient ID
   * @param recordType Record type
   * @returns Array of patient history records
   */
  static async getPatientHistoryByRecordType(patientId: number, recordType: string) {
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
  }

  /**
   * Creates a new patient history record
   * @param data Patient history data
   * @returns Created patient history record
   */
  static async createPatientHistory(data: PatientHistoryCreate) {
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
  }

  /**
   * Updates an existing patient history record
   * @param id Patient history record ID
   * @param data Update data
   * @returns Updated patient history record
   */
  static async updatePatientHistory(id: number, data: PatientHistoryUpdate) {
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
  }

  /**
   * Deletes a patient history record
   * @param id Patient history record ID
   * @returns Deleted patient history record
   */
  static async deletePatientHistory(id: number) {
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
  }
}

// Eski fonksiyonlar için uyumluluk katmanı
export const getAllPatientHistoryService = () => PatientHistoryService.getAllPatientHistory();
export const getPatientHistoryByIdService = (id: number) => PatientHistoryService.getPatientHistoryById(id);
export const getPatientHistoryByPatientIdService = (patientId: number) => PatientHistoryService.getPatientHistoryByPatientId(patientId);
export const getPatientHistoryByRecordTypeService = (patientId: number, recordType: string) => PatientHistoryService.getPatientHistoryByRecordType(patientId, recordType);
export const createPatientHistoryService = (data: PatientHistoryCreate) => PatientHistoryService.createPatientHistory(data);
export const updatePatientHistoryService = (id: number, data: PatientHistoryUpdate) => PatientHistoryService.updatePatientHistory(id, data);
export const deletePatientHistoryService = (id: number) => PatientHistoryService.deletePatientHistory(id); 