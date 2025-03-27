import { prisma } from '../config/database';
import { AppointmentCreate, AppointmentUpdate } from '../schemas/schema.registry';

export class AppointmentService {
  /**
   * Gets all appointments
   * @returns All appointments
   */
  static async getAllAppointments() {
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
  }

  /**
   * Gets an appointment by ID
   * @param id Appointment ID
   * @returns Appointment
   */
  static async getAppointmentById(id: number) {
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
  }

  /**
   * Gets appointments by patient ID
   * @param patientId Patient ID
   * @returns Appointments
   */
  static async getAppointmentsByPatientId(patientId: number) {
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
  }

  /**
   * Gets appointments by doctor ID
   * @param doctorId Doctor ID
   * @returns Appointments
   */
  static async getAppointmentsByDoctorId(doctorId: number) {
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
  }

  /**
   * Creates a new appointment
   * @param data Appointment data
   * @returns Created appointment
   */
  static async createAppointment(validatedData: AppointmentCreate) {
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
  }

  /**
   * Updates an appointment
   * @param id Appointment ID
   * @param data Update data
   * @returns Updated appointment
   */
  static async updateAppointment(id: number, validatedData: AppointmentUpdate) {
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
  }

  /**
   * Deletes an appointment
   * @param id Appointment ID
   * @returns Deleted appointment
   */
  static async deleteAppointment(id: number) {
    return await prisma.appointment.delete({
      where: { id },
    });
  }
}

// Eski fonksiyonlar için uyumluluk katmanı
export const getAllAppointmentsService = () => AppointmentService.getAllAppointments();
export const getAppointmentByIdService = (id: number) => AppointmentService.getAppointmentById(id);
export const getAppointmentsByPatientIdService = (patientId: number) => AppointmentService.getAppointmentsByPatientId(patientId);
export const getAppointmentsByDoctorIdService = (doctorId: number) => AppointmentService.getAppointmentsByDoctorId(doctorId);
export const createAppointmentService = (validatedData: AppointmentCreate) => AppointmentService.createAppointment(validatedData);
export const updateAppointmentService = (id: number, validatedData: AppointmentUpdate) => AppointmentService.updateAppointment(id, validatedData);
export const deleteAppointmentService = (id: number) => AppointmentService.deleteAppointment(id); 