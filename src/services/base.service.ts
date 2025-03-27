import { prisma } from '../config/database';
import { z } from 'zod';

/**
 * Generic base service class
 * Contains all basic CRUD operations and can be inherited by other services
 */
export class BaseService<T, CreateDto, UpdateDto> {
  protected model: any;
  protected schema: z.ZodType<T>;
  protected createSchema: z.ZodType<CreateDto>;
  protected updateSchema: z.ZodType<UpdateDto>;
  protected includedRelations: object = {};

  constructor(
    modelName: string,
    schema: z.ZodType<T>,
    createSchema: z.ZodType<CreateDto>,
    updateSchema: z.ZodType<UpdateDto>,
    includedRelations: object = {}
  ) {
    this.model = prisma[modelName];
    this.schema = schema;
    this.createSchema = createSchema;
    this.updateSchema = updateSchema;
    this.includedRelations = includedRelations;
  }

  /**
   * Get all records
   */
  async getAll(): Promise<T[]> {
    const records = await this.model.findMany({
      include: this.includedRelations
    });

    return records.map((record: any) => this.schema.parse(record) as T);
  }

  /**
   * Get record by ID
   */
  async getById(id: number): Promise<T | null> {
    const record = await this.model.findUnique({
      where: { id },
      include: this.includedRelations
    });

    return record ? (this.schema.parse(record) as T) : null;
  }

  /**
   * Create a new record
   */
  async create(data: unknown): Promise<T> {
    const validatedData = this.createSchema.parse(data);
    const record = await this.model.create({
      data: this.prepareCreateData(validatedData),
      include: this.includedRelations
    });

    return this.schema.parse(record) as T;
  }

  /**
   * Update an existing record
   */
  async update(id: number, data: unknown): Promise<T> {
    const validatedData = this.updateSchema.parse(data);
    const record = await this.model.update({
      where: { id },
      data: this.prepareUpdateData(validatedData),
      include: this.includedRelations
    });

    return this.schema.parse(record) as T;
  }

  /**
   * Delete a record
   */
  async delete(id: number): Promise<T> {
    const record = await this.model.delete({
      where: { id },
      include: this.includedRelations
    });

    return this.schema.parse(record) as T;
  }

  /**
   * Prepare data for creation - can be overridden by subclasses
   */
  protected prepareCreateData(data: any): any {
    return data;
  }

  /**
   * Prepare data for update - can be overridden by subclasses
   */
  protected prepareUpdateData(data: any): any {
    return data;
  }
} 