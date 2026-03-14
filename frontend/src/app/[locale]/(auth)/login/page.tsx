'use client';

import { useState } from 'react';
import { useRouter } from '@/routing';
import { useTranslations } from 'next-intl';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const PHONE_REGEX = /^[6-9]\d{9}$/;

export default function LoginPage() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) {
      setError('Enter a valid 10-digit Indian mobile number');
      return;
    }
    if (!PHONE_REGEX.test(digits)) {
      setError('Mobile number must start with 6, 7, 8 or 9');
      return;
    }

    setLoading(true);

    if (!isSupabaseConfigured) {
      // Static/demo mode: no live API call, just navigate to verify
      setLoading(false);
      toast.success('Demo mode — continue to verify.');
      router.push(`/verify?phone=%2B91${digits}`);
      return;
    }

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      phone: `+91${digits}`,
      options: {
        channel: 'sms',
      },
    });

    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      toast.error(signInError.message);
      return;
    }

    toast.success('OTP sent! Check your phone.');
    router.push(`/verify?phone=%2B91${digits}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('phonePlaceholder')}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900">
            <span className="flex items-center rounded-l-lg border-r border-gray-300 bg-gray-100 px-3 text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
              +91
            </span>
            <Input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="9876543210"
              value={phone}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 10);
                setPhone(v);
                setError(null);
              }}
              className="border-0 bg-transparent focus-visible:ring-0"
              error={error ?? undefined}
              aria-label="10-digit mobile number"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? tCommon('loading') : tCommon('sendOtp')}
          </Button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            New user?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-bharat-saffron hover:underline"
            >
              {tCommon('signup')}
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
