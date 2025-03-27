import { prisma } from '../config/database';
import { Department } from '../types/types';
import { departmentCreateSchema, departmentSchema, departmentUpdateSchema } from '../schemas/schema.registry';

export class DepartmentService {
  static async getAllDepartments(): Promise<Department[]> {
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
  }

  static async getDepartmentById(id: number): Promise<Department | null> {
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
  }

  static async createDepartment(data: unknown): Promise<Department> {
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
  }

  static async updateDepartment(id: number, data: unknown): Promise<Department> {
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
  }

  static async deleteDepartment(id: number): Promise<Department> {
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
  }

  static async assignHeadDoctor(departmentId: number, doctorId: number): Promise<Department> {
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
  }

  static async removeHeadDoctor(departmentId: number): Promise<Department> {
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
  }
}

// Eski fonksiyonlar için uyumluluk katmanı
export const getAllDepartmentsService = () => DepartmentService.getAllDepartments();
export const getDepartmentByIdService = (id: number) => DepartmentService.getDepartmentById(id);
export const createDepartmentService = (data: unknown) => DepartmentService.createDepartment(data);
export const updateDepartmentService = (id: number, data: unknown) => DepartmentService.updateDepartment(id, data);
export const deleteDepartmentService = (id: number) => DepartmentService.deleteDepartment(id);
export const assignHeadDoctorService = (departmentId: number, doctorId: number) => DepartmentService.assignHeadDoctor(departmentId, doctorId);
export const removeHeadDoctorService = (departmentId: number) => DepartmentService.removeHeadDoctor(departmentId);