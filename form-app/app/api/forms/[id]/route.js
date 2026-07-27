// import { NextResponse } from 'next/server';
// import { getCurrentUser } from '@/lib/auth';
// import { Form } from '@/models/index.js';

// export async function PUT(request, { params }) {
//   try {
//     const user = await getCurrentUser();
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { id } = await params;
//     const { expectedName, successMessage, failureRedirectUrl } = await request.json();

//     const form = await Form.findOne({ where: { id, publisherId: user.id } });
//     if (!form) {
//       return NextResponse.json({ error: 'Form not found' }, { status: 404 });
//     }

//     form.expectedName = expectedName;
//     form.successMessage = successMessage;
//     form.failureRedirectUrl = failureRedirectUrl;
//     await form.save();

//     return NextResponse.json({ form });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to update form' }, { status: 500 });
//   }
// }

// New Changes
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { Form } from '@/models/index.js';
import { formSchema } from '@/lib/validations';

export async function PUT(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const body = await request.json();

    const result = formSchema.safeParse(body);

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
      expectedFirstName,
      expectedLastName,
      successMessage,
      failureRedirectUrl,
    } = result.data;

    const form = await Form.findOne({
      where: {
        id,
        publisherId: user.id,
      },
    });

    if (!form) {
      return NextResponse.json(
        { error: 'Form not found' },
        { status: 404 }
      );
    }

    form.expectedFirstName = expectedFirstName;
    form.expectedLastName = expectedLastName;
    form.successMessage = successMessage;
    form.failureRedirectUrl = failureRedirectUrl;

    await form.save();

    return NextResponse.json({ form });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update form' },
      { status: 500 }
    );
  }
}