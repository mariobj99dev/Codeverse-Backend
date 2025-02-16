// src/middleware/notFoundHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const err = new ApiError(`No se encontró la ruta ${req.originalUrl}`, 404);
    next(err);
};
