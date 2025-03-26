"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error.middleware");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const patient_routes_1 = __importDefault(require("./routes/patient.routes"));
const doctor_routes_1 = __importDefault(require("./routes/doctor.routes"));
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const medical_record_routes_1 = __importDefault(require("./routes/medical-record.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/users', user_routes_1.default);
app.use('/api/patients', patient_routes_1.default);
app.use('/api/doctors', doctor_routes_1.default);
app.use('/api/departments', department_routes_1.default);
app.use('/api/appointments', appointment_routes_1.default);
app.use('/api/medical-records', medical_record_routes_1.default);
// Error handling
app.use(error_middleware_1.errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
