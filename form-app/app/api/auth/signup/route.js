import bcrypt from 'bcryptjs';
import { sequelize, User } from '@/models/index.js';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return Response.json({ error: 'Email already registered' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    return Response.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Signup failed' }, { status: 500 });
  }
}