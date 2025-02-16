import { NextFunction, Request, Response } from 'express';
import { fetchUsers, fetchUserById } from './usersService.js';
import { ApiError } from '../../utils/ApiError.js'; // Asegúrate de que la ruta sea correcta
import { ApiResponse } from '../../utils/ApiResponse.js'; // Asegúrate de que la ruta sea correcta

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await fetchUsers();

        if (!users || users.length === 0) {
            return next(new ApiError('No se encontraron usuarios', 404));
        }

        ApiResponse.send(res, 200, 'Usuarios obtenidos con éxito.', users);
    } catch (error) {
        return next(new ApiError('Error al obtener usuarios', 500));
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId: number = parseInt(req.params.id, 10);

        if (isNaN(userId)) {
            return next(new ApiError('ID inválido', 400));
        }

        const user = await fetchUserById(userId);
        if (!user) {
            return next(new ApiError('Usuario no encontrado', 404));
        }

        ApiResponse.send(res, 200, 'Usuario obtenido con éxito.', user);
    } catch (error) {
        return next(new ApiError('Error al obtener usuario', 500));
    }
};
