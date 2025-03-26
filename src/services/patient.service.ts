import { prisma } from '../config/database';
import { z } from 'zod';

export const getAllPatientsService = async () => {
  return prisma.patient.findMany({
    include: {
      appointments: {
        include: {
          doctor: {
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
          },
        },
      },
      medicalRecords: {
        include: {
          doctor: {
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
          },
        },
      },
    },
  });
};

export const getPatientByIdService = async (id: number) => {
  return prisma.patient.findUnique({
    where: { id },
    include: {
      appointments: {
        include: {
          doctor: {
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
          },
        },
      },
      medicalRecords: {
        include: {
          doctor: {
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
          },
        },
      },
    },
  });
};

export const getPatientByEmailService = async (email: string) => {
  return prisma.patient.findUnique({
    where: { email },
  });
};

export const createPatientService = async (data: z.infer<typeof import('../validations/patient.validation').patientSchema>) => {
  return prisma.patient.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: new Date(data.dateOfBirth),
      gender: data.gender,
      address: data.address,
    },
  });
};

export const updatePatientService = async (id: number, data: z.infer<typeof import('../validations/patient.validation').patientUpdateSchema>) => {
  const updateData: any = {
    ...data,
  };

  if (data.dateOfBirth) {
    updateData.dateOfBirth = new Date(data.dateOfBirth);
  }

  return prisma.patient.update({
    where: { id },
    data: updateData,
  });
};

export const deletePatientService = async (id: number) => {
  return prisma.patient.delete({
    where: { id },
  });
};