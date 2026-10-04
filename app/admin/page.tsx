import type { Metadata } from 'next';

import { AdminDashboard } from '@/components/admin-dashboard';
import { defaultLocale, messages } from '@/lib/i18n';

export const metadata: Metadata = {
  title: messages[defaultLocale].meta.adminTitle,
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
