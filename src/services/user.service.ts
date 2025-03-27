import { prisma } from '../config/database';
import { UserCreate, UserUpdate } from '../schemas/schema.registry';
import bcrypt from 'bcrypt';

export class UserService {
  /**
   * Gets all users
   * @returns All users
   */
  static async getAllUsers() {
    return await prisma.user.findMany({
      include: {
        doctor: true,
      },
    });
  }

  /**
   * Gets a user by ID
   * @param id User ID
   * @returns User
   */
  static async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        doctor: true,
      },
    });
  }

  /**
   * Gets a user by email
   * @param email User email
   * @returns User
   */
  static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        doctor: true,
      },
    });
  }

  /**
   * Creates a new user
   * @param data User data
   * @returns Created user
   */
  static async createUser(userData: UserCreate) {
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
  }

  /**
   * Updates a user
   * @param id User ID
   * @param data Update data
   * @returns Updated user
   */
  static async updateUser(id: number, userData: UserUpdate) {
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
  }

  /**
   * Deletes a user
   * @param id User ID
   * @returns Deleted user
   */
  static async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id },
      include: {
        doctor: true,
      },
    });
  }
}

// Eski fonksiyonlar için uyumluluk katmanı
export const getAllUsersService = () => UserService.getAllUsers();
export const getUserByIdService = (id: number) => UserService.getUserById(id);
export const getUserByEmailService = (email: string) => UserService.getUserByEmail(email);
export const createUserService = (userData: UserCreate) => UserService.createUser(userData);
export const updateUserService = (id: number, userData: UserUpdate) => UserService.updateUser(id, userData);
export const deleteUserService = (id: number) => UserService.deleteUser(id); 