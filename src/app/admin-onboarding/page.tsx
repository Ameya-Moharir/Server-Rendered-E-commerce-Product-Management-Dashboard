import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import AdminOnboardingClient from './AdminOnboardingClient';

export const metadata = {
  title: 'Admin Management | E-commerce Dashboard',
  description: 'Manage administrators and onboard new admin users',
};

export default async function AdminOnboardingPage() {
  // Check if user is authenticated
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Check if user is admin
  if (session.user.role !== 'admin') {
    redirect('/dashboard');
  }

  // Fetch all admins from database
  const db = await getDatabase();
  const adminsData = await db
    .collection('users')
    .find({ role: 'admin' })
    .sort({ createdAt: -1 })
    .toArray();

  // Convert MongoDB documents to plain objects
  const admins = adminsData.map((admin) => ({
    _id: admin._id.toString(),
    email: admin.email,
    name: admin.name,
    role: admin.role,
    createdAt: admin.createdAt.toISOString(),
  }));

  return <AdminOnboardingClient admins={admins} />;
}
