'use client';

import dynamic from 'next/dynamic';

const SubmissionMapInner = dynamic(() => import('./SubmissionMapInner'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-white/40">
      Loading map...
    </div>
  ),
});

export default function SubmissionMapLoader(props) {
  return <SubmissionMapInner {...props} />;
}