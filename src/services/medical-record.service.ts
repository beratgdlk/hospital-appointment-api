import { prisma } from '../config/database';
import { z } from 'zod';

export const getAllMedicalRecordsService = async () => {
  return prisma.medicalRecord.findMany({
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
};

export const getMedicalRecordByIdService = async (id: number) => {
  return prisma.medicalRecord.findUnique({
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
};

export const getMedicalRecordsByPatientIdService = async (patientId: number) => {
  return prisma.medicalRecord.findMany({
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
};

export const createMedicalRecordService = async (data: z.infer<typeof import('../validations/medical-record.validation').medicalRecordSchema>) => {
  return prisma.medicalRecord.create({
    data: {
      patient: {
        connect: { id: data.patientId },
      },
      doctor: {
        connect: { id: data.doctorId },
      },
      diagnosis: data.diagnosis,
      treatment: data.treatment,
      prescription: data.prescription,
      notes: data.notes,
      date: new Date(data.visitDate),
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
};

export const updateMedicalRecordService = async (id: number, data: z.infer<typeof import('../validations/medical-record.validation').medicalRecordUpdateSchema>) => {
  const updateData: any = {
    ...data,
  };
  
  if (data.visitDate) {
    updateData.date = new Date(data.visitDate);
    delete updateData.visitDate;
  }

  if (data.doctorId) {
    updateData.doctor = {
      connect: { id: data.doctorId },
    };
    delete updateData.doctorId;
  }

  if (data.patientId) {
    updateData.patient = {
      connect: { id: data.patientId },
    };
    delete updateData.patientId;
  }

  return prisma.medicalRecord.update({
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
};

export const deleteMedicalRecordService = async (id: number) => {
  return prisma.medicalRecord.delete({
    where: { id },
  });
}; 