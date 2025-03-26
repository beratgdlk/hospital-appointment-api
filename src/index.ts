import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import userRoutes from './routes/user.routes';
import patientRoutes from './routes/patient.routes';
import doctorRoutes from './routes/doctor.routes';
import departmentRoutes from './routes/department.routes';
import appointmentRoutes from './routes/appointment.routes';
import medicalRecordRoutes from './routes/medical-record.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', medicalRecordRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
