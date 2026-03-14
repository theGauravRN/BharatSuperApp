import { Link } from '@/routing';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bharat-saffron/20 via-white to-bharat-green/20 dark:from-bharat-navy dark:via-bharat-navy dark:to-bharat-navy">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-bharat-navy dark:text-white mb-2">
          Bharat Super App
        </h1>
        <p className="text-2xl text-bharat-green font-medium mb-2">भारत सुपर ऐप</p>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-xl mx-auto">
          One app for every Indian — in their language, at their pace.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 rounded-lg bg-bharat-saffron text-white font-medium hover:opacity-90 transition"
        >
          Get started
        </Link>
      </div>
    </main>
  );
}
