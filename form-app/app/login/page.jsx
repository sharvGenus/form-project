'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setFieldErrors(data.fieldErrors || {});
        return;
      }

      router.push('/dashboard');
    } catch {
      setLoading(false);
      setError('Unable to log in right now. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] px-4 py-10 text-white sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <aside className="rounded-[28px] border border-white/10 bg-gradient-to-b from-cyan-500/10 to-white/[0.03] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-100/55">Welcome Back</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Login to your dashboard
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
            Access your forms, review analytics, update live settings, and manage every shareable
            experience from one place.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Manage live forms</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Edit public flows, success messages, and redirect logic without breaking shared links.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Track responses</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Monitor submissions, match rates, and recent activity in a cleaner analytics view.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Keep the flow consistent</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Your dashboard stays aligned with the premium UI language used across the app.
              </p>
            </div>
          </div>
        </aside>

        <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 sm:p-8">
          <p className="text-sm uppercase tracking-[0.22em] text-white/35">Authentication</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Login</h2>
          <p className="mt-3 text-sm leading-7 text-white/55">
            Enter your credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white/85">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-300">{fieldErrors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white/85">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {fieldErrors.password && (
                <p className="text-sm text-red-300">{fieldErrors.password[0]}</p>
              )}
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
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}