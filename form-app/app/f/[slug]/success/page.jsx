'use client';

import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('successMessage');
    setMessage(stored || 'Success');
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Message for You</h1>
      <p className="text-lg">{message}</p>
    </div>
  );
}