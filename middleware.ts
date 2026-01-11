import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export default async function middleware(request: NextRequest) {
// Better-Auth এর ডিফল্ট সেশন কুকি চেক
  const sessionToken = request.cookies.get("better-auth.session_token") || 
                       request.cookies.get("__better_auth_session"); // Production এ এই নাম হতে পারে
console.log(sessionToken);

  const { pathname } = request.nextUrl;
  
  if (!sessionToken ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (sessionToken && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }


  return NextResponse.next();
}


export const config = {

matcher:["/account/:path*","/saved-posts"]
};
