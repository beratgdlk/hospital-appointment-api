"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.handleZodError = exports.handlePrismaError = exports.AppError = void 0;
const zod_1 = require("zod");
class AppError extends Error {
    constructor(message, statusCode, validationErrors) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.validationErrors = validationErrors;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const handlePrismaError = (error) => {
    switch (error.code) {
        case 'P2002':
            return new AppError('This unique field already exists.', 400);
        case 'P2025':
            return new AppError('Record not found.', 404);
        case 'P2003':
            return new AppError('Invalid relationship reference.', 400);
        default:
            return new AppError('Database operation failed.', 500);
    }
};
exports.handlePrismaError = handlePrismaError;
const handleZodError = (error) => {
    const validationErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
    }));
    return new AppError('Validation error', 400, validationErrors);
};
exports.handleZodError = handleZodError;
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    if (err instanceof AppError) {
        res.status(err.statusCode).json(Object.assign({ status: err.status, message: err.message }, (err.validationErrors && { errors: err.validationErrors })));
        return;
    }
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, exports.handleZodError)(err);
        res.status(zodError.statusCode).json({
            status: zodError.status,
            message: zodError.message,
            errors: zodError.validationErrors,
        });
        return;
    }
    if ('code' in err) {
        const prismaError = (0, exports.handlePrismaError)(err);
        res.status(prismaError.statusCode).json({
            status: prismaError.status,
            message: prismaError.message,
        });
        return;
    }
    res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred.',
    });
};
exports.errorHandler = errorHandler;
