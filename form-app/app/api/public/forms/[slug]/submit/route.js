import { NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';
import { Form, Submission } from '@/models/index.js';
import { publicSubmitSchema } from '@/lib/validations';

export async function POST(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const result = publicSubmitSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      enteredFirstName,
      enteredLastName,
      latitude,
      longitude,
      accuracy,
    } = result.data;

    const form = await Form.findOne({
      where: {
        slug,
        status: 'published',
      },
    });

    if (!form) {
      return NextResponse.json(
        { error: 'Form not found' },
        { status: 404 }
      );
    }

    const userAgent = request.headers.get('user-agent') || '';

    const forwardedFor = request.headers.get('x-forwarded-for');

    const ipAddress = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : null;

    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();

    const normalizedExpectedFirst =
      form.expectedFirstName.trim().toLowerCase();

    const normalizedExpectedLast =
      form.expectedLastName.trim().toLowerCase();

    const normalizedEnteredFirst =
      enteredFirstName.trim().toLowerCase();

    const normalizedEnteredLast =
      enteredLastName.trim().toLowerCase();

    const matched =
      normalizedExpectedFirst === normalizedEnteredFirst &&
      normalizedExpectedLast === normalizedEnteredLast;

    const submission = await Submission.create({
      formId: form.id,

      enteredFirstName,
      enteredLastName,

      matched,

      ipAddress,

      userAgent,

      deviceType: uaResult.device.type || 'desktop',

      browser: uaResult.browser.name || 'Unknown',

      os: uaResult.os.name || 'Unknown',
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
      failureRedirectUrl: matched
        ? null
        : form.failureRedirectUrl,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Failed to submit form',
      },
      {
        status: 500,
      }
    );
  }
}