import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { Form } from '@/models/index.js';

export async function PUT(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { expectedName, successMessage, failureRedirectUrl } = await request.json();

    const form = await Form.findOne({ where: { id, publisherId: user.id } });
    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    form.expectedName = expectedName;
    form.successMessage = successMessage;
    form.failureRedirectUrl = failureRedirectUrl;
    await form.save();

    return NextResponse.json({ form });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update form' }, { status: 500 });
  }
}