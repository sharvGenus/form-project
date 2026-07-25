import { NextResponse } from 'next/server';
import {UAParser} from 'ua-parser-js';
import { Form, Submission } from '@/models/index.js';

export async function POST(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const { enteredName, latitude, longitude, accuracy } = body;

    if (!enteredName) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const form = await Form.findOne({
      where: { slug, status: 'published' },
    });

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    const userAgent = request.headers.get('user-agent') || '';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : null;

    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const normalizedExpected = form.expectedName.trim().toLowerCase();
    const normalizedEntered = enteredName.trim().toLowerCase();
    const matched = normalizedExpected === normalizedEntered;

    const submission = await Submission.create({
      formId: form.id,
      enteredName,
      matched,
      ipAddress,
      userAgent,
      deviceType: result.device.type || 'desktop',
      browser: result.browser.name || 'Unknown',
      os: result.os.name || 'Unknown',
    });

    if (latitude != null && longitude != null) {
      const { SubmissionLocation } = await import('@/models/index.js');
      await SubmissionLocation.create({
        submissionId: submission.id,
        latitude,
        longitude,
        accuracy: accuracy ?? null,
      });
    }

return NextResponse.json({
  matched,
  submissionId: submission.id,
  successMessage: matched ? form.successMessage : null,
  failureRedirectUrl: matched ? null : form.failureRedirectUrl,
});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 });
  }
}