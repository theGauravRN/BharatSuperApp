import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bharat-navy text-white">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="mb-4">Page not found</p>
      <Link href="/" className="text-bharat-saffron hover:underline">
        Go home
      </Link>
    </div>
  );
}
