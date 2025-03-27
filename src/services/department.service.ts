import { prisma } from '../config/database';
import { Department } from '../types/types';
import { departmentCreateSchema, departmentSchema, departmentUpdateSchema } from '../schemas/schema.registry';

export const getAllDepartmentsService = async (): Promise<Department[]> => {
  const departments = await prisma.department.findMany({
    include: {
      doctors: {
        include: {
          user: true,
        },
      },
      headDoctor: {
        include: {
          user: true,
        },
      },
    },
  });

  return departments.map(department => departmentSchema.parse(department) as Department);
};

export const getDepartmentByIdService = async (id: number): Promise<Department | null> => {
  const department = await prisma.department.findUnique({
    where: { id },
    include: {
      doctors: {
        include: {
          user: true,
        },
      },
      headDoctor: {
        include: {
          user: true,
        },
      },
    },
  });

  return department ? (departmentSchema.parse(department) as Department) : null;
};

export const createDepartmentService = async (data: unknown): Promise<Department> => {
  const validatedData = departmentCreateSchema.parse(data);
  
  const department = await prisma.department.create({
    data: validatedData,
    include: {
      doctors: {
        include: {
          user: true,
        },
      },
      headDoctor: {
        include: {
          user: true,
        },
      },
    },
  });

  return departmentSchema.parse(department) as Department;
};

export const updateDepartmentService = async (
  id: number, 
  data: unknown
): Promise<Department> => {
  const validatedData = departmentUpdateSchema.parse(data);
  
  const department = await prisma.department.update({
    where: { id },
    data: validatedData,
    include: {
      doctors: {
        include: {
          user: true,
        },
      },
      headDoctor: {
        include: {
          user: true,
        },
      },
    },
  });

  return departmentSchema.parse(department) as Department;
};

export const deleteDepartmentService = async (id: number): Promise<Department> => {
  const department = await prisma.department.delete({
    where: { id },
    include: {
      doctors: {
        include: {
          user: true,
        },
      },
      headDoctor: {
        include: {
          user: true,
        },
      },
    },
  });

  return departmentSchema.parse(department) as Department;
};

export const assignHeadDoctorService = async (
  departmentId: number, 
  doctorId: number
): Promise<Department> => {
  // Verify that the doctor belongs to the department
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { departmentId: true }
  });

  if (!doctor) {
    throw new Error(`Doktor ID ${doctorId} bulunamadı.`);
  }

  // If the doctor doesn't belong to this department, first update their department
  if (doctor.departmentId !== departmentId) {
    await prisma.doctor.update({
      where: { id: doctorId },
      data: { departmentId },
    });
  }

  // Update the doctor as the head of department
  const department = await prisma.department.update({
    where: { id: departmentId },
    data: {
      headDoctor: {
        connect: { id: doctorId },
      },
    },
    include: {
      doctors: {
        include: {
          user: true,
        },
      },
      headDoctor: {
        include: {
          user: true,
        },
      },
    },
  });

  return departmentSchema.parse(department) as Department;
};

export const removeHeadDoctorService = async (departmentId: number): Promise<Department> => {
  const department = await prisma.department.update({
    where: { id: departmentId },
    data: {
      headDoctor: {
        disconnect: true,
      },
    },
    include: {
      doctors: {
        include: {
          user: true,
        },
      },
      headDoctor: {
        include: {
          user: true,
        },
      },
    },
  });

  return departmentSchema.parse(department) as Department;
}; 