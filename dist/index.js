"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const error_middleware_1 = require("./middlewares/error.middleware");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const patient_routes_1 = __importDefault(require("./routes/patient.routes"));
const doctor_routes_1 = __importDefault(require("./routes/doctor.routes"));
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const medical_record_routes_1 = __importDefault(require("./routes/medical-record.routes"));
const patient_history_routes_1 = __importDefault(require("./routes/patient-history.routes"));
const socket_service_1 = require("./services/socket.service");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Hospital Appointment API' });
});
// Routes
app.use('/api/users', user_routes_1.default);
app.use('/api/patients', patient_routes_1.default);
app.use('/api/doctors', doctor_routes_1.default);
app.use('/api/departments', department_routes_1.default);
app.use('/api/appointments', appointment_routes_1.default);
app.use('/api/medical-records', medical_record_routes_1.default);
app.use('/api/patient-history', patient_history_routes_1.default);
// Error handling
app.use(error_middleware_1.errorHandler);
const PORT = Number(process.env.PORT) || 3004;
// Initialize WebSocket server
const io = (0, socket_service_1.initSocketServer)(server);
// Start server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('WebSocket server is active');
    console.log('Press CTRL+C to stop the server');
});
// Handle server errors
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${PORT} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${PORT} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});
