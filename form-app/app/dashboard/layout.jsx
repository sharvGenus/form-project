import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import LogoutButton from './LogoutButton';

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-white/10 bg-white/[0.03] backdrop-blur-xl lg:flex">
          <div className="border-b border-white/10 px-6 py-6">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Publisher Panel</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">Form Console</h1>
            <p className="mt-2 text-sm text-white/50">
              Manage forms, review analytics, and control public flows.
            </p>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            <Link
              href="/dashboard"
              className="block rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-white/75 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
            >
              Overview
            </Link>

            <Link
              href="/dashboard/forms"
              className="block rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-white/75 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
            >
              Your Forms
            </Link>

            <Link
              href="/dashboard/create-form"
              className="block rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/15"
            >
              Create Form
            </Link>
          </nav>

          <div className="border-t border-white/10 px-6 py-5">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="mt-1 text-sm text-white/45">{user.email}</p>
            </div>

            <div className="mt-4">
              <LogoutButton />
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/35">Dashboard</p>
                <p className="mt-1 text-sm text-white/55">Manage your forms and track responses.</p>
              </div>

              <div className="lg:hidden">
                <Link
                  href="/dashboard/forms"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
                >
                  Forms
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}