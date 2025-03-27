import { PrismaClient } from '@prisma/client';
import { AppointmentCreate, AppointmentUpdate } from '../schemas/schema.registry';

const prismaClient = new PrismaClient();

/**
 * Tüm randevuları getirir
 * @returns Tüm randevular
 */
export const getAllAppointmentsService = async () => {
  return await prismaClient.appointment.findMany({
    include: {
      doctor: {
        include: {
          user: true,
          department: true,
        },
      },
      patient: true,
    },
  });
};

/**
 * ID'ye göre randevu getirir
 * @param id Randevu ID'si
 * @returns Randevu
 */
export const getAppointmentByIdService = async (id: number) => {
  return await prismaClient.appointment.findUnique({
    where: { id },
    include: {
      doctor: {
        include: {
          user: true,
          department: true,
        },
      },
      patient: true,
    },
  });
};

/**
 * Hasta ID'sine göre randevuları getirir
 * @param patientId Hasta ID'si
 * @returns Randevular
 */
export const getAppointmentsByPatientIdService = async (patientId: number) => {
  return await prismaClient.appointment.findMany({
    where: { patientId },
    include: {
      doctor: {
        include: {
          user: true,
          department: true,
        },
      },
      patient: true,
    },
  });
};

/**
 * Doktor ID'sine göre randevuları getirir
 * @param doctorId Doktor ID'si
 * @returns Randevular
 */
export const getAppointmentsByDoctorIdService = async (doctorId: number) => {
  return await prismaClient.appointment.findMany({
    where: { doctorId },
    include: {
      doctor: {
        include: {
          user: true,
          department: true,
        },
      },
      patient: true,
    },
  });
};

/**
 * Yeni randevu oluşturur
 * @param data Randevu verileri
 * @returns Oluşturulan randevu
 */
export const createAppointmentService = async (validatedData: AppointmentCreate) => {
  return await prismaClient.appointment.create({
    data: {
      date: validatedData.date,
      status: validatedData.status ? validatedData.status as any : 'scheduled',
      doctorId: validatedData.doctorId,
      patientId: validatedData.patientId,
      notes: validatedData.notes || null,
    },
    include: {
      doctor: {
        include: {
          user: true,
          department: true,
        },
      },
      patient: true,
    },
  });
};

/**
 * Randevu günceller
 * @param id Randevu ID'si
 * @param data Güncelleme verileri
 * @returns Güncellenen randevu
 */
export const updateAppointmentService = async (id: number, validatedData: AppointmentUpdate) => {
  return await prismaClient.appointment.update({
    where: { id },
    data: {
      date: validatedData.date,
      status: validatedData.status ? validatedData.status as any : undefined,
      doctorId: validatedData.doctorId,
      patientId: validatedData.patientId,
      notes: validatedData.notes,
    },
    include: {
      doctor: {
        include: {
          user: true,
          department: true,
        },
      },
      patient: true,
    },
  });
};

/**
 * Randevu siler
 * @param id Randevu ID'si
 * @returns Silinen randevu
 */
export const deleteAppointmentService = async (id: number) => {
  return await prismaClient.appointment.delete({
    where: { id },
  });
}; 