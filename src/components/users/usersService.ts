import prisma from '../../config/prisma.js';
import { User } from '@prisma/client';

export const fetchUsers = async (): Promise<User[]> => {
    return await prisma.user.findMany();
};

export const fetchUserById = async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id } });
};