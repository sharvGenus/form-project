import { NextResponse } from 'next/server';
import { Form } from '@/models/index.js';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const form = await Form.findOne({
      where: { slug, status: 'published' },
      attributes: ['id', 'slug', 'successMessage', 'failureRedirectUrl', 'status'],
    });

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    return NextResponse.json({ form });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch form' }, { status: 500 });
  }
}