import { Request, Response, NextFunction } from 'express';
import { appointmentCreateSchema, appointmentUpdateSchema } from '../schemas/schema.registry';
import {
  getAllAppointmentsService,
  getAppointmentByIdService,
  getAppointmentsByPatientIdService,
  getAppointmentsByDoctorIdService,
  createAppointmentService,
  updateAppointmentService,
  deleteAppointmentService
} from '../services/appointment.service';
import { AppError } from '../middlewares/error.middleware';

export const getAllAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointments = await getAllAppointmentsService();
    
    res.status(200).json({
      status: 'success',
      data: {
        appointments
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const appointment = await getAppointmentByIdService(id);
    
    if (!appointment) {
      next(new AppError('Appointment not found', 404, true));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        appointment
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentsByPatientId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const patientId = Number(req.params.patientId);
    
    const appointments = await getAppointmentsByPatientIdService(patientId);
    
    res.status(200).json({
      status: 'success',
      data: {
        appointments
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentsByDoctorId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doctorId = Number(req.params.doctorId);
    
    const appointments = await getAppointmentsByDoctorIdService(doctorId);
    
    res.status(200).json({
      status: 'success',
      data: {
        appointments
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointmentData = appointmentCreateSchema.parse(req.body);
    
    const appointment = await createAppointmentService(appointmentData);
    
    res.status(201).json({
      status: 'success',
      data: {
        appointment
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const appointmentData = appointmentUpdateSchema.parse(req.body);
    
    const appointment = await updateAppointmentService(id, appointmentData);
    
    if (!appointment) {
      next(new AppError('Appointment not found', 404, true));
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        appointment
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    
    const appointment = await deleteAppointmentService(id);
    
    if (!appointment) {
      next(new AppError('Appointment not found', 404, true));
      return;
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
}; 