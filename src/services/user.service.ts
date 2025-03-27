import { PrismaClient } from '@prisma/client';
import { UserCreate, UserUpdate } from '../schemas/schema.registry';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Tüm kullanıcıları getirir
 * @returns Tüm kullanıcılar
 */
export const getAllUsersService = async () => {
  return await prisma.user.findMany({
    include: {
      doctor: true,
    },
  });
};

/**
 * ID'ye göre kullanıcı getirir
 * @param id Kullanıcı ID'si
 * @returns Kullanıcı
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
 * E-posta adresine göre kullanıcı getirir
 * @param email E-posta adresi
 * @returns Kullanıcı
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
 * Yeni kullanıcı oluşturur
 * @param data Kullanıcı verileri
 * @returns Oluşturulan kullanıcı
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
 * Kullanıcı günceller
 * @param id Kullanıcı ID'si
 * @param data Güncelleme verileri
 * @returns Güncellenen kullanıcı
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
 * Kullanıcı siler
 * @param id Kullanıcı ID'si
 * @returns Silinen kullanıcı
 */
export const deleteUserService = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
    include: {
      doctor: true,
    },
  });
}; 