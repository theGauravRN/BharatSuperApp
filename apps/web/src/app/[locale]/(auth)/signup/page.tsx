'use client';

import { useState } from 'react';
import { useRouter } from '@/routing';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const STEPS = 3;
const SIGNUP_LANGUAGES = [
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
];
const INDIAN_STATES = [
  'Andhra Pradesh', 'Bihar', 'Gujarat', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal', 'Other',
];
const DISTRICTS_BY_STATE: Record<string, string[]> = {
  'Uttar Pradesh': ['Lucknow', 'Varanasi', 'Prayagraj', 'Kanpur', 'Other'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Other'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Other'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Other'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Other'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubballi', 'Other'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Other'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Other'],
  'Other': ['Other'],
};

export default function SignupPage() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preferredLanguage, setPreferredLanguage] = useState('hi');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [loading, setLoading] = useState(false);

  const districts = state ? (DISTRICTS_BY_STATE[state] ?? ['Other']) : [];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    onDrop: (accepted) => setAvatarFile(accepted[0] ?? null),
  });

  const handleComplete = async () => {
    if (!isSupabaseConfigured) {
      setLoading(true);
      toast.success('Demo — profile saved. Going to dashboard.');
      router.replace('/home');
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Session expired. Please log in again.');
      router.push('/login');
      return;
    }

    setLoading(true);
    let avatarUrl: string | null = null;
    if (avatarFile) {
      const ext = avatarFile.name.split('.').pop() ?? 'jpg';
      const path = `${user.id}/avatar.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, avatarFile, { upsert: true });
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path);
        avatarUrl = urlData.publicUrl;
      }
    }

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: fullName || null,
      avatar_url: avatarUrl,
      preferred_language: preferredLanguage || null,
      state: state || null,
      district: district || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });

    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Profile saved!');
    router.replace('/home');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('step')} {step} {t('of')} {STEPS}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <>
            <Input
              label={t('fullName')}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
            />
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('profilePhoto')}
              </p>
              <div
                {...getRootProps()}
                className={`flex min-h-[120px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center text-sm text-gray-500 dark:border-gray-600 dark:bg-gray-800 ${
                  isDragActive ? 'border-bharat-saffron bg-bharat-saffron/5' : ''
                }`}
              >
                <input {...getInputProps()} />
                {avatarFile ? avatarFile.name : 'Drop a photo or click to upload'}
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('languagePreference')}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SIGNUP_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setPreferredLanguage(lang.code)}
                  className={`rounded-lg border px-4 py-2 text-left text-sm font-medium transition-colors ${
                    preferredLanguage === lang.code
                      ? 'border-bharat-saffron bg-bharat-saffron/10 text-bharat-saffron'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('state')}
              </label>
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setDistrict('');
                }}
                className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 dark:border-gray-600 dark:bg-gray-900"
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('district')}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!state}
                className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 dark:border-gray-600 dark:bg-gray-900"
              >
                <option value="">Select district</option>
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          Back
        </Button>
        {step < STEPS ? (
          <Button type="button" onClick={() => setStep((s) => s + 1)}>
            Next
          </Button>
        ) : (
          <Button onClick={handleComplete} disabled={loading}>
            {loading ? tCommon('loading') : tCommon('save')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
