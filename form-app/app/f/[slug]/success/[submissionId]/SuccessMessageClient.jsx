'use client';

import { useEffect, useMemo, useState } from 'react';

export default function SuccessMessageClient({ message }) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const formattedMessage = useMemo(() => {
    if (!message) return { main: '', signature: '' };

    const parts = message.split('~');
    if (parts.length === 1) {
      return {
        main: message.trim(),
        signature: '',
      };
    }

    return {
      main: parts[0].trim(),
      signature: parts.slice(1).join('~').trim(),
    };
  }, [message]);

  return (
    <div className="min-h-screen bg-[#0b0b0f] px-4 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 sm:p-12">
          {!showMessage ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <div className="relative mb-8 flex h-16 w-16 items-center justify-center">
                <div className="absolute h-16 w-16 rounded-full border border-cyan-400/20" />
                <div className="absolute h-16 w-16 rounded-full border-t border-cyan-300 border-r border-transparent border-b border-transparent border-l border-transparent animate-spin" />
                <div className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.55)]" />
              </div>

              <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/55">
                Secret message loading...
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/40 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/50 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/60" />
              </div>
            </div>
          ) : (
            <div className="animate-[fadeIn_500ms_ease_forwards] opacity-0">
              <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <div className="space-y-0 text-center">
                <p className="whitespace-pre-line text-base leading-8 text-white/80 sm:text-lg">
                  {formattedMessage.main}
                </p>

                {formattedMessage.signature && (
                  <div className="mt-8 pt-2 text-right">
                    <p className="whitespace-pre-line text-base leading-8 text-white/75 sm:text-lg">
                      {formattedMessage.signature}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}