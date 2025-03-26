import { prisma } from '../config/database';
import { z } from 'zod';

export const getAllAppointmentsService = async () => {
  return prisma.appointment.findMany({
    include: {
      patient: true,
      doctor: true,
    },
  });
};

export const getAppointmentByIdService = async (id: number) => {
  return prisma.appointment.findUnique({
    where: { id },
    include: {
      patient: true,
      doctor: true,
    },
  });
};

export const getAppointmentsByPatientIdService = async (patientId: number) => {
  return prisma.appointment.findMany({
    where: { patientId },
    include: {
      patient: true,
      doctor: true,
    },
  });
};

export const getAppointmentsByDoctorIdService = async (doctorId: number) => {
  return prisma.appointment.findMany({
    where: { doctorId },
    include: {
      patient: true,
      doctor: true,
    },
  });
};

export const createAppointmentService = async (data: z.infer<typeof import('../validations/appointment.validation').appointmentSchema>) => {
  return prisma.appointment.create({
    data: {
      ...data,
      date: new Date(data.appointmentDate),
    },
    include: {
      patient: true,
      doctor: true,
    },
  });
};

export const updateAppointmentService = async (id: number, data: z.infer<typeof import('../validations/appointment.validation').appointmentUpdateSchema>) => {
  return prisma.appointment.update({
    where: { id },
    data: {
      ...data,
      date: data.appointmentDate ? new Date(data.appointmentDate) : undefined,
    },
    include: {
      patient: true,
      doctor: true,
    },
  });
};

export const deleteAppointmentService = async (id: number) => {
  return prisma.appointment.delete({
    where: { id },
  });
}; 