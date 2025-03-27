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