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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadForm() {
      const res = await fetch(`/api/forms`);
      const data = await res.json();

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
    }

    loadForm();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const res = await fetch(`/api/forms/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Failed to update form');
      return;
    }

    router.push(`/dashboard/forms/${id}`);
  }

  if (loading) {
    return <div className="max-w-lg mx-auto mt-10 p-6">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          value={form.expectedName}
          onChange={(e) => setForm({ ...form, expectedName: e.target.value })}
          placeholder="Expected Name"
        />

        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          value={form.successMessage}
          onChange={(e) => setForm({ ...form, successMessage: e.target.value })}
          placeholder="Success Message"
        />

        <input
          className="w-full border p-2 rounded"
          value={form.failureRedirectUrl}
          onChange={(e) => setForm({ ...form, failureRedirectUrl: e.target.value })}
          placeholder="Fallback YouTube URL"
        />

        {error && <p className="text-red-600">{error}</p>}

        <button className="w-full bg-black text-white py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}