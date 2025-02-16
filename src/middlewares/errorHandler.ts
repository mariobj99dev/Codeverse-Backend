// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Log del error para fines de monitoreo
    console.error('ERROR 🚨', err);

    // Responder al cliente
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Error del servidor',
    });
};
