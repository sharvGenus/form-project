'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditFormPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    expectedName: '',
    successMessage: '',
    failureRedirectUrl: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadForm() {
      try {
        const res = await fetch('/api/forms');
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (!res.ok) {
          setError(data.error || 'Failed to load forms');
          setLoading(false);
          return;
        }

        const current = data.forms.find((f) => f.id === id);

        if (!current) {
          setError('Form not found');
          setLoading(false);
          return;
        }

        setForm({
          expectedName: current.expectedName,
          successMessage: current.successMessage,
          failureRedirectUrl: current.failureRedirectUrl,
        });
        setLoading(false);
      } catch {
        setError('Unable to load form.');
        setLoading(false);
      }
    }

    loadForm();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setSaving(true);

    try {
      const res = await fetch(`/api/forms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setSaving(false);

      if (!res.ok) {
        setError(data.error || 'Failed to update form');
        setFieldErrors(data.fieldErrors || {});
        return;
      }

      router.push(`/dashboard/forms/${id}`);
    } catch {
      setSaving(false);
      setError('Unable to save changes. Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="space-y-3">
          <div className="h-3 w-24 rounded-full bg-white/10" />
          <div className="h-10 w-56 rounded-2xl bg-white/10" />
          <div className="h-4 w-80 max-w-full rounded-full bg-white/5" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <div className="space-y-5">
              <div className="h-24 rounded-2xl bg-white/5" />
              <div className="h-32 rounded-2xl bg-white/5" />
              <div className="h-24 rounded-2xl bg-white/5" />
              <div className="h-12 rounded-2xl bg-white/10" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="h-5 w-40 rounded-xl bg-white/10" />
            <div className="mt-6 space-y-4">
              <div className="h-24 rounded-2xl bg-white/5" />
              <div className="h-24 rounded-2xl bg-white/5" />
              <div className="h-24 rounded-2xl bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/35">Edit Form</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Update live form settings
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
            Adjust the exact match name, refine the success message, or change the fallback
            destination without replacing the public form link.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/dashboard/forms/${id}`}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
          >
            Back to Detail
          </Link>
        </div>
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
                Visitors must enter this value exactly to trigger the success flow.
              </p>
              <input
                id="expectedName"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                value={form.expectedName}
                onChange={(e) => setForm({ ...form, expectedName: e.target.value })}
                placeholder="Enter the exact expected name"
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
                This message appears when the submission passes the exact-name check.
              </p>
              <textarea
                id="successMessage"
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                value={form.successMessage}
                onChange={(e) => setForm({ ...form, successMessage: e.target.value })}
                placeholder="Write the message shown after a successful match"
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
                Non-matching visitors will be redirected to this destination.
              </p>
              <input
                id="failureRedirectUrl"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                value={form.failureRedirectUrl}
                onChange={(e) => setForm({ ...form, failureRedirectUrl: e.target.value })}
                placeholder="https://youtube.com/..."
              />
              {fieldErrors.failureRedirectUrl && (
                <p className="text-sm text-red-300">{fieldErrors.failureRedirectUrl[0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                className="w-full rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>

              <Link
                href={`/dashboard/forms/${id}`}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-center text-sm font-medium text-white/85 transition hover:bg-white/10"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/35">Live Update Notes</p>
          <h2 className="mt-3 text-xl font-semibold text-white">What changes here affect</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Public destination stays stable</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Updating settings does not require a new share link or QR code.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Exact match rule updates immediately</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                New submissions will use the latest expected name after you save.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Fallback behavior can be redirected</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Failed attempts will follow the newest redirect URL you configure.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-400/15 bg-cyan-500/10 p-4">
            <p className="text-sm font-medium text-cyan-100">Form ID</p>
            <p
              className="mt-2 text-sm text-cyan-50/80"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {id}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}