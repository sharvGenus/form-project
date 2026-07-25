import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import LogoutButton from './LogoutButton';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome, {user.name}</p>
      <p className="text-gray-600 mb-6">Email: {user.email}</p>

      <div className="flex gap-4 mb-6">
        <Link href="/dashboard/create-form" className="bg-black text-white px-4 py-2 rounded">
          Create Form
        </Link>
        <Link href="/dashboard/forms" className="border px-4 py-2 rounded">
          View Forms
        </Link>
      </div>

      <LogoutButton />
    </div>
  );
}