'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateFormPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    expectedName: '',
    successMessage: '',
    failureRedirectUrl: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);

    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'Failed to create form');
        setFieldErrors(data.fieldErrors || {});
        return;
      }

      router.push(`/dashboard/forms/${data.form.id}`);
    } catch {
      setLoading(false);
      setError('Unable to create form. Please try again.');
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-white/35">Create Form</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Publish a new form</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
          Define the exact name visitors must enter, choose the message they see on success,
          and set the redirect destination for failed matches.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 sm:p-8"
        >
          <div className="space-y-6">
            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="expectedName" className="text-sm font-medium text-white/85">
                Expected Name
              </label>
              <p className="text-sm text-white/45">
                Visitors must type this value exactly to see the success message.
              </p>
              <input
                id="expectedName"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                placeholder="Enter the exact expected name"
                value={form.expectedName}
                onChange={(e) => setForm({ ...form, expectedName: e.target.value })}
              />
              {fieldErrors.expectedName && (
                <p className="text-sm text-red-300">{fieldErrors.expectedName[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="successMessage" className="text-sm font-medium text-white/85">
                Success Message
              </label>
              <p className="text-sm text-white/45">
                This message appears when the entered name matches your expected value.
              </p>
              <textarea
                id="successMessage"
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                placeholder="Write the message visitors should see on success"
                value={form.successMessage}
                onChange={(e) => setForm({ ...form, successMessage: e.target.value })}
              />
              {fieldErrors.successMessage && (
                <p className="text-sm text-red-300">{fieldErrors.successMessage[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="failureRedirectUrl" className="text-sm font-medium text-white/85">
                Failure Redirect URL
              </label>
              <p className="text-sm text-white/45">
                If the visitor enters the wrong name, they will be redirected here.
              </p>
              <input
                id="failureRedirectUrl"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                placeholder="https://youtube.com/..."
                value={form.failureRedirectUrl}
                onChange={(e) => setForm({ ...form, failureRedirectUrl: e.target.value })}
              />
              {fieldErrors.failureRedirectUrl && (
                <p className="text-sm text-red-300">{fieldErrors.failureRedirectUrl[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Publishing...' : 'Publish Form'}
            </button>
          </div>
        </form>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/35">Flow Preview</p>
          <h2 className="mt-3 text-xl font-semibold text-white">How this form behaves</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">1. Visitor opens the public form</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                They enter a name and optionally share location details.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">2. Exact match check runs</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                If the entered name matches your configured expected value, the success flow is shown.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">3. Fallback redirect handles failure</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Non-matching submissions are redirected to your chosen destination URL.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}