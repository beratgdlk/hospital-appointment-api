import { Server } from 'socket.io';
import http from 'http';
import { 
  TypedServer, 
  PatientCallData, 
  WaitingRoomUpdate,
  PatientHistoryUpdate,
  CallStatus 
} from '../types/socket.types';

/**
 * Global Socket.io server instance
 */
let io: TypedServer;

/**
 * Initialize Socket.io server
 * @param server HTTP server
 */
export const initSocketServer = (server: http.Server): TypedServer => {
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
    socket.on('callPatient', (data) => {
      const callData: PatientCallData = {
        appointmentId: data.appointmentId,
        patientId: 0, // Will be retrieved from service layer or database
        patientName: '', // Will be retrieved from service layer or database
        doctorId: 0, // Will be retrieved from current session or database
        doctorName: '', // Will be retrieved from current session or database
        roomNumber: data.roomNumber,
        status: CallStatus.CALLED,
        timestamp: new Date()
      };

      // Broadcast patient call event
      io.emit('patientCall', callData);
    });

    // When doctor updates patient status
    socket.on('updatePatientStatus', (data) => {
      // Call to service layer to update patient status in database

      // Broadcast the update
      io.emit('patientCall', {
        appointmentId: data.appointmentId,
        patientId: 0, // Will be retrieved from service layer or database
        patientName: '', // Will be retrieved from service layer or database
        doctorId: 0, // Will be retrieved from current session or database
        doctorName: '', // Will be retrieved from current session or database
        roomNumber: '', // Will be retrieved from service layer or database
        status: data.status,
        timestamp: new Date()
      });
    });

    // Request for waiting room status
    socket.on('getWaitingRoomStatus', (departmentId) => {
      // Call to service layer to get waiting room status from database

      // Example data
      const waitingRoomData: WaitingRoomUpdate = {
        departmentId: departmentId,
        waitingPatients: [] // Will be retrieved from service layer or database
      };

      // Emit waiting room update
      socket.emit('waitingRoomUpdate', waitingRoomData);
    });

    // When connection closes
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

/**
 * Emit patient call status
 * @param data Patient call data
 */
export const emitPatientCall = (data: PatientCallData): void => {
  if (io) {
    io.emit('patientCall', data);
  }
};

/**
 * Emit waiting room status update
 * @param data Waiting room update data
 */
export const emitWaitingRoomUpdate = (data: WaitingRoomUpdate): void => {
  if (io) {
    io.emit('waitingRoomUpdate', data);
  }
};

/**
 * Emit patient history update
 * @param data Patient history update data
 */
export const emitPatientHistoryUpdate = (data: PatientHistoryUpdate): void => {
  if (io) {
    io.emit('patientHistoryUpdate', data);
  }
};

/**
 * Get global Socket.io server instance
 * @returns Socket.io server
 */
export const getSocketServer = (): TypedServer | undefined => {
  return io;
}; 