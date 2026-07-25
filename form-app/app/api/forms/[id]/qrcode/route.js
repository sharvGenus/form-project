import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { getCurrentUser } from '@/lib/auth';
import { Form } from '@/models/index.js';

export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const form = await Form.findOne({ where: { id, publisherId: user.id } });

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const formUrl = `${baseUrl}/f/${form.slug}`;

    const qrDataUrl = await QRCode.toDataURL(formUrl);

    return NextResponse.json({ qrDataUrl, formUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}