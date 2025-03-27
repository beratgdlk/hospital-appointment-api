import { prisma } from '../config/database';
import { Appointment } from '../types/types';
import { appointmentCreateSchema, appointmentSchema, appointmentUpdateSchema } from '../schemas/schema.registry';

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  const appointments = await prisma.appointment.findMany({
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

  return appointments.map(appointment => appointmentSchema.parse(appointment) as Appointment);
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
  const appointment = await prisma.appointment.findUnique({
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

  return appointment ? (appointmentSchema.parse(appointment) as Appointment) : null;
};

export const getAppointmentsByPatientIdService = async (patientId: number): Promise<Appointment[]> => {
  const appointments = await prisma.appointment.findMany({
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

  return appointments.map(appointment => appointmentSchema.parse(appointment) as Appointment);
};

export const getAppointmentsByDoctorIdService = async (doctorId: number): Promise<Appointment[]> => {
  const appointments = await prisma.appointment.findMany({
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

  return appointments.map(appointment => appointmentSchema.parse(appointment) as Appointment);
};

export const createAppointmentService = async (data: unknown): Promise<Appointment> => {
  const validatedData = appointmentCreateSchema.parse(data);
  
  const appointment = await prisma.appointment.create({
    data: {
      date: validatedData.date,
      status: validatedData.status || 'Beklemede',
      notes: validatedData.notes || null,
      doctor: {
        connect: { id: validatedData.doctorId },
      },
      patient: {
        connect: { id: validatedData.patientId },
      },
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

  return appointmentSchema.parse(appointment) as Appointment;
};

export const updateAppointmentService = async (
  id: number, 
  data: unknown
): Promise<Appointment> => {
  const validatedData = appointmentUpdateSchema.parse(data);
  const updateData: any = { ...validatedData };
  
  if (validatedData.doctorId) {
    updateData.doctor = {
      connect: { id: validatedData.doctorId },
    };
    delete updateData.doctorId;
  }
  
  if (validatedData.patientId) {
    updateData.patient = {
      connect: { id: validatedData.patientId },
    };
    delete updateData.patientId;
  }
  
  const appointment = await prisma.appointment.update({
    where: { id },
    data: updateData,
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

  return appointmentSchema.parse(appointment) as Appointment;
};

export const deleteAppointmentService = async (id: number): Promise<Appointment> => {
  const appointment = await prisma.appointment.delete({
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

  return appointmentSchema.parse(appointment) as Appointment;
}; 