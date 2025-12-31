import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authServices } from './services/auth/authService';

// 1. Define protected and public routes
const protectedRoutes = ['/settings', '/profile', '/dashboard'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(request: NextRequest) {
// Better-Auth এর ডিফল্ট সেশন কুকি চেক
  const sessionToken = request.cookies.get("better-auth.session_token") || 
                       request.cookies.get("__better_auth_session"); // Production এ এই নাম হতে পারে
console.log(sessionToken);

  const { pathname } = request.nextUrl;
    // const user = await authServices.getUserSession()

  // ১. ইউজার লগড-ইন নেই কিন্তু প্রোটেক্টেড রুটে যেতে চাচ্ছে
  if (!sessionToken ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // ২. ইউজার লগড-ইন আছে কিন্তু আবার লগইন পেজে যেতে চাচ্ছে
  if (sessionToken && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }


  return NextResponse.next();
}

// 5. Professional Matcher Configuration
export const config = {
  /*
   * Match all request paths except for:
   * 1. /api routes (handled separately)
   * 2. /_next (Next.js internals)
   * 3. /_static, /_vercel (metadata)
   * 4. Static files (favicon, svg, jpg, etc.)
   */
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
matcher:["/account/profile"]
};