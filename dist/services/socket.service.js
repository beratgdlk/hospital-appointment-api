"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketServer = exports.emitPatientHistoryUpdate = exports.emitWaitingRoomUpdate = exports.emitPatientCall = exports.initSocketServer = void 0;
const socket_io_1 = require("socket.io");
const socket_types_1 = require("../types/socket.types");
/**
 * Global Socket.io server instance
 */
let io;
/**
 * Initialize Socket.io server
 * @param server HTTP server
 */
const initSocketServer = (server) => {
    io = new socket_io_1.Server(server, {
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
            const callData = {
                appointmentId: data.appointmentId,
                patientId: 0, // Will be retrieved from service layer or database
                patientName: '', // Will be retrieved from service layer or database
                doctorId: 0, // Will be retrieved from current session or database
                doctorName: '', // Will be retrieved from current session or database
                roomNumber: data.roomNumber,
                status: socket_types_1.CallStatus.CALLED,
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
            const waitingRoomData = {
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
exports.initSocketServer = initSocketServer;
/**
 * Emit patient call status
 * @param data Patient call data
 */
const emitPatientCall = (data) => {
    if (io) {
        io.emit('patientCall', data);
    }
};
exports.emitPatientCall = emitPatientCall;
/**
 * Emit waiting room status update
 * @param data Waiting room update data
 */
const emitWaitingRoomUpdate = (data) => {
    if (io) {
        io.emit('waitingRoomUpdate', data);
    }
};
exports.emitWaitingRoomUpdate = emitWaitingRoomUpdate;
/**
 * Emit patient history update
 * @param data Patient history update data
 */
const emitPatientHistoryUpdate = (data) => {
    if (io) {
        io.emit('patientHistoryUpdate', data);
    }
};
exports.emitPatientHistoryUpdate = emitPatientHistoryUpdate;
/**
 * Get global Socket.io server instance
 * @returns Socket.io server
 */
const getSocketServer = () => {
    return io;
};
exports.getSocketServer = getSocketServer;
