'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

export default function FormAnalyticsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAnalytics() {
      const res = await fetch(`/api/forms/${id}/analytics`);
      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Failed to load analytics');
        return;
      }

      setData(result);
    }

    loadAnalytics();
  }, [id]);

  const successRate = useMemo(() => {
    if (!data?.stats?.totalSubmissions) return 0;
    return Math.round((data.stats.matchedCount / data.stats.totalSubmissions) * 100);
  }, [data]);

  const failureRate = useMemo(() => {
    if (!data?.stats?.totalSubmissions) return 0;
    return Math.round((data.stats.failedCount / data.stats.totalSubmissions) * 100);
  }, [data]);

  if (error) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-red-400/20 bg-red-500/10 px-6 py-5 text-sm text-red-200">
          {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="space-y-3">
          <div className="h-3 w-28 rounded-full bg-white/10" />
          <div className="h-10 w-64 rounded-2xl bg-white/10" />
          <div className="h-4 w-96 max-w-full rounded-full bg-white/5" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="h-3 w-24 rounded-full bg-white/10" />
              <div className="mt-4 h-8 w-20 rounded-xl bg-white/10" />
              <div className="mt-3 h-3 w-28 rounded-full bg-white/5" />
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="h-5 w-40 rounded-xl bg-white/10" />
          <div className="mt-6 space-y-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-12 rounded-2xl bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/35">Analytics</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Form performance
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
            Review total activity, outcome mix, and submission-level details for this live form.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
          Tracking form ID:{' '}
          <span className="font-medium text-white/85" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {id}
          </span>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
          <p className="text-sm text-white/45">Total Submissions</p>
          <p
            className="mt-3 text-3xl font-semibold text-white"
            style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
          >
            {data.stats.totalSubmissions}
          </p>
          <p className="mt-2 text-sm text-white/45">All recorded attempts</p>
        </div>

        <div className="rounded-3xl border border-emerald-400/15 bg-emerald-500/10 p-5 shadow-2xl shadow-black/20">
          <p className="text-sm text-emerald-100/70">Matched</p>
          <p
            className="mt-3 text-3xl font-semibold text-emerald-200"
            style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
          >
            {data.stats.matchedCount}
          </p>
          <p className="mt-2 text-sm text-emerald-100/60">{successRate}% success rate</p>
        </div>

        <div className="rounded-3xl border border-red-400/15 bg-red-500/10 p-5 shadow-2xl shadow-black/20">
          <p className="text-sm text-red-100/70">Failed</p>
          <p
            className="mt-3 text-3xl font-semibold text-red-200"
            style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
          >
            {data.stats.failedCount}
          </p>
          <p className="mt-2 text-sm text-red-100/60">{failureRate}% failure rate</p>
        </div>

        <div className="rounded-3xl border border-cyan-400/15 bg-cyan-500/10 p-5 shadow-2xl shadow-black/20">
          <p className="text-sm text-cyan-100/70">Outcome Mix</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-300"
              style={{ width: `${successRate}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-white/55">
            <span>Matched {successRate}%</span>
            <span>Failed {failureRate}%</span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-white/35">Outcome Summary</p>
          <h2 className="mt-3 text-xl font-semibold text-white">Submission breakdown</h2>

          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-white/70">
                <span>Matched submissions</span>
                <span style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>
                  {data.stats.matchedCount}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-300"
                  style={{ width: `${successRate}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-white/70">
                <span>Failed submissions</span>
                <span style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>
                  {data.stats.failedCount}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-red-300"
                  style={{ width: `${failureRate}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/50">
            This view helps you quickly judge whether the expected-name rule is working as intended
            or whether many visitors are failing the match condition.
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-white/35">Data Notes</p>
          <h2 className="mt-3 text-xl font-semibold text-white">What each row includes</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Identity input</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Stores the entered name and whether it matched your configured expected value.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Device context</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Shows device type, browser, and operating system when available.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Location fields</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Latitude and longitude appear only when that data is captured successfully.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-medium text-white">Submission time</p>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Timestamps help you inspect recent activity and traffic timing patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/20 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-white/35">Submissions</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Detailed activity log</h2>
          </div>

          <p className="text-sm text-white/45">
            Rows: <span style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>{data.submissions.length}</span>
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-left">
                <th className="border-b border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  Name Entered
                </th>
                <th className="border-b border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  Status
                </th>
                <th className="border-b border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  Device
                </th>
                <th className="border-b border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  Browser
                </th>
                <th className="border-b border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  OS
                </th>
                <th className="border-b border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  Latitude
                </th>
                <th className="border-b border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  Longitude
                </th>
                <th className="border-b border-white/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  Submitted
                </th>
              </tr>
            </thead>

            <tbody>
              {data.submissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-white/45">
                    No submissions recorded yet.
                  </td>
                </tr>
              ) : (
                data.submissions.map((submission) => (
                  <tr key={submission.id} className="transition hover:bg-white/[0.03]">
                    <td className="border-b border-white/5 px-4 py-4 text-sm text-white/85">
                      {submission.enteredName || '-'}
                    </td>

                    <td className="border-b border-white/5 px-4 py-4 text-sm">
                      <span
                        className={
                          submission.matched
                            ? 'inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-200'
                            : 'inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-200'
                        }
                      >
                        {submission.matched ? 'Matched' : 'Failed'}
                      </span>
                    </td>

                    <td className="border-b border-white/5 px-4 py-4 text-sm text-white/60">
                      {submission.deviceType || 'Unknown'}
                    </td>
                    <td className="border-b border-white/5 px-4 py-4 text-sm text-white/60">
                      {submission.browser || 'Unknown'}
                    </td>
                    <td className="border-b border-white/5 px-4 py-4 text-sm text-white/60">
                      {submission.os || 'Unknown'}
                    </td>

                    <td
                      className="border-b border-white/5 px-4 py-4 text-sm text-white/60"
                      style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
                    >
                      {submission.location?.latitude ?? '-'}
                    </td>

                    <td
                      className="border-b border-white/5 px-4 py-4 text-sm text-white/60"
                      style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
                    >
                      {submission.location?.longitude ?? '-'}
                    </td>

                    <td className="border-b border-white/5 px-4 py-4 text-sm text-white/60">
                      {new Date(submission.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}