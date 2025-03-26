export interface PrismaError extends Error {
  code?: string;
  meta?: {
    target?: string[];
  };
} 