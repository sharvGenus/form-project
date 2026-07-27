import { Form, Submission } from '@/models/index.js';
import SuccessMessageClient from './SuccessMessageClient';

export default async function SuccessPage({ params }) {
  const { slug, submissionId } = await params;

  const form = await Form.findOne({
    where: { slug, status: 'published' },
    attributes: ['id', 'successMessage'],
  });

  if (!form) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[32px] border border-red-400/20 bg-red-500/10 p-8 text-center shadow-2xl shadow-black/30 sm:p-12">
            <p className="text-sm uppercase tracking-[0.22em] text-red-200/65">Unavailable</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Form not found</h1>
            <p className="mt-4 text-sm leading-7 text-red-100/75">
              The requested success page could not be loaded.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const submission = await Submission.findOne({
    where: {
      id: submissionId,
      formId: form.id,
      matched: true,
    },
  });

  if (!submission) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[32px] border border-red-400/20 bg-red-500/10 p-8 text-center shadow-2xl shadow-black/30 sm:p-12">
            <p className="text-sm uppercase tracking-[0.22em] text-red-200/65">Invalid</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Invalid success page
            </h1>
            <p className="mt-4 text-sm leading-7 text-red-100/75">
              This success view is not available for the current submission.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <SuccessMessageClient message={form.successMessage} />;
}