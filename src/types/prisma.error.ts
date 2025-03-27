/**
 * PrismaError interface to type Prisma errors
 */
export interface PrismaError extends Error {
  code: string;
  meta?: {
    target?: string[];
    [key: string]: any;
  };
  clientVersion?: string;
}

/**
 * Enum for Prisma error codes
 */
export enum PrismaErrorTypes {
  RECORD_NOT_FOUND = 'P2025',
  UNIQUE_CONSTRAINT = 'P2002',
  FOREIGN_KEY_CONSTRAINT = 'P2003',
  REQUIRED_FIELD = 'P2012',
  VALUE_TOO_LONG = 'P2000',
  INVALID_VALUE = 'P2005',
  DATA_VALIDATION = 'P2007'
} 