import { prisma } from '../config/database';
import { Patient } from '../types/types';
import { patientCreateSchema, patientSchema, patientUpdateSchema } from '../schemas/schema.registry';

export class PatientService {
  static async getAllPatients(): Promise<Patient[]> {
    const patients = await prisma.patient.findMany({
      include: {
        medicalRecords: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
        appointments: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return patients.map((patient: any) => patientSchema.parse(patient) as Patient);
  }

  static async getPatientById(id: number): Promise<Patient | null> {
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        medicalRecords: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
        appointments: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return patient ? (patientSchema.parse(patient) as Patient) : null;
  }

  static async getPatientByEmail(email: string): Promise<Patient | null> {
    const patient = await prisma.patient.findUnique({
      where: { email },
      include: {
        medicalRecords: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
        appointments: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return patient ? (patientSchema.parse(patient) as Patient) : null;
  }

  static async createPatient(data: unknown): Promise<Patient> {
    const validatedData = patientCreateSchema.parse(data);
    
    // Convert string date to Date object if needed
    const dateOfBirth = typeof validatedData.dateOfBirth === 'string' 
      ? new Date(validatedData.dateOfBirth) 
      : validatedData.dateOfBirth;

    const patient = await prisma.patient.create({
      data: {
        ...validatedData,
        dateOfBirth,
      },
      include: {
        medicalRecords: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
        appointments: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return patientSchema.parse(patient) as Patient;
  }

  static async updatePatient(id: number, data: unknown): Promise<Patient> {
    const validatedData = patientUpdateSchema.parse(data);
    
    // Convert string date to Date object if needed
    let updateData: any = { ...validatedData };
    if (validatedData.dateOfBirth) {
      updateData.dateOfBirth = typeof validatedData.dateOfBirth === 'string' 
        ? new Date(validatedData.dateOfBirth) 
        : validatedData.dateOfBirth;
    }

    const patient = await prisma.patient.update({
      where: { id },
      data: updateData,
      include: {
        medicalRecords: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
        appointments: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return patientSchema.parse(patient) as Patient;
  }

  static async deletePatient(id: number): Promise<Patient> {
    const patient = await prisma.patient.delete({
      where: { id },
      include: {
        medicalRecords: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
        appointments: {
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return patientSchema.parse(patient) as Patient;
  }
}

// Eski fonksiyonlar için uyumluluk katmanı
export const getAllPatientsService = () => PatientService.getAllPatients();
export const getPatientByIdService = (id: number) => PatientService.getPatientById(id);
export const getPatientByEmailService = (email: string) => PatientService.getPatientByEmail(email);
export const createPatientService = (data: unknown) => PatientService.createPatient(data);
export const updatePatientService = (id: number, data: unknown) => PatientService.updatePatient(id, data);
export const deletePatientService = (id: number) => PatientService.deletePatient(id);