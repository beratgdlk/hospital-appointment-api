import { prisma } from '../config/database';
import { z } from 'zod';

export const getAllDepartmentsService = async () => {
  return prisma.department.findMany({
    include: {
      doctors: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      },
      headDoctor: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      },
    },
  });
};

export const getDepartmentByIdService = async (id: number) => {
  return prisma.department.findUnique({
    where: { id },
    include: {
      doctors: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      },
      headDoctor: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      },
    },
  });
};

export const createDepartmentService = async (data: z.infer<typeof import('../validations/department.validation').departmentSchema>) => {
  const createData: any = {
    name: data.name,
    location: data.location,
  };

  if (data.description) {
    createData.description = data.description;
  }

  if (data.headDoctorId) {
    createData.headDoctor = {
      connect: { id: data.headDoctorId },
    };
  }

  return prisma.department.create({
    data: createData,
    include: {
      doctors: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      },
      headDoctor: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      },
    },
  });
};

export const updateDepartmentService = async (id: number, data: z.infer<typeof import('../validations/department.validation').departmentUpdateSchema>) => {
  const updateData: any = {
    ...data,
  };

  if (data.headDoctorId) {
    updateData.headDoctor = {
      connect: { id: data.headDoctorId },
    };
    delete updateData.headDoctorId;
  }

  return prisma.department.update({
    where: { id },
    data: updateData,
    include: {
      doctors: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      },
      headDoctor: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
      },
    },
  });
};

export const deleteDepartmentService = async (id: number) => {
  return prisma.department.delete({
    where: { id },
  });
}; 