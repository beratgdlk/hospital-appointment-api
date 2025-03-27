import { PrismaClient } from '@prisma/client';

// Create a single global PrismaClient instance
// Set different log levels based on NODE_ENV
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
});

// Capture events at connection start and termination
prisma.$on('beforeExit', async () => {
  console.log('Closing Prisma Client connection');
});

// Global error handler
prisma.$use(async (params: any, next: (params: any) => Promise<any>) => {
  try {
    return await next(params);
  } catch (error) {
    console.error(`Prisma Error: ${params.model}.${params.action}`, error);
    throw error;
  }
}); 