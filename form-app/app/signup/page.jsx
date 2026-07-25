'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setFieldErrors(data.fieldErrors || {});
        return;
      }

      router.push('/login');
    } catch {
      setError('Unable to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-5%] top-[20%] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.04),transparent,rgba(255,255,255,0.03))]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <section className="hidden lg:flex flex-col justify-between border-r border-white/10 bg-white/[0.03] p-10 xl:p-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Join the platform
              </div>

              <h1 className="mt-6 max-w-md text-4xl font-semibold leading-tight tracking-tight">
                Create your account and start your journey in style.
              </h1>

              <p className="mt-4 max-w-md text-base leading-7 text-white/65">
                A clean, premium signup experience with a modern glassmorphism layout,
                strong visual hierarchy, and your existing functionality fully preserved.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-medium text-white">Fast onboarding</p>
                <p className="mt-1 text-sm text-white/60">
                  Minimal friction, clear input states, and a stronger first impression.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-medium text-white">Responsive layout</p>
                <p className="mt-1 text-sm text-white/60">
                  Works elegantly across mobile, tablet, and desktop screens.
                </p>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Join the platform
                </div>
                <h1 className="mt-5 text-3xl font-semibold tracking-tight">Sign Up</h1>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Create your account to continue.
                </p>
              </div>

              <div className="mb-8 hidden lg:block">
                <p className="text-sm uppercase tracking-[0.2em] text-white/45">Welcome</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Create Account</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Fill in your details to get started.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/85">
                    Full Name
                  </label>
                  <input
                    id="name"
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {fieldErrors.name && (
                    <p className="text-sm text-red-300">{fieldErrors.name[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/85">
                    Email Address
                  </label>
                  <input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
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
                    placeholder="Create a password"
                    type="password"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition duration-200 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  {fieldErrors.password && (
                    <p className="text-sm text-red-300">{fieldErrors.password[0]}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold text-black transition duration-300 hover:scale-[1.01] hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative z-10">
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 to-transparent transition duration-700 group-hover:translate-x-full" />
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-white/45">
                By signing up, you agree to a better-looking auth experience.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}