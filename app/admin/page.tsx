import type { Metadata } from 'next';

import { AdminDashboard } from '@/components/admin-dashboard';

export const metadata: Metadata = {
  title: 'Входящие идеи — giveidea',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
