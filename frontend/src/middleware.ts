import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { routing } from './routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Handle locale and intl first
  const response = intlMiddleware(request);
  const pathname = request.nextUrl.pathname;

  // Extract locale from path (e.g. /hi/login -> hi)
  const localeMatch = pathname.match(/^\/(en|hi|ta|te|bn|mr|gu|kn|ml|pa|ur)(?:\/|$)/);
  const locale = localeMatch ? localeMatch[1] : 'hi';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthRoute = /^\/(en|hi|ta|te|bn|mr|gu|kn|ml|pa|ur)\/(login|signup|verify)(\/|$)/.test(pathname);
  const isDashboardRoute = /^\/(en|hi|ta|te|bn|mr|gu|kn|ml|pa|ur)\/(home|social|messages|news|fintech|agri|health|edtech|jobs|shop|creator|govtech|notifications|settings|profile)/.test(pathname);
  const isAdminRoute = /^\/(en|hi|ta|te|bn|mr|gu|kn|ml|pa|ur)\/admin(\/|$)/.test(pathname);

  // Protect dashboard: redirect unauthenticated to login
  if (!user && (isDashboardRoute || isAdminRoute)) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login/verify/signup to home
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }

  // Admin: check role (we need to fetch profile; do it in layout instead to avoid extra DB call in middleware)
  // Middleware only checks auth; admin layout will redirect non-admins

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
