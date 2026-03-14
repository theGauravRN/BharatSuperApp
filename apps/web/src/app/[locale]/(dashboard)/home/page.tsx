import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('app');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-bharat-navy dark:text-white">
        {t('bharatSuperApp')}
      </h1>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{t('tagline')}</p>
      <p className="mt-4 text-sm text-gray-500">
        AI Voice Assistant dashboard — Sub-Prompt 4
      </p>
    </div>
  );
}
