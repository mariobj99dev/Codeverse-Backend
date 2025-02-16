import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async ({ email, password }: { email: string; password: string; }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
        data: {
            email,
            password: hashedPassword
        },
    });
};

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Credenciales incorrectas');
    }

    // 🔥 Actualizar `lastLogin` y obtener el usuario actualizado
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
        select: { id: true, email: true, role: true, isActive: true, createdAt: true, lastLogin: true, isBanned: true }
    });

    const token = jwt.sign({ id: updatedUser.id, email: updatedUser.email, role: updatedUser.role }, JWT_SECRET, { expiresIn: '1h' });

    return { token, user: updatedUser };
};