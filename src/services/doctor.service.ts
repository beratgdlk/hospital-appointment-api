import { prisma } from '../config/database';
import { z } from 'zod';

export const getAllDoctorsService = async () => {
  return prisma.doctor.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      },
      department: true,
      appointments: true,
      medicalRecords: true,
    },
  });
};

export const getDoctorByIdService = async (id: number) => {
  return prisma.doctor.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      },
      department: true,
      appointments: true,
      medicalRecords: true,
    },
  });
};

export const createDoctorService = async (data: z.infer<typeof import('../validations/doctor.validation').doctorSchema>) => {
  return prisma.doctor.create({
    data: {
      user: {
        connect: { id: data.userId },
      },
      department: {
        connect: { id: data.departmentId },
      },
      specialization: data.specialization,
      licenseNumber: data.licenseNumber,
      experience: data.experience,
      education: data.education,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      },
      department: true,
    },
  });
};

export const updateDoctorService = async (id: number, data: z.infer<typeof import('../validations/doctor.validation').doctorUpdateSchema>) => {
  const updateData: any = {
    ...data,
  };

  if (data.userId) {
    updateData.user = {
      connect: { id: data.userId },
    };
    delete updateData.userId;
  }

  if (data.departmentId) {
    updateData.department = {
      connect: { id: data.departmentId },
    };
    delete updateData.departmentId;
  }

  return prisma.doctor.update({
    where: { id },
    data: updateData,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      },
      department: true,
    },
  });
};

export const deleteDoctorService = async (id: number) => {
  return prisma.doctor.delete({
    where: { id },
  });
}; 