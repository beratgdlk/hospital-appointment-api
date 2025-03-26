import { Request, Response, NextFunction } from 'express';
import {
  getAllAppointmentsService,
  getAppointmentByIdService,
  createAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
  getAppointmentsByPatientIdService,
  getAppointmentsByDoctorIdService,
} from '../services/appointment.service';
import { AppError } from '../middlewares/error.middleware';

export const getAllAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const appointments = await getAllAppointmentsService();
    res.status(200).json({
      status: 'success',
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const appointment = await getAppointmentByIdService(Number(id));
    if (!appointment) {
      throw new AppError('Appointment not found', 404);
    }
    res.status(200).json({
      status: 'success',
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentsByPatientId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { patientId } = req.params;
    const appointments = await getAppointmentsByPatientIdService(Number(patientId));
    res.status(200).json({
      status: 'success',
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentsByDoctorId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { doctorId } = req.params;
    const appointments = await getAppointmentsByDoctorIdService(Number(doctorId));
    res.status(200).json({
      status: 'success',
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newAppointment = await createAppointmentService(req.body);
    res.status(201).json({
      status: 'success',
      data: newAppointment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingAppointment = await getAppointmentByIdService(Number(id));
    
    if (!existingAppointment) {
      throw new AppError('Appointment not found', 404);
    }

    const updatedAppointment = await updateAppointmentService(Number(id), req.body);
    res.status(200).json({
      status: 'success',
      data: updatedAppointment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const existingAppointment = await getAppointmentByIdService(Number(id));
    
    if (!existingAppointment) {
      throw new AppError('Appointment not found', 404);
    }

    await deleteAppointmentService(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 