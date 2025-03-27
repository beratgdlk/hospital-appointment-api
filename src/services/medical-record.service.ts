import { prisma } from '../config/database';
import { MedicalRecord } from '../types/types';
import { medicalRecordCreateSchema, medicalRecordSchema, medicalRecordUpdateSchema } from '../schemas/schema.registry';

export const getAllMedicalRecordsService = async (): Promise<MedicalRecord[]> => {
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

  return records.map(record => medicalRecordSchema.parse(record) as MedicalRecord);
};

export const getMedicalRecordByIdService = async (id: number): Promise<MedicalRecord | null> => {
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
};

export const getMedicalRecordsByPatientIdService = async (patientId: number): Promise<MedicalRecord[]> => {
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

  return records.map(record => medicalRecordSchema.parse(record) as MedicalRecord);
};

export const createMedicalRecordService = async (data: unknown): Promise<MedicalRecord> => {
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
};

export const updateMedicalRecordService = async (
  id: number, 
  data: unknown
): Promise<MedicalRecord> => {
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
};

export const deleteMedicalRecordService = async (id: number): Promise<MedicalRecord> => {
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
};

export const getPatientMedicalRecordsService = async (patientId: number): Promise<MedicalRecord[]> => {
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

  return records.map(record => medicalRecordSchema.parse(record) as MedicalRecord);
};

export const getDoctorMedicalRecordsService = async (doctorId: number): Promise<MedicalRecord[]> => {
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

  return records.map(record => medicalRecordSchema.parse(record) as MedicalRecord);
}; 