# Hospital Appointment API

A comprehensive backend API for a modern and secure hospital appointment system.

## Project Technologies and Purpose

### Core Technologies

- **Node.js**: Chosen for developing high-performance server-side applications using a fast, event-driven, asynchronous I/O model. The ability to use JavaScript on the server side accelerates the development process.

- **Express.js**: A minimalist and flexible web application framework for Node.js. With its middleware structure, route management, and HTTP request handling capabilities, it's an excellent choice for developing REST APIs.

- **TypeScript**: A programming language that adds static type checking to JavaScript. Type safety enables early detection of errors, improves code quality, and enhances developer productivity with IDE support.

### Database and ORM

- **PostgreSQL**: A powerful, open-source relational database system. Its support for complex data types, data integrity, and ACID compliance makes it ideal for storing critical data such as hospital systems.

- **Prisma ORM**: A modern Object-Relational Mapping tool. Its full integration with TypeScript, automatic type generation, schema migration management, and intuitive API simplify database operations, making database interactions safer and more efficient.

### Security and Authentication

- **JSON Web Token (JWT)**: A compact, self-contained token format used to authenticate users. Provides serverless authentication and secure API access without maintaining session state.

- **bcrypt**: A cryptographic library used to securely hash passwords. Its slow hash algorithm makes it resistant to brute force attacks.

- **Helmet.js**: Secures HTTP headers to protect against many common web security vulnerabilities. Helps prevent XSS, CSRF, clickjacking, and other attacks.

- **express-rate-limit**: Helps prevent brute force and DoS attacks by limiting requests to the API. Can limit requests per user or per IP address.

### Data Validation

- **Zod**: A TypeScript-friendly schema validation library. Checks the validity of incoming data, prevents erroneous inputs, and ensures type safety. Can easily validate even complex data structures.

### Real-time Communication

- **Socket.IO**: A WebSocket-based real-time communication library. Provides real-time features such as instant notifications, live updates, and patient calling systems between hospital staff and patients.

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Business logic controllers
├── middlewares/    # Middlewares
│   ├── auth.middleware.ts      # Authentication and authorization
│   ├── error.middleware.ts     # Central error handling
│   ├── validation.middleware.ts # Schema validation
│   ├── rate-limiter.middleware.ts # Request limiting
├── routes/         # API routes
│   ├── auth.routes.ts          # Authentication routes
│   ├── user.routes.ts          # User routes
│   ├── patient.routes.ts       # Patient routes
│   ├── doctor.routes.ts        # Doctor routes
│   ├── appointment.routes.ts   # Appointment routes
│   ├── department.routes.ts    # Department routes
│   ├── medical-record.routes.ts # Medical record routes
│   ├── patient-history.routes.ts # Patient history routes
├── schemas/        # Data schemas
│   ├── base.schema.ts          # Basic schema definitions
│   ├── schema.registry.ts      # Central schema registry
├── services/       # Business logic services
│   ├── socket.service.ts       # WebSocket service layer
│   ├── user.service.ts         # User service layer
│   ├── patient.service.ts      # Patient service layer
│   ├── doctor.service.ts       # Doctor service layer
│   ├── appointment.service.ts  # Appointment service layer
│   ├── department.service.ts   # Department service layer
│   ├── medical-record.service.ts # Medical record service layer
│   ├── patient-history.service.ts # Patient history service layer
├── types/          # TypeScript type definitions
│   ├── types.ts                # General type definitions
│   ├── socket.types.ts         # WebSocket type definitions
│   ├── prisma.error.ts         # Prisma error types
└── index.ts        # Main application file
```

## Architectural Approach

The project follows these architectural principles:

### Layered Architecture
- **Controller Layer**: Receives HTTP requests, calls the service layer, and formats and sends responses.
- **Service Layer**: Contains business logic, interacts with the database.
- **Data Access Layer**: Provides database interaction via Prisma ORM.

### Middleware Structure
Express.js's middleware structure makes operations such as authentication, authorization, request limiting, and data validation modular and reusable.

### Schema-Based Validation
Schema definitions are made for all API inputs and outputs using Zod to ensure data integrity and consistency.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Users

- `GET /api/users` - List all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `GET /api/users/email/:email` - Get user by email (admin only)
- `POST /api/users` - Create a new user (admin only)
- `PUT /api/users/:id` - Update user information (admin only)
- `DELETE /api/users/:id` - Delete a user (admin only)

### Patients

- `GET /api/patients` - List all patients (doctor, secretary, admin)
- `GET /api/patients/:id` - Get patient by ID (doctor, secretary, admin)
- `GET /api/patients/email/:email` - Get patient by email (doctor, secretary, admin)
- `POST /api/patients` - Create a new patient (secretary, admin)
- `PUT /api/patients/:id` - Update patient information (secretary, admin)
- `DELETE /api/patients/:id` - Delete a patient (admin only)

### Doctors

- `GET /api/doctors` - List all doctors (authentication required)
- `GET /api/doctors/:id` - Get doctor by ID (authentication required)
- `POST /api/doctors` - Create a new doctor (admin only)
- `PUT /api/doctors/:id` - Update doctor information (admin only)
- `DELETE /api/doctors/:id` - Delete a doctor (admin only)

### Departments

- `GET /api/departments` - List all departments (public)
- `GET /api/departments/:id` - Get department by ID (public)
- `POST /api/departments` - Create a new department (admin only)
- `PUT /api/departments/:id` - Update department information (admin only)
- `DELETE /api/departments/:id` - Delete a department (admin only)

### Appointments

- `GET /api/appointments` - List all appointments (doctor, secretary, admin)
- `GET /api/appointments/:id` - Get appointment by ID (doctor, secretary, admin)
- `GET /api/appointments/patient/:patientId` - Get appointments by patient ID (doctor, secretary, admin)
- `GET /api/appointments/doctor/:doctorId` - Get appointments by doctor ID (doctor, secretary, admin)
- `POST /api/appointments` - Create a new appointment (secretary, admin)
- `PUT /api/appointments/:id` - Update appointment information (secretary, admin)
- `DELETE /api/appointments/:id` - Delete an appointment (admin only)

### Medical Records

- `GET /api/medical-records` - List all medical records (doctor, admin)
- `GET /api/medical-records/:id` - Get medical record by ID (doctor, admin)
- `GET /api/medical-records/patient/:patientId` - Get medical records by patient ID (doctor, admin)
- `POST /api/medical-records` - Create a new medical record (doctor only)
- `PUT /api/medical-records/:id` - Update medical record information (doctor only)
- `DELETE /api/medical-records/:id` - Delete a medical record (admin only)

### Patient History

- `GET /api/patient-history` - List all patient history records (doctor, admin)
- `GET /api/patient-history/:id` - Get patient history record by ID (doctor, admin)
- `GET /api/patient-history/patient/:patientId` - Get history records by patient ID (doctor, admin)
- `GET /api/patient-history/patient/:patientId/type/:recordType` - Get history records by patient ID and record type (doctor, admin)
- `POST /api/patient-history` - Create a new patient history record (doctor only)
- `PUT /api/patient-history/:id` - Update patient history record (doctor only)
- `DELETE /api/patient-history/:id` - Delete a patient history record (admin only)

## Real-time Communication with WebSockets

The API uses Socket.IO for real-time communication. WebSocket server runs on the same port as the REST API.

### Socket.IO Events

#### Server-to-Client Events:
- `patientCall`: Emitted when a doctor calls a patient
  ```json
  {
    "doctorId": 1,
    "doctorName": "Dr. John Smith",
    "patientId": 5,
    "patientName": "Jane Doe",
    "room": "Room 101"
  }
  ```

- `appointmentUpdated`: Emitted when an appointment is updated
  ```json
  {
    "id": 12,
    "status": "completed",
    "date": "2023-06-15T14:30:00Z",
    "patient": {
      "id": 5,
      "name": "Jane Doe"
    },
    "doctor": {
      "id": 1,
      "name": "Dr. John Smith"
    }
  }
  ```

- `waitingRoomUpdate`: Emitted when waiting room status changes
  ```json
  {
    "waitingPatients": [
      {"id": 5, "name": "Jane Doe", "estimatedWaitTime": 15},
      {"id": 8, "name": "John Johnson", "estimatedWaitTime": 30}
    ],
    "currentPatient": {"id": 3, "name": "Mike Brown"}
  }
  ```

#### Client-to-Server Events:
- `joinRoom`: Join a specific room (e.g., doctor's room or department)
  ```json
  {
    "roomId": "doctor_1" // or "department_3"
  }
  ```

- `leaveRoom`: Leave a room
  ```json
  {
    "roomId": "doctor_1"
  }
  ```

- `callPatient`: Call the next patient (sent by doctor)
  ```json
  {
    "doctorId": 1,
    "patientId": 5,
    "room": "Room 101"
  }
  ```

### WebSocket Connection Example

```javascript
// Client-side example using Socket.IO client
import { io } from "socket.io-client";

// Connect to the WebSocket server
const socket = io("http://localhost:3006", {
  extraHeaders: {
    Authorization: "Bearer YOUR_JWT_TOKEN" // Authenticate with JWT
  }
});

// Listen for events
socket.on("patientCall", (data) => {
  console.log("Patient called:", data);
  // Update UI to show patient being called
});

socket.on("appointmentUpdated", (data) => {
  console.log("Appointment updated:", data);
  // Update appointment in UI
});

socket.on("waitingRoomUpdate", (data) => {
  console.log("Waiting room updated:", data);
  // Update waiting room display
});

// Emit events
socket.emit("joinRoom", { roomId: "doctor_1" });

// Call a patient (doctor only)
socket.emit("callPatient", {
  doctorId: 1,
  patientId: 5,
  room: "Room 101"
});
```

## Security Measures

Several security measures are implemented in the API:

- **JWT-Based Authentication**: Provides secure token-based authentication.
- **Role-Based Access Control (RBAC)**: Different access permissions are defined for different user roles.
- **Rate Limiting**: Provides protection against brute force and DoS attacks.
- **HTTP Security Headers**: Protection against various web security vulnerabilities using Helmet.js.
- **Input Validation**: All API requests are validated with Zod.
- **CORS Configuration**: Cross-Origin Resource Sharing settings are configurable.
- **Password Security**: Passwords are hashed with bcrypt.

### Using JWT Authentication

After logging in, you'll receive a JWT token in the response:

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

To access protected endpoints, include this token in the Authorization header of your requests:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Tokens expire after the time specified in JWT_EXPIRES_IN environment variable (default: 90 days).

### Error Handling

All API errors follow a consistent format:

```json
{
  "status": "error",
  "message": "Error message description",
  "code": 400,
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

Common HTTP status codes:
- `400` - Bad Request (validation errors, invalid input)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (e.g., email already exists)
- `500` - Internal Server Error (server-side issues)

Validation errors (using Zod) will return detailed information about which fields failed validation and why.

## Installation and Running

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the project
   ```bash
   git clone <repository-url>
   cd hospital-appointment-api
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/hospital_appointment"
   PORT=3006
   JWT_SECRET="your-secret-key"
   JWT_EXPIRES_IN="90d"
   CORS_ORIGIN="http://localhost:3000"
   ```

4. Set up the database
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

### Environment Variables

The application uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | - |
| `PORT` | API server port | 3006 |
| `JWT_SECRET` | Secret key for JWT signing | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 90d |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3000 |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | - |
| `DB_NAME` | Database name | hospital_appointment |

### Project Organization

The project follows a modular structure for better maintainability:

```
hospital-appointment-api/
├── node_modules/           # Dependencies
├── dist/                   # Compiled TypeScript output
├── prisma/                 # Prisma schema and migrations
│   ├── schema.prisma       # Database schema definition
│   └── migrations/         # Database migrations
├── src/                    # Source code
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Middleware functions
│   ├── routes/             # API route definitions
│   ├── schemas/            # Zod validation schemas
│   ├── services/           # Business logic
│   ├── types/              # TypeScript type definitions
│   └── index.ts            # Application entry point
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Database Schema

The application uses PostgreSQL with Prisma ORM. Here's an overview of the database models:

### User
- Central user account for authentication
- Roles: admin, doctor, secretary
- Links to Doctor model for medical staff

### Patient
- Personal and contact information
- Medical history through related models
- Linked to appointments and medical records

### Doctor
- Professional details (specialization, license, experience)
- Belongs to a department
- Can be a department head
- Linked to a User for authentication

### Department
- Hospital organizational unit
- Has multiple doctors
- Can have a head doctor

### Appointment
- Links doctor and patient
- Scheduling information
- Status tracking (scheduled, completed, cancelled)

### MedicalRecord
- Clinical data for patients
- Created by doctors
- Diagnosis, treatment, and prescription information

### PatientHistory
- Audit trail for patient-related actions
- Tracks all changes to patient records
- Categorized by record type and action

**Entity Relationship Diagram (simplified):**

```
User 1──1 Doctor N──1 Department
              │
              │
Patient N─────┴────1 Appointment
   │
   │
   └───1 MedicalRecord N──1 Doctor
   │
   │
   └───1 PatientHistory
```

## Extending the API

### Adding New Features

To add new features to the API, follow these steps:

1. **Create Database Model**: Add the new model to `prisma/schema.prisma` and run migration
   ```bash
   npx prisma migrate dev --name add_new_model
   ```

2. **Define Schemas**: Create validation schemas in `src/schemas/base.schema.ts` and register them in `schema.registry.ts`

3. **Implement Service Layer**: Create a new service file in `src/services/` with CRUD operations

4. **Create Controller**: Implement request handling logic in a new controller file

5. **Define Routes**: Create a new route file in `src/routes/` and register it in `src/index.ts`

### Example: Adding a Prescription Model

1. **Add to Prisma Schema**:
   ```prisma
   model Prescription {
     id              Int       @id @default(autoincrement())
     medicalRecordId Int
     medicalRecord   MedicalRecord @relation(fields: [medicalRecordId], references: [id])
     medication      String
     dosage          String
     frequency       String
     duration        Int
     notes           String?
     createdAt       DateTime  @default(now())
     updatedAt       DateTime  @updatedAt

     @@map("prescriptions")
   }
   ```

2. **Update MedicalRecord Model**:
   ```prisma
   model MedicalRecord {
     // ... existing fields ...
     prescriptions   Prescription[]
   }
   ```

3. **Create Schema**:
   ```typescript
   // In base.schema.ts
   export const basePrescriptionSchema = z.object({
     id: z.number(),
     medicalRecordId: z.number(),
     medication: z.string(),
     dosage: z.string(),
     frequency: z.string(),
     duration: z.number(),
     notes: z.string().optional().nullable(),
     createdAt: z.date(),
     updatedAt: z.date(),
   });

   // In schema.registry.ts
   export const prescriptionSchema = basePrescriptionSchema;
   export const prescriptionCreateSchema = z.object({
     medicalRecordId: z.number(),
     medication: z.string(),
     dosage: z.string(),
     frequency: z.string(),
     duration: z.number(),
     notes: z.string().optional(),
   });
   export const prescriptionUpdateSchema = prescriptionCreateSchema.partial();
   ```

4. **Create Service File**:
   ```typescript
   // src/services/prescription.service.ts
   import { PrismaClient } from '@prisma/client';
   import { PrescriptionCreate, PrescriptionUpdate } from '../schemas/schema.registry';
   
   const prisma = new PrismaClient();
   
   export const getAllPrescriptionsService = async () => {
     return await prisma.prescription.findMany({
       include: {
         medicalRecord: true,
       },
     });
   };
   
   export const getPrescriptionByIdService = async (id: number) => {
     return await prisma.prescription.findUnique({
       where: { id },
       include: {
         medicalRecord: true,
       },
     });
   };
   
   // ... add create, update, delete services ...
   ```

5. **Create Controller and Routes Files**

### Best Practices for API Development

1. **Follow RESTful Conventions**:
   - Use proper HTTP methods (GET, POST, PUT, DELETE)
   - Use plural nouns for resources (e.g., `/prescriptions`)
   - Use nested routes for relationships (e.g., `/medical-records/:id/prescriptions`)

2. **Maintain Consistent Error Handling**:
   - Use the central error middleware
   - Return appropriate status codes
   - Provide clear error messages

3. **Security Considerations**:
   - Add proper role-based access control
   - Validate all inputs
   - Use rate limiting for sensitive endpoints

4. **Testing**:
   - Write unit and integration tests for new features
   - Test edge cases and error scenarios

## Frontend Integration

### Example Client Code

Here's a simple example of how to integrate with the API using a frontend framework (React):

```javascript
// api.js - API client using Axios
import axios from 'axios';

const API_URL = 'http://localhost:3006/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication service
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data.data.user;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data.data.user;
  },
};

// Appointment service
export const appointmentService = {
  getAll: async () => {
    const response = await api.get('/appointments');
    return response.data.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data.data;
  },
  
  create: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data.data;
  },
  
  update: async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data.data;
  },
  
  delete: async (id) => {
    await api.delete(`/appointments/${id}`);
  },
  
  getByPatient: async (patientId) => {
    const response = await api.get(`/appointments/patient/${patientId}`);
    return response.data.data;
  },
  
  getByDoctor: async (doctorId) => {
    const response = await api.get(`/appointments/doctor/${doctorId}`);
    return response.data.data;
  },
};

// Example of other services
export const patientService = {
  // Similar implementation to appointment service
};

export const doctorService = {
  // Similar implementation to appointment service
};

export default api;
```

### React Component Example

```jsx
// AppointmentList.jsx
import React, { useState, useEffect } from 'react';
import { appointmentService } from './api';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await appointmentService.getAll();
        setAppointments(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch appointments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
            <p><strong>Doctor:</strong> Dr. {appointment.doctor.user.lastName}</p>
            <p><strong>Patient:</strong> {appointment.patient.firstName} {appointment.patient.lastName}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
```

## License

[MIT License](LICENSE)
