import { prisma } from '../config/database';
import { Doctor } from '../types/types';
import { doctorCreateSchema, doctorSchema, doctorUpdateSchema } from '../schemas/schema.registry';

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
    },
  });

  return doctors.map(doctor => doctorSchema.parse(doctor) as Doctor);
};

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
    },
  });

  return doctor ? (doctorSchema.parse(doctor) as Doctor) : null;
};

export const createDoctorService = async (data: unknown): Promise<Doctor> => {
  const validatedData = doctorCreateSchema.parse(data);
  const createData: any = {
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
  };

  if (validatedData.managedDepartmentId) {
    createData.managedDepartment = {
      connect: { id: validatedData.managedDepartmentId },
    };
  }

  const doctor = await prisma.doctor.create({
    data: createData,
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
    },
  });

  return doctorSchema.parse(doctor) as Doctor;
};

export const updateDoctorService = async (
  id: number, 
  data: unknown
): Promise<Doctor> => {
  const validatedData = doctorUpdateSchema.parse(data);
  const updateData: any = { ...validatedData };

  if (validatedData.userId) {
    updateData.user = {
      connect: { id: validatedData.userId },
    };
    delete updateData.userId;
  }

  if (validatedData.departmentId) {
    updateData.department = {
      connect: { id: validatedData.departmentId },
    };
    delete updateData.departmentId;
  }

  if (validatedData.managedDepartmentId) {
    updateData.managedDepartment = {
      connect: { id: validatedData.managedDepartmentId },
    };
    delete updateData.managedDepartmentId;
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
    },
  });

  return doctorSchema.parse(doctor) as Doctor;
};

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
    },
  });

  return doctorSchema.parse(doctor) as Doctor;
}; 