import { prisma } from '../config/database';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export const getAllUsersService = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      doctor: {
        include: {
          department: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUserByIdService = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      doctor: {
        include: {
          department: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUserByEmailService = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUserService = async (data: z.infer<typeof import('../validations/user.validation').userSchema>) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateUserService = async (id: number, data: z.infer<typeof import('../validations/user.validation').userUpdateSchema>) => {
  const updateData: any = {
    ...data,
  };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUserService = async (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
}; 