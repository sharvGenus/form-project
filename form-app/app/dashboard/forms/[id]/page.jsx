'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function FormDetailPage() {
  const { id } = useParams();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [formUrl, setFormUrl] = useState('');

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

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Your Form is Live</h1>

      {qrDataUrl && (
        <img src={qrDataUrl} alt="QR Code" className="mx-auto mb-4" width={200} height={200} />
      )}

      {formUrl && (
        <p className="mb-4">
          <a href={formUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {formUrl}
          </a>
        </p>
      )}

      <p className="text-gray-600">
        Share this link or QR code. It stays the same even if you edit the form later.
      </p>
    </div>
  );
}