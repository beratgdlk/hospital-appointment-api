import { Request, Response, NextFunction } from 'express';
import { PrismaError } from '../types/prisma.error';
import { ZodError } from 'zod';

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  validationErrors?: Array<{ field: string; message: string }>;

  constructor(message: string, statusCode: number, validationErrors?: Array<{ field: string; message: string }>) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.validationErrors = validationErrors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handlePrismaError = (error: PrismaError): AppError => {
  switch (error.code) {
    case 'P2002':
      return new AppError('Bu benzersiz alan zaten mevcut.', 400);
    case 'P2025':
      return new AppError('Kayıt bulunamadı.', 404);
    case 'P2003':
      return new AppError('Geçersiz ilişki referansı.', 400);
    default:
      return new AppError('Veritabanı işlemi başarısız oldu.', 500);
  }
};

export const handleZodError = (error: ZodError): AppError => {
  const validationErrors = error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message,
  }));

  return new AppError('Doğrulama hatası', 400, validationErrors);
};

export const errorHandler = (
  err: Error | AppError | PrismaError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Hata:', err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(err.validationErrors && { errors: err.validationErrors }),
    });
    return;
  }

  if (err instanceof ZodError) {
    const zodError = handleZodError(err);
    res.status(zodError.statusCode).json({
      status: zodError.status,
      message: zodError.message,
      errors: zodError.validationErrors,
    });
    return;
  }

  if ('code' in err) {
    const prismaError = handlePrismaError(err as PrismaError);
    res.status(prismaError.statusCode).json({
      status: prismaError.status,
      message: prismaError.message,
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Beklenmeyen bir hata oluştu.',
  });
}; 