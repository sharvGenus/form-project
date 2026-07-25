'use client';

import { useEffect, useState } from 'react';

export default function PublicFormClient({ slug }) {
  const [form, setForm] = useState(null);
  const [enteredName, setEnteredName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadForm() {
      const res = await fetch(`/api/public/forms/${slug}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Form not found');
        return;
      }

      setForm(data.form);
    }

    loadForm();
  }, [slug]);

  function getCurrentLocation() {
    return new Promise(async (resolve) => {
      if (!navigator.geolocation) {
        resolve({ latitude: null, longitude: null, accuracy: null });
        return;
      }

      try {
        if ('permissions' in navigator && navigator.permissions?.query) {
          const permission = await navigator.permissions.query({ name: 'geolocation' });

          if (permission.state === 'denied') {
            resolve({ latitude: null, longitude: null, accuracy: null });
            return;
          }
        }
      } catch (e) {
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        () => {
          resolve({ latitude: null, longitude: null, accuracy: null });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const locationData = await getCurrentLocation();

    const res = await fetch(`/api/public/forms/${slug}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        enteredName,
        ...locationData,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Submission failed');
      return;
    }

    if (data.matched) {
      window.location.href = `/f/${slug}/success`;
    } else {
      window.location.href = data.failureRedirectUrl;
    }
  }

  if (error && !form) {
    return <div className="max-w-lg mx-auto mt-20 p-6 text-red-600">{error}</div>;
  }

  if (!form) {
    return <div className="max-w-lg mx-auto mt-20 p-6">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Enter Your Name</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Your name"
          value={enteredName}
          onChange={(e) => setEnteredName(e.target.value)}
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}