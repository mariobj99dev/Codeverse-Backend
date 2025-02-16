import { NextFunction, Request, Response } from 'express';
import { registerUser, loginUser } from './authService.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await registerUser(req.body);
        ApiResponse.send(res, 201, 'Usuario registrado con éxito', user);
    } catch (error) {
        next(new ApiError('Error al registrar usuario', 500));
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token, user } = await loginUser(req.body);
        ApiResponse.send(res, 200, 'Inicio de sesión exitoso', { token, user });
    } catch (error) {
        next(new ApiError('Credenciales incorrectas', 401));
    }
};