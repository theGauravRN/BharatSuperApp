'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bharat-navy text-white p-4">
      <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-gray-300 mb-4 text-center">{error.message}</p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-lg bg-bharat-saffron text-white font-medium"
        >
          Try again
        </button>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 rounded-lg border border-white text-white font-medium"
        >
          Go home
        </button>
      </div>
    </div>
  );
}
