import { NextFunction, Request, Response } from 'express';
import { ZodSchema, ZodError } from 'zod';

const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
        return;
      }
      res.status(500).json({
        error: 'An unexpected error occurred during validation'
      });
      return;
    }
  };
};

export default validate;
