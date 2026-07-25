import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { User } from '@/models/index.js';

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId, {
      attributes: ['id', 'name', 'email'],
    });

    return user;
  } catch (error) {
    return null;
  }
}