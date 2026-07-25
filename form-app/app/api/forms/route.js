import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { getCurrentUser } from '@/lib/auth';
import { Form } from '@/models/index.js';

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { expectedName, successMessage, failureRedirectUrl } = await request.json();

    if (!expectedName || !successMessage || !failureRedirectUrl) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

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
    console.error(error);
    return NextResponse.json({ error: 'Failed to create form' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const forms = await Form.findAll({
      where: { publisherId: user.id },
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json({ forms });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch forms' }, { status: 500 });
  }
}