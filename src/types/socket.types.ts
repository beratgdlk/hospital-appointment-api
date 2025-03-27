import { Server, Socket } from 'socket.io';

// Patient call statuses
export enum CallStatus {
  WAITING = 'waiting',
  CALLED = 'called',
  COMPLETED = 'completed',
  MISSED = 'missed'
}

// Socket events
export interface ServerToClientEvents {
  // Patient call event
  patientCall: (data: PatientCallData) => void;
  // Patient history update
  patientHistoryUpdate: (data: PatientHistoryUpdate) => void;
  // Waiting room status
  waitingRoomUpdate: (data: WaitingRoomUpdate) => void;
}

export interface ClientToServerEvents {
  // Doctor's call
  callPatient: (data: CallPatientData) => void;
  // Doctor updates patient status
  updatePatientStatus: (data: UpdatePatientStatusData) => void;
  // Request waiting room status
  getWaitingRoomStatus: (departmentId: number) => void;
}

// Data types
export interface PatientCallData {
  appointmentId: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  roomNumber: string;
  status: CallStatus;
  timestamp: Date;
}

export interface CallPatientData {
  appointmentId: number;
  roomNumber: string;
}

export interface UpdatePatientStatusData {
  appointmentId: number;
  status: CallStatus;
  roomNumber?: string; // Opsiyonel oda numarası
}

export interface PatientHistoryUpdate {
  patientId: number;
  recordId: number;
  action: 'added' | 'updated' | 'deleted';
  timestamp: Date;
}

export interface WaitingRoomUpdate {
  departmentId: number;
  waitingPatients: WaitingPatient[];
}

export interface WaitingPatient {
  appointmentId: number;
  patientId: number;
  patientName: string;
  doctorId: number; // Doktor ID'si
  doctorName: string; // Doktor adı
  appointmentTime: Date;
  waitingSince: Date;
  status: CallStatus;
}

// Socket.io Server and Socket types
export type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;
export type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>; 