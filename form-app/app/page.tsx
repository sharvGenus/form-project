import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur sm:px-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/55">The Setup</p>
            <h1 className="mt-1 text-lg font-semibold tracking-tight text-white">
              Forms with a playful twist
            </h1>
          </div>

          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-100"
            >
              Sign up
            </Link>
          </nav>
        </header>

        <main className="flex flex-1 items-center py-10 sm:py-14">
          <div className="grid w-full gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <section className="rounded-[32px] border border-white/10 bg-gradient-to-b from-cyan-500/10 to-white/[0.03] p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/55">
                I was created for a specific purpose.
              </p>

              <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">
                Smooth Moves for Regular Dudes
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                Help him surprise her so well she’ll forget he ever needed help.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-cyan-100"
                >
                  Open Dashboard
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
                >
                  Login to continue
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium text-white">Craft the Challenge</p>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    Rules, success messages, and where she lands next.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium text-white">Share the Secret</p>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    Use stable public links and QR codes without breaking future updates.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium text-white">Victory Message</p>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    She gets it right → she receives the exact words you prepared.
                  </p>
                </div>
              </div>
            </section>

            <aside className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 sm:p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-white/35">Quick Access</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                Start from the page you need
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/55">
                Choose the fastest entry point based on whether you want to explore, log in, or
                create an account.
              </p>

              <div className="mt-8 space-y-4">
                <Link
                  href="/dashboard"
                  className="block rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">Dashboard</p>
                      <p className="mt-2 text-sm leading-6 text-white/50">
                        Go directly to your workspace and manage live forms, edits, and analytics.
                      </p>
                    </div>
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
                      Primary
                    </span>
                  </div>
                </Link>

                <Link
                  href="/login"
                  className="block rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.05]"
                >
                  <p className="text-base font-semibold text-white">Login</p>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    Sign in with your existing credentials and continue your current workflow.
                  </p>
                </Link>

                <Link
                  href="/signup"
                  className="block rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.05]"
                >
                  <p className="text-base font-semibold text-white">Sign up</p>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    Create a new account to start building and sharing your own form experiences.
                  </p>
                </Link>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}