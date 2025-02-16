import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from 'utils/ApiError.js';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next(new ApiError('Token not found', 401));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        throw next(new ApiError('Invalid token', 403));
    }
};