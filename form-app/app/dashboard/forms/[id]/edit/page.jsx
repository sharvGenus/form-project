'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

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
    return <div className="max-w-lg mx-auto mt-10 p-6">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            className="w-full border p-2 rounded"
            value={form.expectedName}
            onChange={(e) => setForm({ ...form, expectedName: e.target.value })}
            placeholder="Expected Name"
          />
          {fieldErrors.expectedName && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.expectedName[0]}</p>
          )}
        </div>

        <div>
          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            value={form.successMessage}
            onChange={(e) => setForm({ ...form, successMessage: e.target.value })}
            placeholder="Success Message"
          />
          {fieldErrors.successMessage && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.successMessage[0]}</p>
          )}
        </div>

        <div>
          <input
            className="w-full border p-2 rounded"
            value={form.failureRedirectUrl}
            onChange={(e) => setForm({ ...form, failureRedirectUrl: e.target.value })}
            placeholder="Fallback YouTube URL"
          />
          {fieldErrors.failureRedirectUrl && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.failureRedirectUrl[0]}</p>
          )}
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button className="w-full bg-black text-white py-2 rounded" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}