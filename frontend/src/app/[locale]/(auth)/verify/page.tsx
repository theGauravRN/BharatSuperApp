'use client';

import { Suspense, useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/routing';
import { useTranslations } from 'next-intl';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

/** Demo OTP when backend is not configured. Use this to complete login flow in UI-only mode. */
const DEMO_OTP = '123456';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OTPInputField } from '@/components/ui/otp-input';
import { toast } from 'sonner';

const RESEND_COOLDOWN_SEC = 30;

function VerifyContent() {
  const t = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams?.get('phone') ?? '';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const verifyOtp = useCallback(async (token: string) => {
    if (token.length !== 6) return;
    setLoading(true);

    if (!isSupabaseConfigured) {
      // Demo mode: accept fixed OTP and go to home/dashboard (no real session)
      setLoading(false);
      if (token !== DEMO_OTP) {
        toast.error(t('wrongOtp'));
        return;
      }
      toast.success('Demo — verified. Going to dashboard.');
      router.replace('/home');
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });
    setLoading(false);
    if (error) {
      toast.error(t('wrongOtp'));
      return;
    }
    if (data?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, full_name, preferred_language')
        .eq('id', data.user.id)
        .single();
      const hasProfile = profile?.full_name != null && profile.full_name !== '';
      if (hasProfile) {
        router.replace('/home');
      } else {
        router.replace('/signup');
      }
    }
  }, [phone, router, t]);

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp(otp);
    }
  }, [otp, verifyOtp]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setResendTimer(RESEND_COOLDOWN_SEC);
    if (!isSupabaseConfigured) {
      toast.success('Demo mode — use OTP 123456');
      return;
    }
    const supabase = createClient();
    await supabase.auth.signInWithOtp({ phone, options: { channel: 'sms' } });
    toast.success('OTP resent');
  };

  const displayPhone = phone ? phone.replace(/^\+91/, '') : '';

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('otpSent')} +91 {displayPhone}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t('enterOtp')}</p>
        {!isSupabaseConfigured && (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Demo: enter <strong>{DEMO_OTP}</strong> to continue
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <OTPInputField
            value={otp}
            onChange={setOtp}
            maxLength={6}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={resendTimer > 0 || loading}
          onClick={handleResend}
        >
          {resendTimer > 0 ? `${t('resendIn')} ${resendTimer}s` : t('resendOtp')}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<Card><CardContent className="p-6 text-center text-gray-500">Loading...</CardContent></Card>}>
      <VerifyContent />
    </Suspense>
  );
}
