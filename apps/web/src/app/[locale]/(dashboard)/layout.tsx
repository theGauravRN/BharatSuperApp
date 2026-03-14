import { setRequestLocale } from 'next-intl/server';
import { Toaster } from 'sonner';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DashboardLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-bharat-navy">
      {/* Minimal layout for now; Sidebar/Header added in Sub-Prompt 2 */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <Toaster position="top-center" richColors />
    </div>
  );
}
