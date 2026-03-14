'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/routing';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'ur', name: 'اردو' },
] as const;

export function LanguagePicker({
  className,
  variant = 'dropdown',
}: {
  className?: string;
  variant?: 'dropdown' | 'grid';
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  if (variant === 'grid') {
    return (
      <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-2', className)}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => switchLocale(lang.code)}
            className={cn(
              'rounded-lg border px-4 py-2 text-left text-sm font-medium transition-colors',
              locale === lang.code
                ? 'border-bharat-saffron bg-bharat-saffron/10 text-bharat-saffron'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            )}
          >
            {lang.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-lg" aria-hidden>🌐</span>
        <span>{LANGUAGES.find((l) => l.code === locale)?.name ?? locale}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" aria-hidden onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            className="absolute right-0 top-full z-50 mt-1 max-h-60 w-44 overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            {LANGUAGES.map((lang) => (
              <li key={lang.code} role="option" aria-selected={locale === lang.code}>
                <button
                  type="button"
                  onClick={() => switchLocale(lang.code)}
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm',
                    locale === lang.code ? 'bg-bharat-saffron/10 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
