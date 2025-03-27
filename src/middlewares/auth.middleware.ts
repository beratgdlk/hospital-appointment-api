import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';
import { prisma } from '../config/database';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Middleware to verify JWT token
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Authorization token not provided', 401, true));
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'add-your-secret-key-here';

    // Verify token
    const decoded = jwt.verify(token, secret) as { id: number };
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return next(new AppError('No user found with this token', 401, true));
    }

    // Add user info to request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token', 401, true));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Token expired', 401, true));
    }
    next(error);
  }
};

/**
 * Middleware to authorize specific roles
 * @param roles Array of allowed roles
 */
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('You need to be logged in to perform this action', 401, true));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have the required permission to perform this action', 403, true)
      );
    }

    next();
  };
}; 