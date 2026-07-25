import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Form } from '@/models/index.js';

export default async function FormsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const forms = await Form.findAll({
    where: { publisherId: user.id },
    order: [['createdAt', 'DESC']],
  });

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Forms</h1>
        <Link href="/dashboard/create-form" className="bg-black text-white px-4 py-2 rounded">
          Create Form
        </Link>
      </div>

      <div className="space-y-4">
        {forms.map((form) => (
          <div key={form.id} className="border rounded-lg p-4">
            <p className="font-semibold">Slug: {form.slug}</p>
            <p>Status: {form.status}</p>
            <div className="flex gap-4 mt-3">
              <Link href={`/dashboard/forms/${form.id}`} className="text-blue-600 underline">
                View
              </Link>
              <Link href={`/dashboard/forms/${form.id}/analytics`} className="text-blue-600 underline">
                Analytics
              </Link>
              <Link href={`/dashboard/forms/${form.id}/edit`} className="text-blue-600 underline">
                Edit
              </Link>
            </div>
          </div>
        ))}

        {forms.length === 0 && (
          <p className="text-gray-600">No forms yet.</p>
        )}
      </div>
    </div>
  );
}