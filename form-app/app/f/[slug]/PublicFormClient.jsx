'use client';

import { useEffect, useState } from 'react';

export default function PublicFormClient({ slug }) {
  const [form, setForm] = useState(null);
  const [enteredName, setEnteredName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function loadForm() {
      try {
        const res = await fetch(`/api/public/forms/${slug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Form not found');
          setFetching(false);
          return;
        }

        setForm(data.form);
        setFetching(false);
      } catch {
        setError('Unable to load form');
        setFetching(false);
      }
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
      } catch {}

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

    if (!enteredName.trim()) {
      setError('Please enter your name.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const locationData = await getCurrentLocation();

      const res = await fetch(`/api/public/forms/${slug}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enteredName: enteredName.trim(),
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
        window.location.href = `/f/${slug}/success/${data.submissionId}`;
      } else {
        window.location.href = data.failureRedirectUrl;
      }
    } catch {
      setLoading(false);
      setError('Unable to submit right now. Please try again.');
    }
  }

  if (error && !form && !fetching) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] px-4 py-16 text-white">
        <div className="mx-auto max-w-xl">
          <div className="rounded-[28px] border border-red-400/20 bg-red-500/10 p-6 text-center shadow-2xl shadow-black/30">
            <p className="text-sm uppercase tracking-[0.22em] text-red-200/70">Unavailable</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              This form is not available
            </h1>
            <p className="mt-4 text-sm leading-7 text-red-100/75">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!form || fetching) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] px-4 py-16 text-white">
        <div className="mx-auto max-w-xl">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="h-3 w-24 rounded-full bg-white/10" />
            <div className="mt-4 h-10 w-56 rounded-2xl bg-white/10" />
            <div className="mt-3 h-4 w-72 max-w-full rounded-full bg-white/5" />
            <div className="mt-8 h-14 rounded-2xl bg-white/5" />
            <div className="mt-4 h-12 rounded-2xl bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] px-4 py-10 text-white sm:py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section className="order-2 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 sm:p-8 lg:order-1">
          <p className="text-sm uppercase tracking-[0.22em] text-white/35">Private Access</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Enter your name
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
            Complete the form below to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="enteredName" className="text-sm font-medium text-white/85">
                Your name
              </label>
              <input
                id="enteredName"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                placeholder="Type your full name"
                value={enteredName}
                onChange={(e) => setEnteredName(e.target.value)}
                autoComplete="name"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Continue'}
            </button>
          </form>
        </section>

        <aside className="order-1 rounded-[28px] border border-white/10 bg-gradient-to-b from-cyan-500/10 to-white/[0.03] p-6 sm:p-8 lg:order-2">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-100/55">Welcome</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            A quick step before you continue
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
            Enter the requested name and submit once to move forward.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Simple and focused</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                This screen is designed to keep the process quick and easy to complete.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">One clear action</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Enter your name, submit the form, and the next step will open automatically.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Works across devices</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                The layout stays clean and readable on both mobile and desktop screens.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}