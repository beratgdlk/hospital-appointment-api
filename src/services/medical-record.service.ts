import { prisma } from '../config/database';
import { MedicalRecord } from '../types/types';
import { medicalRecordCreateSchema, medicalRecordSchema, medicalRecordUpdateSchema } from '../schemas/schema.registry';

export class MedicalRecordService {
  static async getAllMedicalRecords(): Promise<MedicalRecord[]> {
    const records = await prisma.medicalRecord.findMany({
      include: {
        patient: true,
        doctor: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return records.map((record: any) => medicalRecordSchema.parse(record) as MedicalRecord);
  }

  static async getMedicalRecordById(id: number): Promise<MedicalRecord | null> {
    const record = await prisma.medicalRecord.findUnique({
      where: { id },
      include: {
        patient: true,
        doctor: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return record ? (medicalRecordSchema.parse(record) as MedicalRecord) : null;
  }

  static async getMedicalRecordsByPatientId(patientId: number): Promise<MedicalRecord[]> {
    const records = await prisma.medicalRecord.findMany({
      where: { patientId },
      include: {
        patient: true,
        doctor: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return records.map((record: any) => medicalRecordSchema.parse(record) as MedicalRecord);
  }

  static async createMedicalRecord(data: unknown): Promise<MedicalRecord> {
    const validatedData = medicalRecordCreateSchema.parse(data);
    
    const record = await prisma.medicalRecord.create({
      data: {
        diagnosis: validatedData.diagnosis,
        treatment: validatedData.treatment,
        prescription: validatedData.prescription || null,
        notes: validatedData.notes || null,
        date: validatedData.date,
        patient: {
          connect: { id: validatedData.patientId },
        },
        doctor: {
          connect: { id: validatedData.doctorId },
        },
      },
      include: {
        patient: true,
        doctor: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return medicalRecordSchema.parse(record) as MedicalRecord;
  }

  static async updateMedicalRecord(id: number, data: unknown): Promise<MedicalRecord> {
    const validatedData = medicalRecordUpdateSchema.parse(data);
    const updateData: any = { ...validatedData };
    
    if (validatedData.patientId) {
      updateData.patient = {
        connect: { id: validatedData.patientId },
      };
      delete updateData.patientId;
    }
    
    if (validatedData.doctorId) {
      updateData.doctor = {
        connect: { id: validatedData.doctorId },
      };
      delete updateData.doctorId;
    }
    
    const record = await prisma.medicalRecord.update({
      where: { id },
      data: updateData,
      include: {
        patient: true,
        doctor: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return medicalRecordSchema.parse(record) as MedicalRecord;
  }

  static async deleteMedicalRecord(id: number): Promise<MedicalRecord> {
    const record = await prisma.medicalRecord.delete({
      where: { id },
      include: {
        patient: true,
        doctor: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return medicalRecordSchema.parse(record) as MedicalRecord;
  }

  static async getPatientMedicalRecords(patientId: number): Promise<MedicalRecord[]> {
    const records = await prisma.medicalRecord.findMany({
      where: { patientId },
      include: {
        patient: true,
        doctor: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return records.map((record: any) => medicalRecordSchema.parse(record) as MedicalRecord);
  }

  static async getDoctorMedicalRecords(doctorId: number): Promise<MedicalRecord[]> {
    const records = await prisma.medicalRecord.findMany({
      where: { doctorId },
      include: {
        patient: true,
        doctor: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return records.map((record: any) => medicalRecordSchema.parse(record) as MedicalRecord);
  }
}

// Eski fonksiyonlar için uyumluluk katmanı
export const getAllMedicalRecordsService = () => MedicalRecordService.getAllMedicalRecords();
export const getMedicalRecordByIdService = (id: number) => MedicalRecordService.getMedicalRecordById(id);
export const getMedicalRecordsByPatientIdService = (patientId: number) => MedicalRecordService.getMedicalRecordsByPatientId(patientId);
export const createMedicalRecordService = (data: unknown) => MedicalRecordService.createMedicalRecord(data);
export const updateMedicalRecordService = (id: number, data: unknown) => MedicalRecordService.updateMedicalRecord(id, data);
export const deleteMedicalRecordService = (id: number) => MedicalRecordService.deleteMedicalRecord(id);
export const getPatientMedicalRecordsService = (patientId: number) => MedicalRecordService.getPatientMedicalRecords(patientId);
export const getDoctorMedicalRecordsService = (doctorId: number) => MedicalRecordService.getDoctorMedicalRecords(doctorId); 