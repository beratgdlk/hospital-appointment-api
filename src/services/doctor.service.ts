import { prisma } from '../config/database';
import { Doctor } from '../types/types';
import { doctorSchema, doctorCreateSchema, doctorUpdateSchema, DoctorCreate, DoctorUpdate } from '../schemas/schema.registry';

/**
 * Gets all doctors
 */
export const getAllDoctorsService = async (): Promise<Doctor[]> => {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      department: true,
      appointments: {
        include: {
          patient: true,
        },
      },
      medicalRecords: {
        include: {
          patient: true,
        },
      },
      managedDepartment: true,
    }
  });

  return doctors.map((doctor: any) => doctorSchema.parse(doctor) as Doctor);
};

/**
 * Gets a doctor by ID
 */
export const getDoctorByIdService = async (id: number): Promise<Doctor | null> => {
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      department: true,
      appointments: {
        include: {
          patient: true,
        },
      },
      medicalRecords: {
        include: {
          patient: true,
        },
      },
      managedDepartment: true,
    }
  });

  return doctor ? (doctorSchema.parse(doctor) as Doctor) : null;
};

/**
 * Creates a new doctor
 */
export const createDoctorService = async (data: unknown): Promise<Doctor> => {
  const validatedData = doctorCreateSchema.parse(data) as DoctorCreate;
  
  const doctor = await prisma.doctor.create({
    data: {
      user: {
        connect: { id: validatedData.userId },
      },
      department: {
        connect: { id: validatedData.departmentId },
      },
      specialization: validatedData.specialization,
      licenseNumber: validatedData.licenseNumber,
      experience: validatedData.experience,
      education: validatedData.education,
      ...(validatedData.managedDepartmentId && {
        managedDepartment: {
          connect: { id: validatedData.managedDepartmentId }
        }
      }),
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      department: true,
      appointments: {
        include: {
          patient: true,
        },
      },
      medicalRecords: {
        include: {
          patient: true,
        },
      },
      managedDepartment: true,
    }
  });

  return doctorSchema.parse(doctor) as Doctor;
};

/**
 * Updates a doctor
 */
export const updateDoctorService = async (id: number, data: unknown): Promise<Doctor> => {
  const validatedData = doctorUpdateSchema.parse(data) as DoctorUpdate;
  
  const updateData: any = {};
  
  if (validatedData.userId) {
    updateData.user = {
      connect: { id: validatedData.userId },
    };
  }
  
  if (validatedData.departmentId) {
    updateData.department = {
      connect: { id: validatedData.departmentId },
    };
  }
  
  if (validatedData.managedDepartmentId) {
    updateData.managedDepartment = {
      connect: { id: validatedData.managedDepartmentId },
    };
  }
  
  if (validatedData.specialization) {
    updateData.specialization = validatedData.specialization;
  }
  
  if (validatedData.licenseNumber) {
    updateData.licenseNumber = validatedData.licenseNumber;
  }
  
  if (validatedData.experience !== undefined) {
    updateData.experience = validatedData.experience;
  }
  
  if (validatedData.education) {
    updateData.education = validatedData.education;
  }
  
  const doctor = await prisma.doctor.update({
    where: { id },
    data: updateData,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      department: true,
      appointments: {
        include: {
          patient: true,
        },
      },
      medicalRecords: {
        include: {
          patient: true,
        },
      },
      managedDepartment: true,
    }
  });

  return doctorSchema.parse(doctor) as Doctor;
};

/**
 * Deletes a doctor
 */
export const deleteDoctorService = async (id: number): Promise<Doctor> => {
  const doctor = await prisma.doctor.delete({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      department: true,
      appointments: {
        include: {
          patient: true,
        },
      },
      medicalRecords: {
        include: {
          patient: true,
        },
      },
      managedDepartment: true,
    }
  });

  return doctorSchema.parse(doctor) as Doctor;
};

/**
 * Gets doctors by department ID
 */
export const getDoctorsByDepartmentService = async (departmentId: number): Promise<Doctor[]> => {
  const doctors = await prisma.doctor.findMany({
    where: { departmentId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      department: true,
      appointments: {
        include: {
          patient: true,
        },
      },
      medicalRecords: {
        include: {
          patient: true,
        },
      },
      managedDepartment: true,
    }
  });

  return doctors.map((doctor: any) => doctorSchema.parse(doctor) as Doctor);
};

/**
 * Gets a doctor by user ID
 */
export const getDoctorByUserIdService = async (userId: number): Promise<Doctor | null> => {
  const doctor = await prisma.doctor.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      department: true,
      appointments: {
        include: {
          patient: true,
        },
      },
      medicalRecords: {
        include: {
          patient: true,
        },
      },
      managedDepartment: true,
    }
  });

  return doctor ? (doctorSchema.parse(doctor) as Doctor) : null;
}; 