'use client';

import { useEffect, useState } from 'react';
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

  if (error) {
    return <div className="max-w-5xl mx-auto mt-10 p-6 text-red-600">{error}</div>;
  }

  if (!data) {
    return <div className="max-w-5xl mx-auto mt-10 p-6">Loading analytics...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Form Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border rounded p-4">
          <p className="text-gray-600">Total Submissions</p>
          <p className="text-2xl font-bold">{data.stats.totalSubmissions}</p>
        </div>
        <div className="border rounded p-4">
          <p className="text-gray-600">Matched</p>
          <p className="text-2xl font-bold text-green-600">{data.stats.matchedCount}</p>
        </div>
        <div className="border rounded p-4">
          <p className="text-gray-600">Failed</p>
          <p className="text-2xl font-bold text-red-600">{data.stats.failedCount}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Name Entered</th>
              <th className="border p-2 text-left">Matched</th>
              <th className="border p-2 text-left">Device</th>
              <th className="border p-2 text-left">Browser</th>
              <th className="border p-2 text-left">OS</th>
              <th className="border p-2 text-left">Latitude</th>
              <th className="border p-2 text-left">Longitude</th>
              <th className="border p-2 text-left">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {data.submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="border p-2">{submission.enteredName}</td>
                <td className="border p-2">{submission.matched ? 'Yes' : 'No'}</td>
                <td className="border p-2">{submission.deviceType || 'Unknown'}</td>
                <td className="border p-2">{submission.browser || 'Unknown'}</td>
                <td className="border p-2">{submission.os || 'Unknown'}</td>
                <td className="border p-2">{submission.location?.latitude ?? '-'}</td>
                <td className="border p-2">{submission.location?.longitude ?? '-'}</td>
                <td className="border p-2">
                  {new Date(submission.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}