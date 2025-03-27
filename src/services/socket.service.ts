import { Server } from 'socket.io';
import http from 'http';
import { prisma } from '../config/database';
import { 
  TypedServer, 
  PatientCallData, 
  WaitingRoomUpdate,
  PatientHistoryUpdate,
  CallStatus,
  WaitingPatient,
  UpdatePatientStatusData
} from '../types/socket.types';

/**
 * Global Socket.io server instance
 */
let io: TypedServer;

export class SocketService {
  /**
   * Initialize Socket.io server
   * @param server HTTP server
   */
  static initSocketServer(server: http.Server): TypedServer {
    io = new Server(server, {
      cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    // When a new client connects
    io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);

      // Listen for doctor's patient call event
      socket.on('callPatient', async (data) => {
        try {
          // Get appointment and patient information from database
          const appointment = await prisma.appointment.findUnique({
            where: { id: data.appointmentId },
            include: {
              patient: true,
              doctor: {
                include: { user: true }
              }
            }
          });

          if (!appointment) {
            console.error(`Appointment not found: ${data.appointmentId}`);
            return;
          }

          const callData: PatientCallData = {
            appointmentId: data.appointmentId,
            patientId: appointment.patient.id,
            patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
            doctorId: appointment.doctor.id,
            doctorName: `${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`,
            roomNumber: data.roomNumber,
            status: CallStatus.CALLED,
            timestamp: new Date()
          };

          // Broadcast patient call event
          io.emit('patientCall', callData);
        } catch (error) {
          console.error('Error calling patient:', error);
        }
      });

      // When doctor updates patient status
      socket.on('updatePatientStatus', async (data: UpdatePatientStatusData & { roomNumber?: string }) => {
        try {
          // Update appointment status
          await prisma.appointment.update({
            where: { id: data.appointmentId },
            data: { status: data.status }
          });

          // Get updated appointment information
          const appointment = await prisma.appointment.findUnique({
            where: { id: data.appointmentId },
            include: {
              patient: true,
              doctor: {
                include: { user: true }
              }
            }
          });

          if (!appointment) {
            console.error(`Appointment not found: ${data.appointmentId}`);
            return;
          }

          // Broadcast the update
          io.emit('patientCall', {
            appointmentId: data.appointmentId,
            patientId: appointment.patient.id,
            patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
            doctorId: appointment.doctor.id,
            doctorName: `${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`,
            roomNumber: data.roomNumber || '',
            status: data.status,
            timestamp: new Date()
          });
        } catch (error) {
          console.error('Error updating patient status:', error);
        }
      });

      // Request for waiting room status
      socket.on('getWaitingRoomStatus', async (departmentId) => {
        try {
          // Get waiting patients by department
          const waitingAppointments = await prisma.appointment.findMany({
            where: {
              doctor: {
                departmentId: departmentId
              },
              status: 'scheduled',
              date: {
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
                lt: new Date(new Date().setHours(23, 59, 59, 999))
              }
            },
            include: {
              patient: true,
              doctor: {
                include: { user: true }
              }
            },
            orderBy: {
              date: 'asc'
            }
          });

          // Prepare waiting room data
          const waitingRoomData: WaitingRoomUpdate = {
            departmentId: departmentId,
            waitingPatients: waitingAppointments.map((appointment: any) => ({
              appointmentId: appointment.id,
              patientId: appointment.patient.id,
              patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
              doctorId: appointment.doctor.id,
              doctorName: `${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`,
              appointmentTime: appointment.date,
              waitingSince: appointment.createdAt || new Date(),
              status: appointment.status
            } as WaitingPatient))
          };

          // Emit waiting room update
          socket.emit('waitingRoomUpdate', waitingRoomData);
        } catch (error) {
          console.error('Error fetching waiting room status:', error);
        }
      });

      // When connection closes
      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });

    return io;
  }

  /**
   * Emit patient call status
   * @param data Patient call data
   */
  static emitPatientCall(data: PatientCallData): void {
    if (io) {
      io.emit('patientCall', data);
    }
  }

  /**
   * Emit waiting room status update
   * @param data Waiting room update data
   */
  static emitWaitingRoomUpdate(data: WaitingRoomUpdate): void {
    if (io) {
      io.emit('waitingRoomUpdate', data);
    }
  }

  /**
   * Emit patient history update
   * @param data Patient history update data
   */
  static emitPatientHistoryUpdate(data: PatientHistoryUpdate): void {
    if (io) {
      io.emit('patientHistoryUpdate', data);
    }
  }

  /**
   * Get global Socket.io server instance
   * @returns Socket.io server
   */
  static getSocketServer(): TypedServer | undefined {
    return io;
  }
}

// Eski fonksiyonlar için uyumluluk katmanı
export const initSocketServer = (server: http.Server): TypedServer => SocketService.initSocketServer(server);
export const emitPatientCall = (data: PatientCallData): void => SocketService.emitPatientCall(data);
export const emitWaitingRoomUpdate = (data: WaitingRoomUpdate): void => SocketService.emitWaitingRoomUpdate(data);
export const emitPatientHistoryUpdate = (data: PatientHistoryUpdate): void => SocketService.emitPatientHistoryUpdate(data);
export const getSocketServer = (): TypedServer | undefined => SocketService.getSocketServer(); 