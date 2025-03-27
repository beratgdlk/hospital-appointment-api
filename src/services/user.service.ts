import { prisma } from '../config/database';
import { User } from '../types/types';
import { userCreateSchema, userSchema, userUpdateSchema } from '../schemas/schema.registry';
import bcrypt from 'bcrypt';

export const getAllUsersService = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({
    include: {
      doctor: {
        include: {
          department: true,
          managedDepartment: true
        }
      }
    }
  });

  return users.map(user => userSchema.parse(user) as User);
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      doctor: {
        include: {
          department: true,
          managedDepartment: true
        }
      }
    }
  });

  return user ? (userSchema.parse(user) as User) : null;
};

export const getUserByEmailService = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      doctor: {
        include: {
          department: true,
          managedDepartment: true
        }
      }
    }
  });

  return user ? (userSchema.parse(user) as User) : null;
};

export const createUserService = async (data: unknown): Promise<User> => {
  const validatedData = userCreateSchema.parse(data);
  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  const user = await prisma.user.create({
    data: {
      ...validatedData,
      password: hashedPassword
    },
    include: {
      doctor: {
        include: {
          department: true,
          managedDepartment: true
        }
      }
    }
  });

  return userSchema.parse(user) as User;
};

export const updateUserService = async (
  id: number, 
  data: unknown
): Promise<User> => {
  const validatedData = userUpdateSchema.parse(data);
  let updateData: any = { ...validatedData };

  if (validatedData.password) {
    updateData.password = await bcrypt.hash(validatedData.password, 10);
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    include: {
      doctor: {
        include: {
          department: true,
          managedDepartment: true
        }
      }
    }
  });

  return userSchema.parse(user) as User;
};

export const deleteUserService = async (id: number): Promise<User> => {
  const user = await prisma.user.delete({
    where: { id },
    include: {
      doctor: {
        include: {
          department: true,
          managedDepartment: true
        }
      }
    }
  });

  return userSchema.parse(user) as User;
}; 