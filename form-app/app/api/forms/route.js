import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { getCurrentUser } from '@/lib/auth';
import { Form } from '@/models/index.js';
import { formSchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { expectedName, successMessage, failureRedirectUrl } = formSchema.parse(body);

    const slug = nanoid(8);

    const form = await Form.create({
      slug,
      expectedName,
      successMessage,
      failureRedirectUrl,
      status: 'published',
      publisherId: user.id,
    });

    return NextResponse.json({ form }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues.map((i) => i.message).join(', ') },
        { status: 400 }
      );
    }

    console.error(error);
    return NextResponse.json({ error: 'Failed to create form' }, { status: 500 });
  }
}