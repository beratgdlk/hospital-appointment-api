import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { PrismaError } from '../types/prisma.error';

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

export const handlePrismaError = (error: PrismaError) => {
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

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError | PrismaError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Hata:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(err.validationErrors && { errors: err.validationErrors }),
    });
  }

  if ('code' in err) {
    const prismaError = handlePrismaError(err as PrismaError);
    return res.status(prismaError.statusCode).json({
      status: prismaError.status,
      message: prismaError.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Beklenmeyen bir hata oluştu.',
  });
}; 