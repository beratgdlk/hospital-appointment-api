import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { PrismaClient } from '@prisma/client';
import { PrismaError, PrismaErrorTypes } from '../types/prisma.error';

/**
 * Custom Error Class
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details: any;

  constructor(
    message: string, 
    statusCode: number, 
    isOperational: boolean = true, 
    details: any = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Map Prisma error codes to HTTP status codes
 */
const mapPrismaErrorToStatusCode = (errorCode: string): number => {
  switch (errorCode) {
    case PrismaErrorTypes.RECORD_NOT_FOUND:
      return 404;
    case PrismaErrorTypes.UNIQUE_CONSTRAINT:
      return 409;
    case PrismaErrorTypes.FOREIGN_KEY_CONSTRAINT:
      return 409;
    case PrismaErrorTypes.REQUIRED_FIELD:
      return 400;
    default:
      return 500;
  }
};

/**
 * Map Prisma error codes to user-friendly messages
 */
const mapPrismaErrorToMessage = (error: PrismaError): string => {
  switch (error.code) {
    case PrismaErrorTypes.RECORD_NOT_FOUND:
      return 'Record not found';
    case PrismaErrorTypes.UNIQUE_CONSTRAINT:
      return 'This record already exists';
    case PrismaErrorTypes.FOREIGN_KEY_CONSTRAINT:
      return 'Related record not found';
    case PrismaErrorTypes.REQUIRED_FIELD:
      return 'Required fields are missing';
    default:
      return 'Database error occurred';
  }
};

/**
 * Show detailed errors in development environment
 * @param err Error object
 * @param res Express response object
 */
const sendErrorDev = (err: AppError, res: Response) => {
  const statusCode = err.statusCode || 500;
  
  // Show all error details in development
  res.status(statusCode).json({
    status: 'error',
    error: err,
    message: err.message,
    stack: err.stack,
    details: err.details
  });
};

/**
 * Show user-friendly errors in production environment
 * @param err Error object
 * @param res Express response object
 */
const sendErrorProd = (err: AppError, res: Response) => {
  const statusCode = err.statusCode || 500;
  
  if (err.isOperational) {
    // For expected errors - show to user
    res.status(statusCode).json({
      status: 'error',
      message: err.message,
      details: err.details
    });
  } else {
    // For unexpected errors - show generic message
    console.error('ERROR 💥', err);
    
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

/**
 * Main error handler middleware
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  
  // Convert to appropriate error format
  if (error instanceof ZodError) {
    // Zod validation error
    const message = 'Invalid data format';
    error = new AppError(message, 400, true, error.errors);
  } else if (error.code && typeof error.code === 'string' && error.clientVersion) {
    // Prisma known errors - using duck typing
    const message = mapPrismaErrorToMessage(error);
    const statusCode = mapPrismaErrorToStatusCode(error.code);
    error = new AppError(message, statusCode, true, {
      code: error.code,
      meta: error.meta
    });
  } else if (error.name === 'PrismaClientValidationError') {
    // Prisma validation error
    error = new AppError('Invalid data for database operation', 400, true);
  } else if (!(error instanceof AppError)) {
    // Convert all other errors to AppError format
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong';
    error = new AppError(message, statusCode, false);
  }
  
  // Send appropriate response based on environment
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
}; 