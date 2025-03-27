import { prisma } from '../config/database';
import { AppointmentCreate, AppointmentUpdate } from '../schemas/schema.registry';

/**
 * Gets all appointments
 * @returns All appointments
 */
export const getAllAppointmentsService = async () => {
  return await prisma.appointment.findMany({
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
 * Gets an appointment by ID
 * @param id Appointment ID
 * @returns Appointment
 */
export const getAppointmentByIdService = async (id: number) => {
  return await prisma.appointment.findUnique({
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
 * Gets appointments by patient ID
 * @param patientId Patient ID
 * @returns Appointments
 */
export const getAppointmentsByPatientIdService = async (patientId: number) => {
  return await prisma.appointment.findMany({
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
 * Gets appointments by doctor ID
 * @param doctorId Doctor ID
 * @returns Appointments
 */
export const getAppointmentsByDoctorIdService = async (doctorId: number) => {
  return await prisma.appointment.findMany({
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
 * Creates a new appointment
 * @param data Appointment data
 * @returns Created appointment
 */
export const createAppointmentService = async (validatedData: AppointmentCreate) => {
  return await prisma.appointment.create({
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
 * Updates an appointment
 * @param id Appointment ID
 * @param data Update data
 * @returns Updated appointment
 */
export const updateAppointmentService = async (id: number, validatedData: AppointmentUpdate) => {
  return await prisma.appointment.update({
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
 * Deletes an appointment
 * @param id Appointment ID
 * @returns Deleted appointment
 */
export const deleteAppointmentService = async (id: number) => {
  return await prisma.appointment.delete({
    where: { id },
  });
}; 