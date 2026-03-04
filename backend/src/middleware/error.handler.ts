import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      })),
    });
  }

  console.error(error);
  return res.status(500).json({
    message: 'Internal server error',
  });
}
