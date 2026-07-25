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
    <div className="max-w-lg mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Create a New Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Expected Name (visitor must type this exactly)</label>
          <input
            className="w-full border p-2 rounded"
            value={form.expectedName}
            onChange={(e) => setForm({ ...form, expectedName: e.target.value })}
          />
          {fieldErrors.expectedName && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.expectedName[0]}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Success Message</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={3}
            value={form.successMessage}
            onChange={(e) => setForm({ ...form, successMessage: e.target.value })}
          />
          {fieldErrors.successMessage && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.successMessage[0]}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Fallback YouTube Link</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="https://youtube.com/..."
            value={form.failureRedirectUrl}
            onChange={(e) => setForm({ ...form, failureRedirectUrl: e.target.value })}
          />
          {fieldErrors.failureRedirectUrl && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.failureRedirectUrl[0]}</p>
          )}
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? 'Publishing...' : 'Publish Form'}
        </button>
      </form>
    </div>
  );
}