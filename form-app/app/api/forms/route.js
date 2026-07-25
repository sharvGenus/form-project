// import { NextResponse } from 'next/server';
// import { nanoid } from 'nanoid';
// import { getCurrentUser } from '@/lib/auth';
// import { Form } from '@/models/index.js';
// import { formSchema } from '@/lib/validations';
// import { ZodError } from 'zod';

// export async function POST(request) {
//   try {
//     const user = await getCurrentUser();
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const body = await request.json();
//     const { expectedName, successMessage, failureRedirectUrl } = formSchema.parse(body);

//     const slug = nanoid(8);

//     const form = await Form.create({
//       slug,
//       expectedName,
//       successMessage,
//       failureRedirectUrl,
//       status: 'published',
//       publisherId: user.id,
//     });

//     return NextResponse.json({ form }, { status: 201 });
//   } catch (error) {
//     if (error instanceof ZodError) {
//       return NextResponse.json(
//         { error: error.issues.map((i) => i.message).join(', ') },
//         { status: 400 }
//       );
//     }

//     console.error(error);
//     return NextResponse.json({ error: 'Failed to create form' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { getCurrentUser } from '@/lib/auth';
import { Form } from '@/models/index.js';
import { formSchema } from '@/lib/validations';

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    const { expectedName, successMessage, failureRedirectUrl } = result.data;

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