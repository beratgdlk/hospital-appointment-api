import { prisma } from '../config/database';
import { UserCreate, UserUpdate } from '../schemas/schema.registry';
import bcrypt from 'bcrypt';

/**
 * Gets all users
 * @returns All users
 */
export const getAllUsersService = async () => {
  return await prisma.user.findMany({
    include: {
      doctor: true,
    },
  });
};

/**
 * Gets a user by ID
 * @param id User ID
 * @returns User
 */
export const getUserByIdService = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      doctor: true,
    },
  });
};

/**
 * Gets a user by email
 * @param email User email
 * @returns User
 */
export const getUserByEmailService = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      doctor: true,
    },
  });
};

/**
 * Creates a new user
 * @param data User data
 * @returns Created user
 */
export const createUserService = async (userData: UserCreate) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  return await prisma.user.create({
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      role: userData.role as any, // Convert to Enum type
    },
    include: {
      doctor: true,
    },
  });
};

/**
 * Updates a user
 * @param id User ID
 * @param data Update data
 * @returns Updated user
 */
export const updateUserService = async (id: number, userData: UserUpdate) => {
  const updateData: any = { ...userData };
  
  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(userData.password, salt);
  }
  
  if (userData.role) {
    updateData.role = userData.role as any; // Convert to Enum type
  }
  
  return await prisma.user.update({
    where: { id },
    data: updateData,
    include: {
      doctor: true,
    },
  });
};

/**
 * Deletes a user
 * @param id User ID
 * @returns Deleted user
 */
export const deleteUserService = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
    include: {
      doctor: true,
    },
  });
}; 