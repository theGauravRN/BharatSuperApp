import { setRequestLocale } from 'next-intl/server';
import { LanguagePicker } from '@/components/ui/language-picker';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AuthLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bharat-saffron/10 via-white to-bharat-green/10 dark:from-bharat-navy dark:via-bharat-navy dark:to-bharat-navy/95">
      {/* Language selector top-right */}
      <div className="absolute top-4 right-4 z-10">
        <LanguagePicker />
      </div>

      {/* Centered content */}
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-bharat-navy dark:text-white">
            🇮🇳 Bharat Super App
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            One app for Bharat — in your language
          </p>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
