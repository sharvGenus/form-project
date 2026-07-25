import { Form, Submission } from '@/models/index.js';

export default async function SuccessPage({ params }) {
  const { slug, submissionId } = await params;

  const submission = await Submission.findByPk(submissionId);
  const form = await Form.findOne({ where: { slug, status: 'published' } });

  if (!submission || !form || submission.formId !== form.id || !submission.matched) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-6 text-center text-red-600">
        Invalid success page
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Message for You</h1>
      <p className="text-lg">{form.successMessage}</p>
    </div>
  );
}