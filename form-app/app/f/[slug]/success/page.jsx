'use client';

import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('successMessage');
    setMessage(stored || 'Your submission was completed successfully.');
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0f] px-4 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-black/30 sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-emerald-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <p className="mt-6 text-sm uppercase tracking-[0.22em] text-emerald-200/65">Confirmed</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Message for you
          </h1>
          <p className="mt-6 text-base leading-8 text-white/75">{message}</p>
        </div>
      </div>
    </div>
  );
}