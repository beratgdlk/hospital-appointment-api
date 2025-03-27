import { prisma } from '../config/database';
import { Patient } from '../types/types';
import { patientCreateSchema, patientSchema, patientUpdateSchema } from '../schemas/schema.registry';

export const getAllPatientsService = async (): Promise<Patient[]> => {
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
};

export const getPatientByIdService = async (id: number): Promise<Patient | null> => {
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
};

export const getPatientByEmailService = async (email: string): Promise<Patient | null> => {
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
};

export const createPatientService = async (data: unknown): Promise<Patient> => {
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
};

export const updatePatientService = async (
  id: number, 
  data: unknown
): Promise<Patient> => {
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
};

export const deletePatientService = async (id: number): Promise<Patient> => {
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
};