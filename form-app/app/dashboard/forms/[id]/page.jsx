'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function FormDetailPage() {
  const { id } = useParams();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadQr() {
      const res = await fetch(`/api/forms/${id}/qrcode`);
      const data = await res.json();
      if (res.ok) {
        setQrDataUrl(data.qrDataUrl);
        setFormUrl(data.formUrl);
      }
    }
    loadQr();
  }, [id]);

  async function handleCopy() {
    if (!formUrl) return;
    await navigator.clipboard.writeText(formUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/35">Form Detail</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Your form is live
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
            Share the public link, distribute the QR code, and use the same destination even after
            updating the form settings later.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/dashboard/forms/${id}/analytics`}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
          >
            View Analytics
          </Link>

          <Link
            href={`/dashboard/forms/${id}/edit`}
            className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-100"
          >
            Edit Form
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/35">Public Access</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Shareable destination</h2>
            </div>

            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
              Live
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">Form URL</p>
            <div className="mt-3 break-all text-sm leading-7 text-white/80">
              {formUrl || 'Loading public link...'}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!formUrl}
              className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {copied ? 'Copied' : 'Copy Link'}
            </button>

            {formUrl && (
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
              >
                Open Public Form
              </a>
            )}
          </div>

          <p className="mt-5 text-sm leading-7 text-white/50">
            This public link remains stable, so you can print it, share it, or embed the QR code
            without replacing it later.
          </p>
        </section>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/35">QR Access</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Scan and open</h2>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR Code for public form"
                className="mx-auto rounded-2xl"
                width={260}
                height={260}
              />
            ) : (
              <div className="flex h-[260px] items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-white/40">
                Loading QR code...
              </div>
            )}
          </div>

          <p className="mt-4 text-sm leading-7 text-white/50">
            Use this QR code for posters, printouts, or quick mobile access during in-person flows.
          </p>
        </aside>
      </div>
    </div>
  );
}