"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.handlePrismaError = exports.AppError = void 0;
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
            return new AppError('Bu benzersiz alan zaten mevcut.', 400);
        case 'P2025':
            return new AppError('Kayıt bulunamadı.', 404);
        case 'P2003':
            return new AppError('Geçersiz ilişki referansı.', 400);
        default:
            return new AppError('Veritabanı işlemi başarısız oldu.', 500);
    }
};
exports.handlePrismaError = handlePrismaError;
const errorHandler = (err, req, res, next) => {
    console.error('Hata:', err);
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(Object.assign({ status: err.status, message: err.message }, (err.validationErrors && { errors: err.validationErrors })));
    }
    if ('code' in err) {
        const prismaError = (0, exports.handlePrismaError)(err);
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
exports.errorHandler = errorHandler;
