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
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/35">Forms</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Your Forms</h1>
          <p className="mt-2 text-sm text-white/55">
            Review every published flow, open analytics, and edit redirect behavior.
          </p>
        </div>

        <Link
          href="/dashboard/create-form"
          className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-100"
        >
          Create Form
        </Link>
      </div>

      {forms.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl">
            ✦
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-white">No forms yet</h2>
          <p className="mt-3 mx-auto max-w-md text-sm leading-7 text-white/55">
            Create your first form to start collecting exact-name submissions and directing visitors
            into your success or fallback flow.
          </p>
          <Link
            href="/dashboard/create-form"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-100"
          >
            Create Your First Form
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {forms.map((form) => (
            <div
              key={form.id}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
                    {form.status}
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-white">{form.slug}</h2>
                  <p className="mt-2 text-sm text-white/50">
                    Public URL: /f/{form.slug}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/dashboard/forms/${form.id}`}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
                  >
                    View
                  </Link>

                  <Link
                    href={`/dashboard/forms/${form.id}/analytics`}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
                  >
                    Analytics
                  </Link>

                  <Link
                    href={`/dashboard/forms/${form.id}/edit`}
                    className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-100"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}