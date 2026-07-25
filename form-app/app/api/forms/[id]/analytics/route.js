import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { Form, Submission, SubmissionLocation } from '@/models/index.js';

export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const form = await Form.findOne({
      where: { id, publisherId: user.id },
    });

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    const submissions = await Submission.findAll({
      where: { formId: form.id },
      include: [
        {
          model: SubmissionLocation,
          as: 'location',
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const totalSubmissions = submissions.length;
    const matchedCount = submissions.filter((s) => s.matched).length;
    const failedCount = totalSubmissions - matchedCount;

    return NextResponse.json({
      form,
      stats: {
        totalSubmissions,
        matchedCount,
        failedCount,
      },
      submissions,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load analytics' }, { status: 500 });
  }
}