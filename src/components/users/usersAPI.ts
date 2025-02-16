import { Router } from 'express';
import { getUsers, getUserById } from './usersController.js';

const router = Router();

router.get('/', getUsers); // Obtener todos los usuarios
router.get('/:id', getUserById); // Obtener un usuario por ID

export default router;
